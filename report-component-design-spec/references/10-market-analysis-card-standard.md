# Market Movement Analysis Card Standard

Use this standard when a report, dashboard, BI page, or reusable component library asks for `analysisPerspective: marketMovement`, such as 看行情, 行情卡, 报价卡, 价格卡, K线卡, K-line card, candlestick card, 涨跌卡, 涨跌幅卡, 涨跌分布卡, 波动卡, 波动率卡, 自选列表, watchlist, 股票/加密货币/外汇/商品行情, market quote, market breadth, or volatility risk cards.

The source screenshots are temporary visual evidence. The durable knowledge is this text contract: a future text-only agent must be able to recreate the same design strength from business intent, data fields, slot budgets, renderer ownership, and acceptance gates without relying on the raw image paths.

## Why These Designs Feel Strong

- They use a real financial reading order: instrument identity -> current quote -> change state -> evidence chart -> supporting facts -> freshness/status. Users can scan the card like a product surface, not a poster.
- The card grid is visually quiet while the data is dense. White card surfaces, small radius, thin borders, restrained shadows, and muted metadata let numbers and charts carry the design.
- Every visual has a job. Sparkline means quick price movement, K-line means OHLC volatility, volume means participation, MA/MACD/RSI mean technical context, breadth bars/donuts mean market structure, heatmap means sector/category intensity, gauge means bounded risk or sentiment.
- Local controls are credible and compact. `1D / 1W / 1M / 1Y`, `7D / 30D / 90D`, or `涨幅榜 / 跌幅榜` sit in the header and affect only the current card or declared local group.
- The cards preserve exact-value trust. Tooltip/detail must expose price, OHLC, volume, period, unit/currency, source, delay, and color convention instead of leaving the reader to estimate from decoration.
- The visual density is bounded. A card shows one primary evidence body and `2-4` facts, not every possible indicator at once.
- Domain vocabulary is concrete: symbol, exchange, market, currency, trading status, delayed/real-time, market cap, turnover, volume, amplitude, volatility, up/down/flat counts, MA/MACD/RSI, update time.
- The mock/data shape is not too perfect. Strong market cards can show dips, flat periods, red/green alternation, missing trading days, delayed quotes, uneven sectors, and non-good states.
- Color is market convention, not generic dashboard semantics. The card declares whether rise is green or red and applies that rule consistently to quote deltas, candlesticks, volume bars, labels, and tooltips.
- The page avoids AI flavor because polish is subordinate to market proof: no glass, glow, huge radius, random gradients, abstract AI icons, generic "智能行情" copy, or decorative mini charts without data contract.

## Pattern Identity

Use a card-level market pattern when one card packages quote context, evidence visual, local controls, freshness, and detail route. Use ordinary `kpiCardPattern`, `basicChartCardPattern`, `specializedChartCardPattern`, `rankingCardPattern`, `compositionShareCardPattern`, `distributionAnalysisCardPattern`, or `anomalyAnalysisCardPattern` only when the component is a bare KPI/chart/ranking/distribution/warning surface without market-specific packaging.

```ts
type MarketAnalysisCardPattern =
  | 'quote-price-snapshot-card'
  | 'quote-price-indicator-card'
  | 'quote-sparkline-range-card'
  | 'quote-multi-period-compare-card'
  | 'kline-basic-card'
  | 'kline-volume-card'
  | 'kline-moving-average-card'
  | 'kline-technical-indicator-card'
  | 'watchlist-table-card'
  | 'market-breadth-overview-card'
  | 'market-breadth-distribution-card'
  | 'market-breadth-share-card'
  | 'market-breadth-trend-card'
  | 'market-breadth-heatmap-card'
  | 'market-leaderboard-card'
  | 'market-sentiment-gauge-card'
  | 'volatility-overview-card'
  | 'volatility-range-card'
  | 'volatility-trend-card'
  | 'volatility-distribution-card'
  | 'volatility-heatmap-card'
  | 'volatility-compare-card'
  | 'risk-return-bubble-card'
  | 'volatility-warning-card';
```

