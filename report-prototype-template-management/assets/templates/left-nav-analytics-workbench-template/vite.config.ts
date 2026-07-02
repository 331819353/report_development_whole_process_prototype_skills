import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import type { RollupLog } from 'rollup';

const isElementPlusAnnotationWarning = (warning: RollupLog) => {
  const id = warning.id?.replace(/\\/g, '/') ?? '';

  return (
    warning.code === 'INVALID_ANNOTATION' &&
    id.includes('/node_modules/') &&
    (id.includes('/element-plus/') || id.includes('/@vueuse/'))
  );
};

export default defineConfig(({ mode }) => {
  const envConfig = loadEnv(mode, process.cwd(), '');
  const mockApiBaseUrl = process.env.MOCK_API_BASE_URL || envConfig.MOCK_API_BASE_URL;

  return {
    base: './',
    plugins: [vue()],
    define: {
      'process.env': {},
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/global.scss" as *;\n',
        },
      },
    },
    server: {
      proxy: mockApiBaseUrl
        ? {
            '/api': {
              target: mockApiBaseUrl,
              changeOrigin: true,
            },
          }
        : undefined,
    },
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (isElementPlusAnnotationWarning(warning)) {
            return;
          }

          warn(warning);
        },
      },
    },
  };
});
