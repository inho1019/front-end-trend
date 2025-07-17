import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  base: '/front-end-magazine/',
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    svgr({
      include: "**/*.svg",
    }),
  ],
})