Recommended mapping:

```ts
componentType: 'card'
visualType: 'market-analysis-card'
analysisPerspective: 'marketMovement'
marketAnalysisCardPattern: MarketAnalysisCardPattern
marketAnalysisEvidenceBinding: MarketAnalysisEvidenceBinding
```

## Sample Coverage

| Sample group | Reusable role | Covered pattern set | Generalization status |
| --- | --- | --- | --- |
| 行情卡片组 | Quote, indicator, multi-period, progress/range, watchlist | `quote-price-snapshot-card`, `quote-price-indicator-card`, `quote-sparkline-range-card`, `quote-multi-period-compare-card`, `watchlist-table-card`, `market-breadth-overview-card` | `covered-by-composed-patterns` |
| K线卡片组 | OHLC technical reading | `kline-basic-card`, `kline-volume-card`, `kline-moving-average-card`, `kline-technical-indicator-card`, `quote-multi-period-compare-card` | `covered-by-composed-patterns` |
| 涨跌卡片组 | Market breadth and sentiment structure | `market-breadth-overview-card`, `market-breadth-distribution-card`, `market-breadth-share-card`, `market-breadth-trend-card`, `market-breadth-heatmap-card`, `market-leaderboard-card`, `market-sentiment-gauge-card` | `covered-by-composed-patterns` |
| 波动卡片组 | Volatility risk and opportunity | `volatility-overview-card`, `volatility-range-card`, `volatility-trend-card`, `volatility-distribution-card`, `volatility-heatmap-card`, `volatility-compare-card`, `risk-return-bubble-card`, `volatility-warning-card` | `covered-by-composed-patterns` |

## Pattern Selection

| Business/data trigger | Choose | Primary evidence | Avoid when |
| --- | --- | --- | --- |
| One instrument needs current price, change, and a tiny movement proof | `quote-price-snapshot-card` | value + change + sparkline | OHLC is the main reading task |
| One instrument also needs market cap, PE, volume, turnover, or exchange metrics | `quote-price-indicator-card` | quote + `3-4` fact cells + mini trend | More than `4` facts are required |
| Current price should be located inside recent low/high range | `quote-sparkline-range-card` | sparkline or range rail + current marker | Range endpoints are missing |
| Same instrument needs `1D/1W/1M/1Y` comparison | `quote-multi-period-compare-card` | period switch + comparable series | Period datasets are incomplete |
| OHLC is visible but no volume or indicators | `kline-basic-card` | candlestick body | Only close price exists |
| OHLC plus volume is needed | `kline-volume-card` | candlestick + volume band | Card is too short for both plots |
| Moving averages are part of the decision | `kline-moving-average-card` | candlestick + MA lines | MA fields are not computed |
| MACD/KDJ/RSI is explicitly required | `kline-technical-indicator-card` | K-line + one secondary indicator | General quote overview, narrow card |
| Several instruments need row scanning | `watchlist-table-card` | compact table rows + mini trends | Exact audit/export needs full table |
| Market rising/falling/flat counts are the first answer | `market-breadth-overview-card` | count strip + percent bar + mini facts | No denominator/total count |
|涨跌幅 buckets matter | `market-breadth-distribution-card` | histogram/bar buckets | Bucket boundaries missing |
|上涨/下跌/平盘 share is primary | `market-breadth-share-card` | donut or percent strip | Precise rank is the task |
| Breadth changes over recent periods | `market-breadth-trend-card` | multi-line/stacked trend | Time rows missing |
| Sector/industry heat is primary | `market-breadth-heatmap-card` | heatmap matrix | Sector/category fields missing |
| Top gainers/losers should be ranked | `market-leaderboard-card` | ranking list/table | Rank/tie rule missing |
| One bounded market mood score is primary | `market-sentiment-gauge-card` | gauge + evidence facts | Score range/threshold missing |
| Volatility value and change are first read | `volatility-overview-card` | primary volatility KPI + small trend | Formula is unknown |
| Current price sits in a volatility/range band | `volatility-range-card` | range rail + min/max/current | Min/max/range fields missing |
| Volatility movement over time matters | `volatility-trend-card` | line with average/threshold | Time series missing |
| Volatility buckets matter | `volatility-distribution-card` | histogram/density/bucket bars | Bucket/sample policy missing |
| Day/time volatility concentration matters | `volatility-heatmap-card` | heatmap | Ordered row/column fields missing |
| Instruments need volatility comparison | `volatility-compare-card` | horizontal bars/ranking | Comparable unit/grain missing |
| Return vs volatility or risk-return position is the decision | `risk-return-bubble-card` | scatter/bubble | x/y/size fields missing |
| Volatility crosses a threshold | `volatility-warning-card` | gauge/status band + action | Threshold/action path missing |

