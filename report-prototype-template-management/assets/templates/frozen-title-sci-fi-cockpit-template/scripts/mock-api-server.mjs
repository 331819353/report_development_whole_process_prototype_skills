import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const defaultDatasetPath = 'src/data/dashboard.dataset.json';
const defaultHost = '127.0.0.1';
const defaultPort = 4179;

const optionCollections = {
  period: 'periodOptions',
  periods: 'periodOptions',
  region: 'regionOptions',
  regions: 'regionOptions',
  project: 'projectOptions',
  projects: 'projectOptions',
  channel: 'channelOptions',
  channels: 'channelOptions',
};

const reportCollections = {
  '/api/report/revenue-trend': 'apiRevenueTrendRows',
  '/api/report/revenue-table': 'apiRevenueTableRows',
  '/api/report/kpi-summary': 'apiKpiSummaryRows',
};

function readArg(name, fallback) {
  const index = process.argv.indexOf(name);
  if (index >= 0 && process.argv[index + 1]) {
    return process.argv[index + 1];
  }
  const inlineArg = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (inlineArg) {
    return inlineArg.slice(name.length + 1);
  }
  return fallback;
}

const host = readArg('--host', process.env.MOCK_API_HOST || defaultHost);
const port = Number(readArg('--port', process.env.MOCK_API_PORT || defaultPort));
const datasetPath = path.resolve(
  process.cwd(),
  readArg('--dataset', process.env.MOCK_API_DATASET || defaultDatasetPath),
);

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Requested-With',
    'Content-Type': 'application/json; charset=utf-8',
  });
  response.end(JSON.stringify(payload));
}

async function loadDataset() {
  const text = await readFile(datasetPath, 'utf8');
  return JSON.parse(text);
}

function isEmptyFilterValue(value) {
  return value == null || value === '' || value === '__all' || value === 'all';
}

function getSortedItems(items) {
  return [...items].sort((a, b) => {
    const left = typeof a.sortOrder === 'number' ? a.sortOrder : 0;
    const right = typeof b.sortOrder === 'number' ? b.sortOrder : 0;
    return left - right;
  });
}

function applyQueryFilters(rows, searchParams, filterKeys = ['period', 'region', 'project', 'channel', 'metric']) {
  return rows.filter((row) =>
    filterKeys.every((key) => {
      const value = searchParams.get(key);
      if (isEmptyFilterValue(value) || !(key in row)) {
        return true;
      }
      return String(row[key]) === String(value);
    }),
  );
}

function getQueryObject(searchParams) {
  return Object.fromEntries(
    [...searchParams.entries()].filter(([, value]) => !isEmptyFilterValue(value)),
  );
}

function getFilteredOptionItems(dataset, optionId, items, searchParams) {
  if (!['region', 'project', 'channel'].includes(optionId)) {
    return items;
  }

  const rows = dataset.businessData?.apiRevenueTableRows || [];
  const filterKeys = ['period', 'region', 'project', 'channel'].filter((key) => key !== optionId);
  const filteredRows = applyQueryFilters(rows, searchParams, filterKeys);
  const availableValues = new Set(
    filteredRows
      .map((row) => row[optionId])
      .filter((value) => !isEmptyFilterValue(value))
      .map(String),
  );

  if (availableValues.size === 0) {
    return items.filter((item) => isEmptyFilterValue(item.id));
  }

  return items.filter((item) => isEmptyFilterValue(item.id) || availableValues.has(String(item.id)));
}

function getTextWeight(value, modulo, step) {
  if (isEmptyFilterValue(value)) {
    return 0;
  }

  const total = String(value)
    .split('')
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  return ((total % modulo) - Math.floor(modulo / 2)) * step;
}

function getQueryModifier(searchParams) {
  const period = searchParams.get('period');
  const monthMatch = period?.match(/-(\d{2})$/);
  const monthWeight = monthMatch ? (Number(monthMatch[1]) - 6) * 0.012 : 0;
  const modifier =
    1 +
    monthWeight +
    getTextWeight(searchParams.get('region'), 13, 0.01) +
    getTextWeight(searchParams.get('project'), 17, 0.008) +
    getTextWeight(searchParams.get('channel'), 11, 0.008) +
    getTextWeight(searchParams.get('metric') || searchParams.get('activeTitlePillId'), 7, 0.006);

  return Math.max(0.72, Math.min(1.28, modifier));
}

function scaleNumber(value, modifier, digits = 0) {
  const factor = 10 ** digits;
  return Math.round(value * modifier * factor) / factor;
}

function scalePercent(value, modifier) {
  return Math.max(0, Math.round((value + (modifier - 1) * 18) * 10) / 10);
}

function scaleMetricValue(value, modifier, props) {
  if (typeof value !== 'number') {
    return value;
  }

  const isPercent = props?.unit === '%' || props?.valueSuffix === '%';
  return isPercent ? scalePercent(value, modifier) : scaleNumber(value, modifier, Number.isInteger(value) ? 0 : 1);
}

function scaleRows(rows, modifier, searchParams) {
  const filteredRows = applyQueryFilters(rows, searchParams, ['period', 'region', 'project', 'channel']);

  return filteredRows.map((row) => ({
    ...row,
    revenue: typeof row.revenue === 'number' ? scaleNumber(row.revenue, modifier) : row.revenue,
    amount: typeof row.amount === 'number' ? scaleNumber(row.amount, modifier) : row.amount,
    target: typeof row.target === 'number' ? scaleNumber(row.target, modifier) : row.target,
    completion: typeof row.completion === 'number' ? scalePercent(row.completion, modifier) : row.completion,
  }));
}

