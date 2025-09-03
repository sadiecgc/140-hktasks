# Starter Repo (Netlify + GitHub)

Contents:
- index.html
- netlify.toml
- package.json (ESM, Node >= 18, includes @netlify/blobs)
- netlify/functions/submissions.mjs (serverless function using Netlify Blobs)

Deploy steps (short):
1) Create a new GitHub repo (Public or Private).
2) Click "Add file" → "Upload files" → drag these four items from this zip so they are at the REPO ROOT.
3) Commit.
4) On Netlify → "Add new site" → "Import from Git" → choose this repo.
5) Site settings check:
   - Build command: (leave blank)
   - Publish directory: .
   - Functions directory: netlify/functions
   - Environment variable: NODE_VERSION=18
6) Open your site. GET /.netlify/functions/submissions should return JSON.