## Evidence Binding

Every implementation-ready market card must declare `marketAnalysisEvidenceBinding`.

```ts
type MarketColorConvention =
  | 'international-green-rise-red-fall'
  | 'china-red-rise-green-fall'
  | 'custom-declared';

type MarketAnalysisEvidenceBinding = {
  marketTask:
    | 'quote'
    | 'quote-indicators'
    | 'kline'
    | 'technical-indicator'
    | 'watchlist'
    | 'breadth'
    | 'sentiment'
    | 'volatility'
    | 'risk-return';
  instrumentIdField?: string;
  symbolField?: string;
  instrumentNameField?: string;
  assetClassField?: string; // stock, crypto, fx, commodity, index, futures
  exchangeField?: string;
  marketField?: string;
  currencyField?: string;
  timezoneField?: string;
  tradingStatusField?: string; // trading, closed, halted, delayed, premarket
  quoteFields?: {
    priceField: string;
    previousCloseField?: string;
    changeField: string;
    changeRateField: string;
    bidField?: string;
    askField?: string;
    openPriceField?: string;
    highPriceField?: string;
    lowPriceField?: string;
    volumeField?: string;
    turnoverField?: string;
    marketCapField?: string;
    peField?: string;
    amplitudeField?: string;
  };
  ohlcFields?: {
    timeField: string;
    openField: string;
    highField: string;
    lowField: string;
    closeField: string;
    volumeField?: string;
    changeField?: string;
    changeRateField?: string;
    maFields?: string[];
    macdFields?: string[];
    rsiField?: string;
    kdjFields?: string[];
    adjustmentField?: string;
    timeContinuity: 'trading-calendar' | 'real-time' | 'declared-gap';
  };
  breadthFields?: {
    totalCountField: string;
    upCountField: string;
    downCountField: string;
    flatCountField?: string;
    upShareField?: string;
    downShareField?: string;
    flatShareField?: string;
    bucketField?: string;
    bucketSortField?: string;
    countField?: string;
    sectorField?: string;
    sectorValueField?: string;
    rankField?: string;
  };
  volatilityFields?: {
    volatilityValueField: string;
    volatilityFormula: string;
    windowField: string;
    minField?: string;
    maxField?: string;
    averageField?: string;
    percentileField?: string;
    thresholdFields?: string[];
    volatilityLevelField?: string;
    bucketField?: string;
    bucketCountField?: string;
  };
  riskReturnFields?: {
    returnField: string;
    volatilityField: string;
    sizeField?: string;
    groupField?: string;
    benchmarkReturnField?: string;
    benchmarkVolatilityField?: string;
  };
  localControls?: Array<'period' | 'range' | 'granularity' | 'indicator' | 'metric' | 'leaderboard-side' | 'asset-class'>;
  marketColorConvention: MarketColorConvention;
  rendererOwner:
    | 'echarts'
    | 'project-table'
    | 'project-ui'
    | 'data-driven-custom';
  numericFormatContractIds: string[];
  tooltipPayload: string[];
  exactValueRoute?: string;
  detailAction?: string;
  dataDelayField?: string;
  sourceField: string;
  freshnessField: string;
  validationCases: string[];
};
```

