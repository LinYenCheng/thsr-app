import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  console.log(env.NVM_HOME)
  return {
    // vite config
    define: {
      __NVM_HOME__: JSON.stringify(env.NVM_HOME),
    },
    plugins: [react()],
    base: '/thsr-app/',
    server: {
      port: 3000,
    },
    esbuild: {
      // loader: 'jsx',
      // include: /src\/.*\.jsx?$/,
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
      coverage: {
        provider: 'istanbul',
        reporter: ['text', 'json', 'html', ['lcov', { projectRoot: './src' }, 'json-summary']],
        include: ['src/**/*'],
        exclude: [],
      },
    },
  };
});
