import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from '@vuetify/vite-plugin';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import path from 'path';
import inject from '@rollup/plugin-inject';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true
    })
  ],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true
        })
      ]
    }
  },
  define: {
    global: 'globalThis'
  },
  build: {
    rollupOptions: {
      plugins: [
        inject({
          include: ['node_modules/**/*'],
          exclude: ['node_modules/tweetnacl-util/**', 'dist/**/*'],
          modules: { Buffer: ['buffer', 'Buffer'] }
        })
      ],
      external: ['ethereum']
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      process: 'process/browser',
      stream: 'stream-browserify'
    }
  },
  server: {
    https: true,
    port: 8080
  }
});
