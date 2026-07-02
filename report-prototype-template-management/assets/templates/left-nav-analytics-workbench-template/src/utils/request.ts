import axios, { AxiosHeaders, type AxiosError } from 'axios';
import { ElMessage } from 'element-plus';
import { useStore } from '@/stores';
import { login } from './login';

const service = axios.create({
  timeout: 15000,
});

const REQUEST_ERROR_MESSAGE_COOLDOWN_MS = 6000;
const lastRequestErrorMessageAt = new Map<string, number>();

const getRequestUrl = (error: AxiosError) => {
  const requestUrl = error.config?.url ?? error.request?.responseURL;

  return typeof requestUrl === 'string' && requestUrl.length > 0 ? requestUrl : 'unknown request';
};

const showRequestError = (dedupeKey: string, message: string) => {
  const now = Date.now();
  const lastShownAt = lastRequestErrorMessageAt.get(dedupeKey) ?? 0;

  if (now - lastShownAt < REQUEST_ERROR_MESSAGE_COOLDOWN_MS) {
    return;
  }

  lastRequestErrorMessageAt.set(dedupeKey, now);
  ElMessage.error({
    message,
    duration: 4200,
    grouping: true,
  });
};

const buildErrorMessage = (error: AxiosError) => {
  const status = error.response?.status;
  const requestUrl = getRequestUrl(error);
  const isApiRequest = requestUrl.includes('/api/');

  if (status === 429) {
    return {
      key: 'http-429',
      message: 'Too many requests. Please slow down and try again.',
    };
  }

  if (!status && isApiRequest) {
    return {
      key: 'api-unavailable',
      message: 'Data service is unavailable. Start with npm run dev:mock or check the /api proxy.',
    };
  }

  if (status === 404 && isApiRequest) {
    return {
      key: 'api-404',
      message: `API endpoint not found: ${requestUrl.split('?')[0]}`,
    };
  }

  return {
    key: `request-${status ?? 'network'}`,
    message: `API request failed${status ? ` (${status})` : ''}. Check the data service or network.`,
  };
};

service.interceptors.request.use(
  (config) => {
    const { haierToken } = useStore();

    if (haierToken) {
      const headers = AxiosHeaders.from(config.headers);

      headers.set('Access-Token', haierToken);
      config.headers = headers;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

service.interceptors.response.use(
  async (res) => {
    const payload = res.data;
    const code = payload?.code;

    if (code === 401) {
      useStore().clearUserSession();
      await login(true);
      return service(res.config);
    }

    if (code !== undefined && code !== null && Number(code) !== 0 && Number(code) !== 200) {
      if (payload?.msg) {
        showRequestError(`business-${code}-${payload.msg}`, payload.msg);
      }

      return Promise.reject(payload?.msg ?? payload);
    }

    return payload;
  },
  async (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      await login(true);
    } else {
      const { key, message } = buildErrorMessage(error);

      console.warn('[request] dashboard API request failed', {
        method: error.config?.method,
        url: getRequestUrl(error),
        status,
        message: error.message,
      });
      showRequestError(key, message);
    }

    return Promise.reject(error);
  },
);

export default service;