## Anatomy

### Shared Card Anatomy

1. Header: short card title or pattern index, optional favorite/menu, one local control group.
2. Instrument identity: logo/avatar when meaningful, symbol, display name, exchange/asset class/currency.
3. Primary quote or state: price/index/value, unit/currency, signed change, change rate, market convention color.
4. Evidence body: one main visual, such as sparkline, K-line, volume, range rail, breadth bar, donut, heatmap, ranking, gauge, volatility trend, or scatter.
5. Support strip: `2-4` facts, such as open/high/low/volume, market cap/PE/turnover, up/down/flat counts, volatility min/max/average/percentile, latest update, rank, or sample count.
6. Footer: trading status, update time, source/delay, timezone, detail/action route.

### Forbidden Slots

- More than one primary chart body in a normal card.
- Decorative icons, glass, glow, AI imagery, abstract finance art, or gradients that compete with price/chart reading.
- Technical indicators without a visible indicator name and tooltip payload.
- Body metric labels that repeat the card title without adding symbol, period, or metric meaning.
- Component-local filters that silently change page/global market scope, permission scope, export scope, or other cards.

## Size Families And Fit

| Size family | Minimum outer size | Standard size | Critical floors |
| --- | ---: | ---: | --- |
| `market_quote_card` | `360x220` | `420-560x260-340` | value zone `64-88px`, evidence fit `>=120x56`, support facts `2-4` |
| `market_kline_card` | `460x320` | `520-720x360-520` | main K-line `>=45% CH`, volume `18-28%` only when height passes |
| `market_watchlist_card` | `420x280` | `480-640x320-420` | rows `3-6`, row height `44-56px`, mini trend `>=56x20` |
| `market_breadth_card` | `420x260` | `460-640x300-380` | denominator visible, up/down/flat strip, one evidence body |
| `market_heatmap_card` | `520x340` | `560-760x360-460` | heatmap body `>=200px`, cells `>=12px`, visualMap visible |
| `market_volatility_card` | `420x260` | `460-640x300-400` | volatility formula visible/tooltip, evidence body `>=160px` |
| `market_risk_return_card` | `480x320` | `560-760x360-460` | scatter body `>=200px`, permanent labels `<=6` |

Fallback order:

1. Collapse secondary local controls to dropdown.
2. Hide optional icon/favorite/menu/help.
3. Reduce support facts to the most decision-relevant `2-3`.
4. Move exact indicator values, secondary comparisons, or long labels to tooltip/detail.
5. Downgrade K-line with volume/indicator to K-line only, then to close-price line when OHLC or height fails.
6. Reduce ranking rows to Top 3/5, aggregate long tail, or use detail drawer.
7. Split to a full chart/table/fullscreen before accepting squeezed K-line, heatmap, scatter, or dense watchlist cards.

## Positioning And Alignment Rules

Use:

```text
W = card width
H = card height
P = clamp(16px, W * 0.04, 24px)
CW = W - 2P
CH = H - 2P
```

Default bands:

```text
headerH = 32-44px
identityH = 34-52px
quoteH = 56-88px
controlH = 24-32px
supportH = 44-72px
footerH = 20-28px
```

Rules:

