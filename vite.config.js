import { defineConfig, loadEnv } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      __NVM_HOME__: JSON.stringify(env.NVM_HOME),
    },
    plugins: [preact({ devToolsEnabled: false })],
    resolve: {
      alias: [
        { find: /^react$/, replacement: 'preact/compat' },
        { find: /^react-dom\/test-utils$/, replacement: 'preact/test-utils' },
        { find: /^react-dom$/, replacement: 'preact/compat' },
        { find: /^react\/jsx-runtime$/, replacement: 'preact/compat/jsx-runtime' },
      ],
    },
    base: '/thsr-app/',
    server: {
      port: 3000,
    },
    esbuild: {
      loader: 'tsx',
      include: /src\/.*\.[tj]sx?$/,
      exclude: [],
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      css: true,
      reporters: ['verbose'],
      deps: {
        optimizer: {
          web: {
            enabled: true,
          },
        },
      },
      alias: [
        { find: /^react$/, replacement: 'preact/compat' },
        { find: /^react-dom\/test-utils$/, replacement: 'preact/test-utils' },
        { find: /^react-dom$/, replacement: 'preact/compat' },
        { find: /^react\/jsx-runtime$/, replacement: 'preact/compat/jsx-runtime' },
      ],
      coverage: {
        provider: 'istanbul',
        reporter: ['text', 'json', 'html', ['lcov', { projectRoot: './src' }, 'json-summary']],
        include: ['src/**/*'],
        exclude: [],
      },
    },
  };
});
