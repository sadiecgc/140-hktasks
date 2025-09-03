// netlify/functions/submissions.mjs
// Minimal, working function that stores & returns submissions using Netlify Blobs.
// Works with modern Netlify Functions (ESM). No Google setup required.
import { getStore } from "@netlify/blobs";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
};

export default async (request, context) => {
  const store = getStore("submissions");

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }

  if (request.method === "GET") {
    const list = (await store.get("all", { type: "json", consistency: "strong" })) ?? [];
    return new Response(JSON.stringify({ submissions: list }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...cors }
    });
  }

  if (request.method === "POST") {
    const payload = await request.json();
    const list = (await store.get("all", { type: "json", consistency: "strong" })) ?? [];
    list.push(payload);
    await store.setJSON("all", list);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...cors }
    });
  }

  return new Response("Method Not Allowed", { status: 405, headers: cors });
};
