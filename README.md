# 1Fi Marketplace Assignment

## Project overview

This project recreates the 1Fi fintech-style mobile app experience and adds the required 1Fi Marketplace feature. The scope focuses on the home page, shopping flow, product discovery, variant selection, EMI plan selection, and order summary.

## Features

- 1Fi-inspired home page with fintech UI styling
- Fixed bottom navigation with Home, Shop, EMI Dues, Limit, and Profile
- Shop tabs for Top Brands, Nearby Stores, and 1Fi Marketplace
- Marketplace search and category filtering
- Product detail experience with variant and EMI selection
- Order summary flow with selected EMI details
- Loading, error, and empty states
- Backend API with seeded product data

## Tech stack

- Frontend: Next.js, TypeScript, Tailwind CSS, Lucide React
- Backend: Django, Django REST Framework
- Database: SQLite

## Folder structure

```text
1fi/
├── backend/
│   ├── config/
│   ├── products/
│   ├── manage.py
│   └── README.md
├── frontend/
│   ├── src/
│   ├── package.json
│   └── next.config.ts
├── README.md
└── .gitignore
```

## Deployment

### Frontend on Vercel

Create a Vercel project from this repository and set the project root directory to `frontend`. Vercel will detect Next.js automatically. Add this environment variable in the Vercel project settings:

```text
NEXT_PUBLIC_API_URL=https://<your-render-service>.onrender.com/api
```

### Backend on Render

Use the included `render.yaml` as a Blueprint. It creates the Django web service and a PostgreSQL database, runs migrations and seed data during deployment, and starts Gunicorn. Set `CORS_ALLOWED_ORIGINS` to the deployed Vercel URL, for example:

```text
CORS_ALLOWED_ORIGINS=https://<your-vercel-project>.vercel.app
```

Render generates `DJANGO_SECRET_KEY`; add your MongoDB Atlas connection string as `MONGO_URI`.

## How to run backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_products
python manage.py runserver 0.0.0.0:8000
```

## How to run frontend

```bash
cd frontend
npm install
npm run dev
```

Then open `http://localhost:3000`.

## API endpoints

- `GET http://127.0.0.1:8000/api/products/`
- `GET http://127.0.0.1:8000/api/products/<id>/`
- `GET http://127.0.0.1:8000/api/products/<id>/variants/`
- `GET http://127.0.0.1:8000/api/products/<id>/emi-plans/`

## Sample data

The backend seeds six products:

- Apple iPhone 16
- Samsung Galaxy S25
- Sony WH-1000XM5
- MacBook Air
- Apple iPad
- Samsung Smart TV

## Assignment scope

This project intentionally focuses on the marketplace flow and does not implement real payments, KYC, ordering, or live financing processing.

## Design decisions

- Kept the overall layout to a narrow mobile app shell to match the real 1Fi UI
- Used a soft neutral palette with purple accents to preserve the fintech branding
- Kept the shop tabs and bottom navigation intentionally minimal and consistent
- Split API logic into a dedicated data layer for clean separation of concerns
