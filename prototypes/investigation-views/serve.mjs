// THROWAWAY PROTOTYPE SERVER. Do not promote this into the application.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const htmlPath = fileURLToPath(new URL("./index.html", import.meta.url));

createServer(async (request, response) => {
  const path = new URL(request.url ?? "/", "http://localhost").pathname;
  if (path !== "/" && path !== "/index.html") {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  try {
    const html = await readFile(htmlPath);
    response.writeHead(200, {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    });
    response.end(html);
  } catch {
    response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    response.end("Could not read prototype file");
  }
}).listen(4174, "127.0.0.1", () => {
  console.log("Investigation views prototype: http://127.0.0.1:4174/?variant=A");
});
