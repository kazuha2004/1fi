import os
from functools import lru_cache

from pymongo import ASCENDING, MongoClient


@lru_cache(maxsize=1)
def get_database():
    mongo_uri = os.environ.get("MONGO_URI", "").strip()
    if not mongo_uri:
        raise RuntimeError("MONGO_URI is not configured.")

    client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)
    database_name = os.environ.get("MONGO_DB_NAME", "onefi")
    database = client[database_name]
    database.products.create_index([("slug", ASCENDING)], unique=True)
    return database


def products_collection():
    return get_database().products


def product_to_dict(product):
    if product is None:
        return None

    return {
        "id": product["id"],
        "name": product["name"],
        "slug": product["slug"],
        "description": product["description"],
        "image": product["image"],
        "price": product["price"],
        "category": product["category"],
        "brand": product["brand"],
        "created_at": product["created_at"],
    }


def product_detail_to_dict(product):
    result = product_to_dict(product)
    if result is None:
        return None

    result["variants"] = product.get("variants", [])
    result["emi_plans"] = sorted(product.get("emi_plans", []), key=lambda plan: plan["tenure_months"])
    return result
