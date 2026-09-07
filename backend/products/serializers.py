from rest_framework import serializers

from .models import EMIPlan, Product, ProductVariant


class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ["id", "name", "value", "additional_price"]


class EMIPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = EMIPlan
        fields = [
            "id",
            "tenure_months",
            "monthly_amount",
            "interest_rate",
            "is_no_cost_emi",
        ]


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "image",
            "price",
            "category",
            "brand",
            "created_at",
        ]


class ProductDetailSerializer(serializers.ModelSerializer):
    variants = serializers.SerializerMethodField()
    emi_plans = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "image",
            "price",
            "category",
            "brand",
            "created_at",
            "variants",
            "emi_plans",
        ]

    def get_variants(self, obj):
        return ProductVariantSerializer(obj.variants.all(), many=True).data

    def get_emi_plans(self, obj):
        return EMIPlanSerializer(obj.emi_plans.all().order_by("tenure_months"), many=True).data
