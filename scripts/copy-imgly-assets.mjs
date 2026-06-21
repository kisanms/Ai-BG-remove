// Downloads the @imgly/background-removal "data" package (the AI model
// weights + ONNX Runtime WASM files) and unpacks it into /public/imgly so
// the app can serve the model from its own origin instead of fetching it
// from the imgly CDN on every end-user's first run.
//
// IMPORTANT — why this is a *download* and not just a copy from
// node_modules: the @imgly/background-removal npm package does NOT bundle
// the model weights or the resources.json manifest it needs at runtime.
// Those live in a separate, version-matched "data" package that imgly
// hosts at:
//
//   https://staticimgly.com/@imgly/background-removal-data/<version>/package.tgz
//
// This is imgly's own documented self-hosting method (see their README,
// "Custom Asset Serving" section). An earlier version of this script
// copied node_modules/@imgly/background-removal/dist directly, which only
// contains the JS/WASM runtime glue — not the actual model weights or the
// resources.json manifest — which is why the app threw:
//   "Resource /models/isnet_fp16 not found. Ensure that config.publicPath
//    is configured correctly."
//
// Running this after `npm install` (see package.json "postinstall") makes
// the app fully self-contained at build/deploy time. Internet access is
// only needed once, at `npm install` time on the machine that builds the
// app — not in the end user's browser.

import { existsSync, mkdirSync, rmSync, readFileSync, createWriteStream, cpSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import { execFileSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

const targetDir = join(projectRoot, "public", "imgly");
const tmpDir = join(projectRoot, ".imgly-data-tmp");
const tarballPath = join(tmpDir, "package.tgz");

function getInstalledVersion() {
  // Prefer reading the installed package's own package.json — most
  // accurate, since it reflects exactly what npm resolved on disk.
  const installedPkgJson = join(
    projectRoot,
    "node_modules",
    "@imgly",
    "background-removal",
    "package.json"
  );
  if (existsSync(installedPkgJson)) {
    const pkg = JSON.parse(readFileSync(installedPkgJson, "utf8"));
    if (pkg?.version) return pkg.version;
  }
  // Fall back to package-lock.json if node_modules isn't present for
  // whatever reason.
  const lockPath = join(projectRoot, "package-lock.json");
  if (existsSync(lockPath)) {
    const lock = JSON.parse(readFileSync(lockPath, "utf8"));
    const resolved = lock?.packages?.["node_modules/@imgly/background-removal"];
    if (resolved?.version) return resolved.version;
  }
  return null;
}

async function main() {
  const version = getInstalledVersion();
  if (!version) {
    console.warn(
      "[copy-imgly-assets] Could not determine the installed @imgly/background-removal version. " +
        "Skipping local asset download — the app will fall back to imgly's CDN at runtime."
    );
    return;
  }

  const dataUrl = `https://staticimgly.com/@imgly/background-removal-data/${version}/package.tgz`;
  console.log(`[copy-imgly-assets] Fetching model/runtime assets for v${version} from ${dataUrl} ...`);

  let response;
  try {
    response = await fetch(dataUrl);
  } catch (err) {
    console.warn(
      `[copy-imgly-assets] Network request to ${dataUrl} failed (${err.message}). ` +
        "Skipping local asset download — the app will fall back to imgly's CDN at runtime in the browser, " +
        "which requires end users to have unrestricted access to staticimgly.com."
    );
    return;
  }

  if (!response.ok || !response.body) {
    console.warn(
      `[copy-imgly-assets] Request to ${dataUrl} returned HTTP ${response.status}. ` +
        "Skipping local asset download — double-check the version number matches an existing release " +
        "(visit the URL above in a browser to confirm)."
    );
    return;
  }

  rmSync(tmpDir, { recursive: true, force: true });
  mkdirSync(tmpDir, { recursive: true });

  await pipeline(Readable.fromWeb(response.body), createWriteStream(tarballPath));

  // The tarball's top-level folder is "package/", and the assets we need
  // are under "package/dist/" (per imgly's documented self-hosting steps).
  // `tar` ships built into Windows 10 (1803+), macOS, and Linux, so this
  // should work cross-platform without extra dependencies.
  try {
    execFileSync("tar", ["-xzf", tarballPath, "-C", tmpDir]);
  } catch (err) {
    console.warn(
      `[copy-imgly-assets] Could not run 'tar' to extract the downloaded package (${err.message}). ` +
        "If you're on an older Windows version without tar.exe, extract " +
        `${tarballPath} manually and copy its package/dist folder into ${targetDir}, ` +
        "or skip this — the app will fall back to imgly's CDN at runtime."
    );
    return;
  }

  const extractedDist = join(tmpDir, "package", "dist");
  if (!existsSync(extractedDist)) {
    console.warn(
      `[copy-imgly-assets] Expected ${extractedDist} after extracting the data package, but it was not found. ` +
        "The package layout may have changed — check staticimgly.com manually."
    );
    return;
  }

  rmSync(targetDir, { recursive: true, force: true });
  mkdirSync(targetDir, { recursive: true });
  // Use Node's built-in recursive copy (fs.cpSync, Node 16.7+) instead of
  // shelling out to the Unix `cp` command — `cp` doesn't exist on Windows,
  // which previously caused this step to fail with "spawnSync cp ENOENT"
  // even though the download and extraction above succeeded fine.
  cpSync(extractedDist, targetDir, { recursive: true });

  rmSync(tmpDir, { recursive: true, force: true });

  console.log(`[copy-imgly-assets] Model + WASM runtime assets for v${version} ready at ${targetDir}`);
}

main().catch((err) => {
  console.warn(
    `[copy-imgly-assets] Unexpected error: ${err.message}. ` +
      "Skipping local asset download — the app will fall back to imgly's CDN at runtime."
  );
});
