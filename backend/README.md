# 1Fi Marketplace Backend

This is the Django backend for the 1Fi internship assignment demo. It provides product, variant, and EMI-plan APIs used by the frontend marketplace flow.

## Features

- Product catalog API
- Dynamic product detail and variant loading
- EMI plan retrieval for order selection
- MongoDB Atlas database for product data
- Seeded demo data for marketplace products

## Tech stack

- Python 3.12+
- Django 6.1+
- Django REST Framework
- MongoDB Atlas via PyMongo

## Run backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_products
python manage.py runserver 0.0.0.0:8000
```

Before seeding or serving the API, set `MONGO_URI` and optionally `MONGO_DB_NAME`. Copy `.env.example` to your environment and paste your MongoDB Atlas connection string into `MONGO_URI`.

## API endpoints

- `GET /api/products/`
- `GET /api/products/<id>/`
- `GET /api/products/<id>/variants/`
- `GET /api/products/<id>/emi-plans/`

## Sample data

MongoDB is seeded with six demo products including:

- Apple iPhone 16
- Samsung Galaxy S25
- Sony WH-1000XM5
- MacBook Air
- Apple iPad
- Samsung Smart TV

## Assignment scope

This backend is intentionally scoped to the marketplace flow only. It does not implement real payments, KYC, or loan processing.
