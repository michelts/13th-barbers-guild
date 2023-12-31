import { viteSingleFile } from "vite-plugin-singlefile"

export default {
  base: "./",
  build: {
    minify: "terser",
    cssMinify: "lightningcss",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  plugins: [viteSingleFile()],
  server: {
    host: true,
    fs: {
      strict: false,
    },
  },
};