function scaleComponentProps(props, searchParams) {
  const modifier = getQueryModifier(searchParams);
  const next = JSON.parse(JSON.stringify(props || {}));

  next.value = scaleMetricValue(next.value, modifier, next);
  next.currentValue = scaleMetricValue(next.currentValue, modifier, next);
  next.gapValue = scaleMetricValue(next.gapValue, 2 - modifier, next);

  if (Array.isArray(next.sparkValues)) {
    next.sparkValues = next.sparkValues.map((item) => (typeof item === 'number' ? scaleNumber(item, modifier) : item));
  }

  if (Array.isArray(next.values)) {
    next.values = next.values.map((item) => (typeof item === 'number' ? scaleNumber(item, modifier) : item));
  }

  if (Array.isArray(next.series)) {
    next.series = next.series.map((series) => ({
      ...series,
      values: Array.isArray(series.values)
        ? series.values.map((item) => (typeof item === 'number' ? scaleNumber(item, modifier) : item))
        : series.values,
    }));
  }

  if (Array.isArray(next.items)) {
    next.items = next.items.map((item) => ({
      ...item,
      value: typeof item.value === 'number' ? scaleNumber(item.value, modifier) : item.value,
    }));
  }

  if (Array.isArray(next.cells)) {
    next.cells = next.cells.map((row) =>
      Array.isArray(row) ? row.map((item) => (typeof item === 'number' ? scaleNumber(item, modifier) : item)) : row,
    );
  }

  if (Array.isArray(next.stages)) {
    next.stages = next.stages.map((item) => ({
      ...item,
      value: typeof item.value === 'number' ? scaleNumber(item.value, modifier) : item.value,
    }));
  }

  if (Array.isArray(next.points)) {
    next.points = next.points.map((item) => ({
      ...item,
      value: typeof item.value === 'number' ? scaleNumber(item.value, modifier) : item.value,
    }));
  }

  if (Array.isArray(next.rows)) {
    next.rows = scaleRows(next.rows, modifier, searchParams);
  }

  next.queryContext = getQueryObject(searchParams);
  return next;
}

function resolveComponentConfig(dataset, componentKey) {
  const componentProps = dataset.businessData?.componentProps || {};
  return (
    componentProps[componentKey] ||
    Object.values(componentProps).find((item) => item?.legacyKey === componentKey || item?.key === componentKey)
  );
}

async function handleRequest(request, response) {
  if (request.method === 'OPTIONS') {
    sendJson(response, 204, {});
    return;
  }

  if (request.method !== 'GET') {
    sendJson(response, 405, {
      code: 405,
      message: 'Only GET is supported by the mock API server.',
      data: null,
    });
    return;
  }

  const url = new URL(request.url || '/', `http://${host}:${port}`);
  const dataset = await loadDataset();

  if (url.pathname === '/api/health') {
    sendJson(response, 200, {
      code: 0,
      message: 'ok',
      data: {
        status: 'ok',
        datasetPath,
        timestamp: new Date().toISOString(),
      },
    });
    return;
  }

  if (url.pathname.startsWith('/api/filter-options/')) {
    const optionId = decodeURIComponent(url.pathname.split('/').pop() || '');
    const collectionKey = optionCollections[optionId] || optionId;
    const items = dataset.filterData?.[collectionKey] || [];
    const filteredItems = getFilteredOptionItems(dataset, optionId, items, url.searchParams);
    sendJson(response, 200, {
      code: 0,
      message: 'ok',
      data: {
        items: getSortedItems(filteredItems),
      },
    });
    return;
  }

  if (url.pathname.startsWith('/api/component-props/')) {
    const componentKey = decodeURIComponent(url.pathname.slice('/api/component-props/'.length));
    const componentConfig = resolveComponentConfig(dataset, componentKey);

    if (!componentConfig) {
      sendJson(response, 404, {
        code: 404,
        message: `Component props not found: ${componentKey}`,
        data: null,
      });
      return;
    }

    const responseRow = {
      ...componentConfig,
      key: componentKey,
      query: getQueryObject(url.searchParams),
      props: scaleComponentProps(componentConfig.props, url.searchParams),
    };

    sendJson(response, 200, {
      code: 0,
      message: 'ok',
      data: {
        rows: [responseRow],
        total: 1,
      },
    });
    return;
  }

  const reportCollection = reportCollections[url.pathname];
  if (reportCollection) {
    const rows = dataset.businessData?.[reportCollection] || [];
    const filterKeys =
      url.pathname === '/api/report/revenue-trend'
        ? ['region', 'project', 'channel', 'metric']
        : undefined;
    const filteredRows = applyQueryFilters(rows, url.searchParams, filterKeys);
    sendJson(response, 200, {
      code: 0,
      message: 'ok',
      data: {
        rows: filteredRows,
        total: filteredRows.length,
      },
    });
    return;
  }

  sendJson(response, 404, {
    code: 404,
    message: `Mock API route not found: ${url.pathname}`,
    data: null,
  });
}

const server = http.createServer((request, response) => {
  handleRequest(request, response).catch((error) => {
    sendJson(response, 500, {
      code: 500,
      message: error instanceof Error ? error.message : 'Mock API error',
      data: null,
    });
  });
});

server.listen(port, host, () => {
  console.log(`[mock-api] listening at http://${host}:${port}`);
  console.log(`[mock-api] dataset ${datasetPath}`);
});

function shutdown() {
  server.close(() => process.exit(0));
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