- Quote cards: primary value aligns left with the symbol identity, chart evidence sits right or below, support facts form a bottom grid. The value + unit group is visually strongest.
- K-line cards: chart body owns the center after title/control/legend bands. Price axis follows product or market convention; financial cards usually place price axis on the right.
- Breadth cards: up/down/flat values form a balanced top strip; the denominator/total stays visible or in tooltip; bars/donuts must reconcile to the same total.
- Ranking/watchlist cards: rows are scan-aligned, labels left, values/change right, mini trends in a stable column. Do not center list content.
- Volatility cards: volatility value or warning state is first; trend/distribution/range evidence is below; formula and window are visible or in tooltip.
- Footer metadata stays quieter but not absent. Market freshness is decision evidence.

## Component-Internal Local Controls

Suitable controls:

- Period/range: `1D / 1W / 1M / 1Y`, `7D / 30D / 90D`, `日K / 周K / 月K`.
- Indicator: `MA / MACD / RSI`, one visible group maximum.
- Leaderboard side: `涨幅榜 / 跌幅榜`.
- Metric view: `价格 / 涨跌幅`, `成交量 / 成交额`, `波动率 / 振幅`.

Unsuitable controls:

- Complex instrument discovery across market + exchange + sector + symbol + indicator + period inside one card.
- Asset-class page tabs that change the whole page component set; those are perspective/page controls, not card-local filters.
- Controls that change permission scope, global period, backend aggregation, export scope, or other components unless declared as a perspective switch/global filter.

Use capsule/segmented controls for `2-4` short options. Collapse to compact dropdown when labels or width fail. Keep filters in the title-right band and never over chart marks, axes, legends, values, table headers, or state messages.

## Visual Rules

- Inherit the modern SaaS/BI white-card baseline when present: light gray page, white cards, `6-8px` radius, thin border, subtle shadow, compact UI Kit controls, restrained chart styling.
- Use tabular numerals for prices, rates, ranks, volatility, and volume.
- Primary price/index values default to `24-36px` depending on card size. Do not shrink the price below support facts or chart decoration.
- Units and currencies stay attached to values. Long currency/volume values use display scale such as K/M/B, 万/亿, or project-approved units with tooltip exact raw values.
- Rise/fall color follows `marketColorConvention`. International stocks, crypto, FX, and commodities often use green rise/red fall; China A-share convention usually uses red rise/green fall. The card must name the convention.
- Color is not the only signal. Pair rise/fall with sign, arrow, candlestick direction, label, or tooltip wording.
- Use soft area fill behind sparklines only when it supports magnitude/range reading. Do not add filled gradients for polish alone.
- K-line candles, wicks, volume, MA, MACD, RSI, axes, crosshair, visualMap, tooltip, and dataZoom are renderer-owned, normally ECharts.
- Icons/logos help instrument identity only. Remove them before shrinking value/chart evidence.
- Avoid all-up green samples, perfectly smooth trends, evenly balanced sectors, and fake generic tickers unless the source proves them.

## Data And Interaction Rules

- Instrument identity is required for quote/K-line/watchlist cards: symbol plus at least one of instrument name, exchange, market, asset class, or currency.
- Quote cards require current price/value, change, change rate, period/update time, unit/currency, source, freshness, and trading status or delay rule.
- K-line cards require ordered OHLC rows and valid OHLC relationships: `high >= max(open, close)` and `low <= min(open, close)`.
- OHLC time continuity must be declared as trading-calendar, real-time, or declared-gap mode.
- Volume is missing-aware. Missing volume is not the same as zero volume.
- Volatility cards require formula and window. Example: `annualized stddev of log returns`, `standardDeviation / average`, `high-low range / close`, or project-defined volatility.
- Breadth/share cards require denominator. Up + down + flat must reconcile to total within rounding tolerance.
- Heatmaps distinguish missing from zero. Missing cells cannot use the same color as low/zero values.
- Ranking/leaderboard cards require source-side rank or bounded local exception, deterministic tie-break, visible row limit, and detail route.
- Tooltips must expose exact values, unit/currency, period, active local controls, source/freshness, color convention, and any delayed/stale/missing flag.
- Click behavior should open instrument detail, full chart, row detail, or a drawer with the same active period/instrument context.

