import { type Context, Hono } from "hono";
import { serveStatic } from "hono/bun";

const app = new Hono();

// Serve static files from public directory.
app.use("/*", serveStatic({ root: "./public" }));

app.get("/greet", (c: Context) => {
  // Return an instance of a custom element.
  return c.html(<hello-world name="Server-side"></hello-world>);
});

export default app;
