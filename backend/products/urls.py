from django.urls import path

from .views import product_detail, product_emi_plans, product_list, product_variants

urlpatterns = [
    path("products/", product_list, name="product-list"),
    path("products/<int:pk>/", product_detail, name="product-detail"),
    path("products/<int:pk>/variants/", product_variants, name="product-variants"),
    path("products/<int:pk>/emi-plans/", product_emi_plans, name="product-emi-plans"),
]
