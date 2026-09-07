export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  price: number;
  category: string;
  brand: string;
  created_at: string;
};

export type ProductVariant = {
  id: number;
  name: string;
  value: string;
  additional_price: number;
};

export type EMIPlan = {
  id: number;
  tenure_months: number;
  monthly_amount: number;
  interest_rate: number;
  is_no_cost_emi: boolean;
};

export type ProductDetail = Product & {
  variants: ProductVariant[];
  emi_plans: EMIPlan[];
};
