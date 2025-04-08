import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
  return c.json("Hello moop!");
});

app.get("/hello/:name", (c) => {
  const { name } = c.req.param()
  return c.json(`Hello ${name}`);
});

export const GET = handle(app);
