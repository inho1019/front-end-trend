import { defineConfig } from 'vite'
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr';

dotenv.config()

// https://vite.dev/config/
export default defineConfig({
  base: process.env.PROD ? '/front-end-magazine/' : '/',
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    svgr({
      include: "**/*.svg",
    }),
  ],
})
