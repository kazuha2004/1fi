from decimal import Decimal
from datetime import datetime, timezone

from django.core.management.base import BaseCommand

from products.mongo import products_collection


PRODUCT_SEED = [
    {
        "name": "Apple iPhone 16",
        "slug": "apple-iphone-16",
        "description": "A new era of iPhone with powerful camera features and super-fast performance.",
        "image": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=80",
        "price": Decimal("79900"),
        "category": "Electronics",
        "brand": "Apple",
        "variants": [
            {"name": "Storage", "value": "128 GB", "additional_price": Decimal("0")},
            {"name": "Storage", "value": "256 GB", "additional_price": Decimal("20000")},
            {"name": "Storage", "value": "512 GB", "additional_price": Decimal("40000")},
            {"name": "Color", "value": "Black", "additional_price": Decimal("0")},
            {"name": "Color", "value": "White", "additional_price": Decimal("0")},
            {"name": "Color", "value": "Blue", "additional_price": Decimal("0")},
        ],
        "emi_plans": [
            {"tenure_months": 3, "monthly_amount": Decimal("26633"), "interest_rate": Decimal("0"), "is_no_cost_emi": True},
            {"tenure_months": 6, "monthly_amount": Decimal("13317"), "interest_rate": Decimal("0"), "is_no_cost_emi": True},
            {"tenure_months": 12, "monthly_amount": Decimal("6658"), "interest_rate": Decimal("0"), "is_no_cost_emi": True},
            {"tenure_months": 18, "monthly_amount": Decimal("4439"), "interest_rate": Decimal("0"), "is_no_cost_emi": True},
        ],
    },
    {
        "name": "Samsung Galaxy S25",
        "slug": "samsung-galaxy-s25",
        "description": "Premium flagship features with elegant design and all-day battery strength.",
        "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
        "price": Decimal("74900"),
        "category": "Electronics",
        "brand": "Samsung",
        "variants": [
            {"name": "Storage", "value": "128 GB", "additional_price": Decimal("0")},
            {"name": "Storage", "value": "256 GB", "additional_price": Decimal("18000")},
            {"name": "Color", "value": "Icy Blue", "additional_price": Decimal("0")},
            {"name": "Color", "value": "Silver", "additional_price": Decimal("0")},
        ],
        "emi_plans": [
            {"tenure_months": 3, "monthly_amount": Decimal("24967"), "interest_rate": Decimal("0"), "is_no_cost_emi": True},
            {"tenure_months": 6, "monthly_amount": Decimal("12484"), "interest_rate": Decimal("0"), "is_no_cost_emi": True},
            {"tenure_months": 12, "monthly_amount": Decimal("6242"), "interest_rate": Decimal("0"), "is_no_cost_emi": True},
        ],
    },
    {
        "name": "Sony WH-1000XM5",
        "slug": "sony-wh-1000xm5",
        "description": "Immersive noise-canceling headphones tuned for travel, work, and everyday listening.",
        "image": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80",
        "price": Decimal("29990"),
        "category": "Lifestyle",
        "brand": "Sony",
        "variants": [
            {"name": "Color", "value": "Black", "additional_price": Decimal("0")},
            {"name": "Color", "value": "Silver", "additional_price": Decimal("0")},
        ],
        "emi_plans": [
            {"tenure_months": 3, "monthly_amount": Decimal("9997"), "interest_rate": Decimal("0"), "is_no_cost_emi": True},
            {"tenure_months": 6, "monthly_amount": Decimal("4998"), "interest_rate": Decimal("0"), "is_no_cost_emi": True},
            {"tenure_months": 12, "monthly_amount": Decimal("2499"), "interest_rate": Decimal("0"), "is_no_cost_emi": True},
        ],
    },
    {
        "name": "MacBook Air",
        "slug": "macbook-air",
        "description": "Thin, lightweight, and powerful enough for work, study, and creative pursuits.",
        "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
        "price": Decimal("99900"),
        "category": "Electronics",
        "brand": "Apple",
        "variants": [
            {"name": "Storage", "value": "256 GB", "additional_price": Decimal("0")},
            {"name": "Storage", "value": "512 GB", "additional_price": Decimal("25000")},
            {"name": "Color", "value": "Silver", "additional_price": Decimal("0")},
            {"name": "Color", "value": "Sky Blue", "additional_price": Decimal("0")},
        ],
        "emi_plans": [
            {"tenure_months": 3, "monthly_amount": Decimal("33300"), "interest_rate": Decimal("0"), "is_no_cost_emi": True},
            {"tenure_months": 6, "monthly_amount": Decimal("16650"), "interest_rate": Decimal("0"), "is_no_cost_emi": True},
            {"tenure_months": 12, "monthly_amount": Decimal("8325"), "interest_rate": Decimal("0"), "is_no_cost_emi": True},
        ],
    },
    {
        "name": "Apple iPad",
        "slug": "apple-ipad",
        "description": "Versatile tablet designed for productivity, creativity, and immersive entertainment.",
        "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80",
        "price": Decimal("41900"),
        "category": "Electronics",
        "brand": "Apple",
        "variants": [
            {"name": "Storage", "value": "64 GB", "additional_price": Decimal("0")},
            {"name": "Storage", "value": "256 GB", "additional_price": Decimal("15000")},
            {"name": "Color", "value": "Space Gray", "additional_price": Decimal("0")},
            {"name": "Color", "value": "Blue", "additional_price": Decimal("0")},
        ],
        "emi_plans": [
            {"tenure_months": 3, "monthly_amount": Decimal("13967"), "interest_rate": Decimal("0"), "is_no_cost_emi": True},
            {"tenure_months": 6, "monthly_amount": Decimal("6984"), "interest_rate": Decimal("0"), "is_no_cost_emi": True},
            {"tenure_months": 12, "monthly_amount": Decimal("3492"), "interest_rate": Decimal("0"), "is_no_cost_emi": True},
        ],
    },
    {
        "name": "Samsung Smart TV",
        "slug": "samsung-smart-tv",
        "description": "Crisp visuals and immersive audio for your home entertainment setup.",
        "image": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=80",
        "price": Decimal("89990"),
        "category": "Travel",
        "brand": "Samsung",
        "variants": [
            {"name": "Screen Size", "value": "55 inch", "additional_price": Decimal("0")},
            {"name": "Screen Size", "value": "65 inch", "additional_price": Decimal("24000")},
            {"name": "Color", "value": "Black", "additional_price": Decimal("0")},
        ],
        "emi_plans": [
            {"tenure_months": 3, "monthly_amount": Decimal("29997"), "interest_rate": Decimal("0"), "is_no_cost_emi": True},
            {"tenure_months": 6, "monthly_amount": Decimal("14998"), "interest_rate": Decimal("0"), "is_no_cost_emi": True},
            {"tenure_months": 12, "monthly_amount": Decimal("7499"), "interest_rate": Decimal("0"), "is_no_cost_emi": True},
        ],
    },
]


