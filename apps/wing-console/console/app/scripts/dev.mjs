import { createConsoleServer } from "@wingconsole/server";
import { fileURLToPath } from "node:url";
import open from "open";

import { createServer as createViteServer } from "vite";
import { viteConfig } from "./config.mjs";

const vite = await createViteServer({
  ...viteConfig,
  server: { middlewareMode: true },
});

const { port } = await createConsoleServer({
  wingfile: fileURLToPath(new URL("../demo/index.w", import.meta.url)),
  async onExpressCreated(app) {
    app.use(vite.middlewares);
  },
  log: {
    info: console.log,
    error: console.error,
    verbose: console.log,
  },
  config: {
    addEventListener(event, listener) {},
    removeEventListener(event, listener) {},
    get(key) {
      return undefined;
    },
    set(key, value) {},
  },
  hostUtils: {
    async openExternal(url) {
      await open(url);
    },
  },
});

await open(`http://localhost:${port}`);

console.log(`Wing Console is running on http://localhost:${port}/`);
