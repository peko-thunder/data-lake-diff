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
    name: "record-diff",
    version: Deno.args[0],
    description: "Take the difference between old and new.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/peko-thunder/record-diff-npm.git",
    },
    bugs: {
      url: "https://github.com/peko-thunder/record-diff-npm/issues",
    },
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "npm/LICENSE")
    Deno.copyFileSync("README.md", "npm/README.md")
  },
  typeCheck: "both",
})
