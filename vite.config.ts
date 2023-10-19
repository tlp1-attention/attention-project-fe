import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import { reactScopedCssPlugin } from 'rollup-plugin-react-scoped-css'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@components": path.resolve("src/components"),
      "@interfaces": path.resolve("src/interfaces"),
      "@pages": path.resolve("src/pages"),
      "@features": path.resolve("src/features"),
      "@services": path.resolve("src/services"),
      "@hooks": path.resolve("src/hooks"),
      "@utils": path.resolve("src/utils"),
    },
  },
  plugins: [
    react(),
    reactScopedCssPlugin()
  ],
})
