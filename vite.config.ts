/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  build: {
    target: ['es2020'],
  },
  envPrefix: ['PUBLIC_'],
  resolve: {
    alias: {
      '@services': resolve(__dirname, './src/app/services'),
      '@components': resolve(__dirname, './src/app/components'),
      '@lib': resolve(__dirname, './src/app/lib')
    },
    mainFields: ['module']
  },
  plugins: [
    analog({
      ssr: true,
      static: false,
      nitro: {
        alias: {
          '@lib': resolve(__dirname, './src/app/lib'),
          '@services': resolve(__dirname, './src/app/services'),
          '@components': resolve(__dirname, './src/app/components'),
        },
        preset: 'vercel-edge'
      },
      prerender: {
        routes: [],
      },
    }),
    tailwindcss()
  ],
}));
