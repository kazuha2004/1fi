from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    description = models.TextField()
    image = models.URLField(max_length=500)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    category = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name


class ProductVariant(models.Model):
    product = models.ForeignKey(Product, related_name="variants", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    value = models.CharField(max_length=100)
    additional_price = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return f"{self.product.name} - {self.name}: {self.value}"


class EMIPlan(models.Model):
    product = models.ForeignKey(Product, related_name="emi_plans", on_delete=models.CASCADE)
    tenure_months = models.PositiveIntegerField()
    monthly_amount = models.DecimalField(max_digits=12, decimal_places=2)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    is_no_cost_emi = models.BooleanField(default=True)

    class Meta:
        ordering = ["tenure_months"]

    def __str__(self):
        return f"{self.product.name} - {self.tenure_months} months"
