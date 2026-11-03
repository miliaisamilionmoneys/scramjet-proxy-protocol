import { cpSync, rmSync, mkdirSync } from "node:fs";
import { scramjetPath } from "@mercuryworkshop/scramjet/path";
import { libcurlPath } from "@mercuryworkshop/libcurl-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });
cpSync("public", "dist", { recursive: true });
cpSync(scramjetPath, "dist/scram", { recursive: true });
cpSync(libcurlPath, "dist/libcurl", { recursive: true });
cpSync(baremuxPath, "dist/baremux", { recursive: true });
