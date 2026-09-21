import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const html = `<!doctype html>
<html><head><style>
  html, body { margin: 0; padding: 0; background: #333; }
  .row { display: flex; gap: 16px; padding: 16px; align-items: center; }
  .box { background: #fff; }
</style></head>
<body>
  <div class="row">
    <div class="box"><img src="file:///workspace/public/favicon.svg" width="16" height="16" /></div>
    <div class="box"><img src="file:///workspace/public/favicon.svg" width="32" height="32" /></div>
    <div class="box"><img src="file:///workspace/public/favicon.svg" width="64" height="64" /></div>
  </div>
</body></html>`;

writeFileSync("/workspace/.grok/favicon-preview.html", html);

const browser = await chromium.launch({ args: ["--allow-file-access-from-files"] });
const page = await browser.newPage({ viewport: { width: 280, height: 120 } });
await page.goto("file:///workspace/.grok/favicon-preview.html", { waitUntil: "load" });
await page.screenshot({ path: "/workspace/.grok/favicon-raster.png" });
await browser.close();
console.log("rasterized");
