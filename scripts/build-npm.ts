import { build } from "dnt/mod.ts"

/**
 * deno build オプション
 * https://github.com/denoland/dnt
 */

await build({
  entryPoints: ["mod/index.ts"],
  outDir: "npm",
  importMap: "deno.jsonc",
  shims: {
    deno: true,
  },
  package: {
    name: "data-lake-diff",
    version: Deno.args[0],
    license: "MIT",
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "npm/LICENSE")
    Deno.copyFileSync("README.md", "npm/README.md")
  },
  typeCheck: "both",
})
