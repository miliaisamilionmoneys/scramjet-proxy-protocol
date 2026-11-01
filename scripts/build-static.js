import { cpSync, rmSync, mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { scramjetPath } from "@mercuryworkshop/scramjet/path";
import { libcurlPath } from "@mercuryworkshop/libcurl-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";

// Static build for hosts that only serve files (e.g. Netlify).
// The wisp websocket server cannot run there, so point the client at an
// external one with the WISP_URL environment variable.

const outPath = fileURLToPath(new URL("../dist/", import.meta.url));
const publicPath = fileURLToPath(new URL("../public/", import.meta.url));

rmSync(outPath, { recursive: true, force: true });
mkdirSync(outPath, { recursive: true });

cpSync(publicPath, outPath, { recursive: true });
cpSync(scramjetPath, outPath + "scram", { recursive: true });
cpSync(libcurlPath, outPath + "libcurl", { recursive: true });
cpSync(baremuxPath, outPath + "baremux", { recursive: true });

const config = {};
if (process.env.WISP_URL) config.wispurl = process.env.WISP_URL;
writeFileSync(
	outPath + "config.js",
	`let _CONFIG = ${JSON.stringify(config)};\n`
);

console.log("Static site written to dist/");
