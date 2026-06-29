import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const watch = process.argv.includes("--watch");
const serve = process.argv.includes("--serve");

const SRC = "src";
const OUT = "public";

const BROWSER_JSX = [
  "data.jsx",
  "hero-split.jsx",
  "portfolio.jsx",
];

async function copyStatic() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });
  await cp(path.join(SRC, "assets"), path.join(OUT, "assets"), { recursive: true });
  await cp(path.join(SRC, "styles.css"), path.join(OUT, "styles.css"));
  await cp(path.join(SRC, "index.html"), path.join(OUT, "index.html"));
  for (const f of BROWSER_JSX) {
    await cp(path.join(SRC, f), path.join(OUT, f));
  }
}

await copyStatic();

if (watch && serve) {
  const { default: esbuild } = await import("esbuild");
  const ctx = await esbuild.context({ logLevel: "info" });
  const { host, port } = await ctx.serve({ servedir: OUT, port: 5173 });
  console.log(`\n  Dev server: http://${host === "0.0.0.0" ? "localhost" : host}:${port}\n`);
  const { watch: fsWatch } = await import("node:fs");
  for (const f of ["styles.css", "index.html", ...BROWSER_JSX]) {
    fsWatch(path.join(SRC, f), async () => {
      try { await cp(path.join(SRC, f), path.join(OUT, f)); } catch {}
    });
  }
} else {
  console.log("Build complete →", OUT);
}
