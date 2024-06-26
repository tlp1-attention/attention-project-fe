// vite.config.ts
import { defineConfig } from "file:///C:/Users/benit/IPF/attention-project-fe/node_modules/vite/dist/node/index.js";
import path from "path";
import react from "file:///C:/Users/benit/IPF/attention-project-fe/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { reactScopedCssPlugin } from "file:///C:/Users/benit/IPF/attention-project-fe/node_modules/rollup-plugin-react-scoped-css/dist/index.js";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@components": path.resolve("src/components"),
      "@interfaces": path.resolve("src/interfaces"),
      "@pages": path.resolve("src/pages"),
      "@features": path.resolve("src/features"),
      "@services": path.resolve("src/services"),
      "@hooks": path.resolve("src/hooks"),
      "@utils": path.resolve("src/utils")
    }
  },
  plugins: [
    react(),
    reactScopedCssPlugin()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxiZW5pdFxcXFxJUEZcXFxcYXR0ZW50aW9uLXByb2plY3QtZmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGJlbml0XFxcXElQRlxcXFxhdHRlbnRpb24tcHJvamVjdC1mZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYmVuaXQvSVBGL2F0dGVudGlvbi1wcm9qZWN0LWZlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgeyByZWFjdFNjb3BlZENzc1BsdWdpbiB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tcmVhY3Qtc2NvcGVkLWNzcydcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAY29tcG9uZW50c1wiOiBwYXRoLnJlc29sdmUoXCJzcmMvY29tcG9uZW50c1wiKSxcclxuICAgICAgXCJAaW50ZXJmYWNlc1wiOiBwYXRoLnJlc29sdmUoXCJzcmMvaW50ZXJmYWNlc1wiKSxcclxuICAgICAgXCJAcGFnZXNcIjogcGF0aC5yZXNvbHZlKFwic3JjL3BhZ2VzXCIpLFxyXG4gICAgICBcIkBmZWF0dXJlc1wiOiBwYXRoLnJlc29sdmUoXCJzcmMvZmVhdHVyZXNcIiksXHJcbiAgICAgIFwiQHNlcnZpY2VzXCI6IHBhdGgucmVzb2x2ZShcInNyYy9zZXJ2aWNlc1wiKSxcclxuICAgICAgXCJAaG9va3NcIjogcGF0aC5yZXNvbHZlKFwic3JjL2hvb2tzXCIpLFxyXG4gICAgICBcIkB1dGlsc1wiOiBwYXRoLnJlc29sdmUoXCJzcmMvdXRpbHNcIiksXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIHJlYWN0U2NvcGVkQ3NzUGx1Z2luKClcclxuICBdLFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlULFNBQVMsb0JBQW9CO0FBQzlVLE9BQU8sVUFBVTtBQUNqQixPQUFPLFdBQVc7QUFDbEIsU0FBUyw0QkFBNEI7QUFHckMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsZUFBZSxLQUFLLFFBQVEsZ0JBQWdCO0FBQUEsTUFDNUMsZUFBZSxLQUFLLFFBQVEsZ0JBQWdCO0FBQUEsTUFDNUMsVUFBVSxLQUFLLFFBQVEsV0FBVztBQUFBLE1BQ2xDLGFBQWEsS0FBSyxRQUFRLGNBQWM7QUFBQSxNQUN4QyxhQUFhLEtBQUssUUFBUSxjQUFjO0FBQUEsTUFDeEMsVUFBVSxLQUFLLFFBQVEsV0FBVztBQUFBLE1BQ2xDLFVBQVUsS0FBSyxRQUFRLFdBQVc7QUFBQSxJQUNwQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLHFCQUFxQjtBQUFBLEVBQ3ZCO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
