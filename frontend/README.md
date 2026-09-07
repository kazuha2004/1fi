# 1Fi Marketplace Frontend

Next.js frontend for the 1Fi marketplace assignment.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000. Copy `.env.example` to `.env.local` when you need to change the backend URL.

## Deploy on Vercel

Create a Vercel project from this repository and set the project root directory to `frontend`. Vercel detects Next.js automatically. Add this environment variable:

```text
NEXT_PUBLIC_API_URL=https://<your-render-service>.onrender.com/api
```

The included `vercel.json` declares the Next.js framework.
