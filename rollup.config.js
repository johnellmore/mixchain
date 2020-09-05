// rollup.config.js
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "example/chain.ts",
  output: {
    file: "example/chain.js",
    format: "iife",
  },
  plugins: [typescript(), nodeResolve()],
  watch: {
    chokidar: {
      usePolling: true,
    },
  },
};
