import babel from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import url from "@rollup/plugin-url"
import { dirname } from "path"
import external from "rollup-plugin-peer-deps-external"
import pkg from "./package.json"

export default {
    input: "src/index.tsx",
    output: [
        {
            dir: dirname(pkg.main),
            format: "cjs",
            exports: "named",
            sourcemap: true,
        },
    ],
    plugins: [
        external(),
        url({ exclude: ["**/*.svg"] }),
        resolve(),
        typescript(),
        json(),
        babel({
            exclude: "node_modules/**",
            extensions: [".js", ".jsx", "ts", "tsx"],
            presets: ["@babel/env", "@babel/preset-react"],
        }),
        commonjs({ extensions: [".js", ".ts"] }),
    ],
}
