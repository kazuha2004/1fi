from rest_framework import serializers


class ProductVariantSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    value = serializers.CharField()
    additional_price = serializers.FloatField()


class EMIPlanSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    tenure_months = serializers.IntegerField()
    monthly_amount = serializers.FloatField()
    interest_rate = serializers.FloatField()
    is_no_cost_emi = serializers.BooleanField()


class ProductSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    slug = serializers.CharField()
    description = serializers.CharField()
    image = serializers.URLField()
    price = serializers.FloatField()
    category = serializers.CharField()
    brand = serializers.CharField()
    created_at = serializers.CharField()


class ProductDetailSerializer(ProductSerializer):
    variants = ProductVariantSerializer(many=True)
    emi_plans = EMIPlanSerializer(many=True)