class Command(BaseCommand):
    help = "Seed product, variant, and EMI data for the 1Fi marketplace demo"

    def handle(self, *args, **options):
        now = datetime.now(timezone.utc).isoformat()
        documents = []
        for product_id, product_data in enumerate(PRODUCT_SEED, start=1):
            documents.append({
                "id": product_id,
                "name": product_data["name"],
                "slug": product_data["slug"],
                "description": product_data["description"],
                "image": product_data["image"],
                "price": float(product_data["price"]),
                "category": product_data["category"],
                "brand": product_data["brand"],
                "created_at": now,
                "variants": [
                    {
                        "id": index,
                        "name": variant["name"],
                        "value": variant["value"],
                        "additional_price": float(variant["additional_price"]),
                    }
                    for index, variant in enumerate(product_data["variants"], start=1)
                ],
                "emi_plans": [
                    {
                        "id": index,
                        "tenure_months": plan["tenure_months"],
                        "monthly_amount": float(plan["monthly_amount"]),
                        "interest_rate": float(plan["interest_rate"]),
                        "is_no_cost_emi": plan["is_no_cost_emi"],
                    }
                    for index, plan in enumerate(product_data["emi_plans"], start=1)
                ],
            })

        collection = products_collection()
        collection.delete_many({})
        collection.insert_many(documents)

        self.stdout.write(self.style.SUCCESS("Seeded 6 marketplace products in MongoDB."))
