export default {
    assetsDir: "static",
    base: "/",
    build: {
      optimizeDeps: {
        include: ["dep-a"]
      }
    },
    define: {
      __FOO__: "foo"
    },
    history: "hash",
    hmr: true,
    port: 3000,
    srcDir: "src",
    plugins: [
      require("vite-plugin-react"),
      require("vite-plugin-sass"),
      require("vite-plugin-pwa")
    ],
    rollupInputOptions: {
      external: (id) => /^[^.]/.test(id),
      treeshake: {
        moduleSideEffects: false
      }
    },
    rollupOutputOptions: {
      globals: {
        react: "React"
      }
    }
  };