"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { AppShell } from '@/components/layout/AppShell';
import { getEMIPlans, getProduct } from '@/lib/api';
import type { EMIPlan, ProductDetail } from '@/types/product';

function CheckoutPageContent() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = Number(params.id);
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [plans, setPlans] = useState<EMIPlan[]>([]);
  const [loading, setLoading] = useState(true);

  const selectedPlanId = Number(searchParams.get("plan") ?? 0);
  const selectedVariant = searchParams.get("variant") ?? "";
  const selectedPrice = Number(searchParams.get("price") ?? 0);
  const selectedMonthlyAmount = Number(searchParams.get("monthly") ?? 0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productData, planData] = await Promise.all([getProduct(productId), getEMIPlans(productId)]);
        setProduct(productData);
        setPlans(planData);
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, [productId]);

  const selectedPlan = useMemo(() => plans.find((plan) => plan.id === selectedPlanId) ?? plans[0], [plans, selectedPlanId]);

  if (loading || !product) {
    return (
      <AppShell>
        <div className="px-4 py-5">
          <div className="h-8 w-40 animate-pulse rounded-full bg-slate-200" />
          <div className="mt-6 h-48 animate-pulse rounded-[1.8rem] bg-slate-200" />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="px-4 pb-28 pt-5">
        <div className="mb-5 flex items-center gap-3">
          <button onClick={() => router.back()} className="rounded-full bg-white p-2 text-slate-700 shadow-sm ring-1 ring-slate-200">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-400">Order summary</p>
            <h1 className="text-2xl font-semibold text-slate-900">Order Summary</h1>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="space-y-4 text-sm text-slate-600">
            <div className="flex justify-between gap-3">
              <span className="text-slate-500">Product</span>
              <span className="font-medium text-slate-900">{product.name}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-slate-500">Variant</span>
              <span className="font-medium text-slate-900">{selectedVariant || 'Default option'}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-slate-500">Product Price</span>
              <span className="font-medium text-slate-900">₹{(selectedPrice || product.price).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-slate-500">Selected EMI</span>
              <span className="font-medium text-slate-900">{selectedPlan?.tenure_months ?? 0} months</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-slate-500">Monthly Payment</span>
              <span className="font-medium text-slate-900">₹{(selectedMonthlyAmount || selectedPlan?.monthly_amount || 0).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-slate-500">Interest</span>
              <span className="font-medium text-slate-900">₹0</span>
            </div>
          </div>

          <button onClick={() => router.push('/')} className="mt-6 w-full rounded-full bg-[#5b2ddc] px-4 py-3 text-sm font-semibold text-white">
            Continue
          </button>
        </div>
      </div>
    </AppShell>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#f5f5f3] text-sm text-slate-500">Loading summary...</div>}>
      <CheckoutPageContent />
    </Suspense>
  );
}
