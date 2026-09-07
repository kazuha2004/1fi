from django.db.models import Prefetch
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import EMIPlan, Product, ProductVariant
from .serializers import EMIPlanSerializer, ProductDetailSerializer, ProductSerializer, ProductVariantSerializer


@api_view(["GET"])
def product_list(request):
    products = Product.objects.prefetch_related(
        Prefetch("variants", queryset=ProductVariant.objects.all()),
        Prefetch("emi_plans", queryset=EMIPlan.objects.all()),
    )
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def product_detail(request, pk):
    product = Product.objects.prefetch_related(
        Prefetch("variants", queryset=ProductVariant.objects.all()),
        Prefetch("emi_plans", queryset=EMIPlan.objects.all()),
    ).filter(pk=pk).first()

    if product is None:
        return Response({"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = ProductDetailSerializer(product)
    return Response(serializer.data)


@api_view(["GET"])
def product_variants(request, pk):
    product = Product.objects.filter(pk=pk).first()
    if product is None:
        return Response({"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

    variants = product.variants.all()
    serializer = ProductVariantSerializer(variants, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def product_emi_plans(request, pk):
    product = Product.objects.filter(pk=pk).first()
    if product is None:
        return Response({"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

    plans = product.emi_plans.all().order_by("tenure_months")
    serializer = EMIPlanSerializer(plans, many=True)
    return Response(serializer.data)
