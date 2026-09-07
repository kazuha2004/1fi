from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .mongo import product_detail_to_dict, product_to_dict, products_collection
from .serializers import EMIPlanSerializer, ProductDetailSerializer, ProductSerializer, ProductVariantSerializer


@api_view(["GET"])
def product_list(request):
    products = [product_to_dict(product) for product in products_collection().find({}, {"_id": 0}).sort("id", -1)]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def product_detail(request, pk):
    product = products_collection().find_one({"id": pk}, {"_id": 0})

    if product is None:
        return Response({"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = ProductDetailSerializer(product_detail_to_dict(product))
    return Response(serializer.data)


@api_view(["GET"])
def product_variants(request, pk):
    product = products_collection().find_one({"id": pk}, {"_id": 0, "variants": 1})
    if product is None:
        return Response({"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

    variants = product.get("variants", [])
    serializer = ProductVariantSerializer(variants, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def product_emi_plans(request, pk):
    product = products_collection().find_one({"id": pk}, {"_id": 0, "emi_plans": 1})
    if product is None:
        return Response({"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

    plans = sorted(product.get("emi_plans", []), key=lambda plan: plan["tenure_months"])
    serializer = EMIPlanSerializer(plans, many=True)
    return Response(serializer.data)
