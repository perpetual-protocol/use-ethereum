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
        commonjs({ extensions: [".js", ".ts"] }),
    ],
}
