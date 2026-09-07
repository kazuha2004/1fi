import type { EMIPlan, Product, ProductDetail, ProductVariant } from '@/types/product';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000/api';

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Request failed');
  }

  return response.json() as Promise<T>;
}

export async function getProducts(): Promise<Product[]> {
  return fetchJson<Product[]>('/products/');
}

export async function getProduct(id: number): Promise<ProductDetail> {
  return fetchJson<ProductDetail>(`/products/${id}/`);
}

export async function getProductVariants(id: number): Promise<ProductVariant[]> {
  return fetchJson<ProductVariant[]>(`/products/${id}/variants/`);
}

export async function getEMIPlans(id: number): Promise<EMIPlan[]> {
  return fetchJson<EMIPlan[]>(`/products/${id}/emi-plans/`);
}