## States

| State | Required behavior |
| --- | --- |
| Loading | Preserve header, identity, quote/evidence/support/footer geometry |
| Empty | Say which market/instrument/period has no data; do not show fake flat lines |
| Filtered empty | Name the active filter/range and provide reset or fallback route when available |
| Error | Preserve geometry and offer retry/detail |
| No permission | Do not leak hidden prices, volumes, row counts, or symbol detail |
| Stale/delayed data | Show delay or stale timestamp in footer/subtitle and tooltip |
| Market closed | Keep last quote but label market status and timestamp |
| Halted/suspended | Show halted status and avoid normal trend implication |
| Missing OHLC | Downgrade to line/table or mark data gap; do not draw invalid candles |
| Missing volume/indicator | Hide that subplot/indicator and explain unavailable state |
| Zero denominator | Show `--` or domain copy for shares/rates; do not draw fake 50/50 visuals |
| Too dense history | Default to recent window, dataZoom, aggregation, fullscreen, or detail table |

## Anti-AI Failure Modes

- `RPT-MARKET-INSTRUMENT-MISSING`: quote/K-line/watchlist card lacks symbol/instrument identity, market/exchange, currency/unit, or trading status.
- `RPT-MARKET-QUOTE-CONTRACT-MISSING`: price/change/change-rate/update/source fields are missing but the card presents a market quote.
- `RPT-MARKET-OHLC-MISSING`: K-line/candlestick card lacks valid ordered OHLC fields.
- `RPT-MARKET-COLOR-CONVENTION-MISSING`: rise/fall colors appear without declaring market convention.
- `RPT-MARKET-VOLATILITY-FORMULA-MISSING`: volatility card lacks formula, window, unit, or threshold basis.
- `RPT-MARKET-BREADTH-DENOMINATOR-MISSING`:涨跌/share card lacks total denominator or reconciliation rule.
- `VIS-MARKET-CARD-AI-POLISH`: generic SaaS/glass/gradient/icon polish replaces market data proof, domain vocabulary, source/freshness, or exact-value route.
- `VIS-MARKET-KLINE-DECORATIVE`: candles/MA/volume/indicators are hand-drawn, invalid, too small, or not tooltip-backed.
- `VIS-MARKET-DENSITY-UNBOUNDED`: too many candles, watchlist rows, heatmap cells, sectors, labels, or technical indicators are shown without dataZoom, Top N, sampling, scroll, drawer, fullscreen, or table fallback.
- `VIS-MARKET-STATUS-HIDDEN`: delayed, closed, halted, stale, or missing data state is hidden to keep the card visually clean.

## Acceptance Checklist

- `analysisPerspective: marketMovement`, `componentType: card`, `visualType: market-analysis-card`, and `marketAnalysisCardPattern` are declared for card-level market packages.
- `marketAnalysisEvidenceBinding` declares instrument identity, quote/OHLC/breadth/volatility/risk-return fields required by the selected pattern, market color convention, source/freshness, numeric format contracts, tooltip payload, validation cases, and fallback.
- Quote values, units, change, change rate, period, trading status, and update time are visible or inspectable.
- K-line cards use valid ordered OHLC data, declared time continuity, renderer ownership, density controls, and tooltip/detail payload.
- Breadth/share cards reconcile to a visible or inspectable denominator.
- Volatility cards declare formula/window/thresholds and do not use smooth trend decoration as risk proof.
- Local controls are scoped, data-bound, and do not change page/global scope silently.
- One card owns one primary market evidence body; secondary facts stay `2-4`.
- Display budgets and size family pass before charts, indicators, legends, rows, or labels are rendered.
- Loading, empty, filtered-empty, error, no-permission, stale/delayed, market-closed, halted, missing OHLC, missing volume/indicator, and dense-data states are covered.
- The pattern is reproducible from text without retaining raw screenshot paths or image embeddings.
