"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { AppShell } from '@/components/layout/AppShell';
import { getEMIPlans, getProduct } from '@/lib/api';
import type { EMIPlan, ProductDetail } from '@/types/product';

export default function ProductDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const productId = Number(params.id);
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [plans, setPlans] = useState<EMIPlan[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const [productData, planData] = await Promise.all([getProduct(productId), getEMIPlans(productId)]);
        setProduct(productData);
        setPlans(planData);
        setSelectedVariants(
          productData.variants.reduce<Record<string, string>>((selection, variant) => {
            if (!(variant.name in selection)) {
              selection[variant.name] = variant.value;
            }
            return selection;
          }, {}),
        );
        if (planData.length > 0) {
          setSelectedPlanId(planData.find((plan) => plan.tenure_months === 12)?.id ?? planData[0].id);
        }
      } catch {
        setError('Unable to load product details.');
      } finally {
        setLoading(false);
      }
    };

    void loadProduct();
  }, [productId]);

  const selectedPlan = useMemo(() => plans.find((plan) => plan.id === selectedPlanId) ?? null, [plans, selectedPlanId]);
  const selectedVariantLabel = Object.entries(selectedVariants)
    .map(([name, value]) => `${name}: ${value}`)
    .join(" | ");
  const totalPrice = useMemo(() => {
    if (!product) {
      return 0;
    }

    return product.price + product.variants.reduce((total, variant) => {
      return selectedVariants[variant.name] === variant.value ? total + variant.additional_price : total;
    }, 0);
  }, [product, selectedVariants]);
  const monthlyAmount = selectedPlan ? Math.ceil(totalPrice / selectedPlan.tenure_months) : 0;

  const isReady = Boolean(product && selectedVariantLabel && selectedPlan);

  if (loading) {
    return (
      <AppShell>
        <div className="px-4 py-5">
          <div className="mb-4 h-10 w-28 animate-pulse rounded-full bg-slate-200" />
          <div className="h-60 animate-pulse rounded-[1.8rem] bg-slate-200" />
          <div className="mt-4 h-5 w-1/3 animate-pulse rounded bg-slate-200" />
          <div className="mt-4 h-8 w-1/2 animate-pulse rounded bg-slate-200" />
        </div>
      </AppShell>
    );
  }

  if (error || !product) {
    return (
      <AppShell>
        <div className="px-4 py-6">
          <div className="rounded-[1.7rem] border border-dashed border-slate-300 bg-white px-5 py-16 text-center text-sm text-slate-500">
            {error ?? 'Unable to load product details.'}
            <div className="mt-4 flex justify-center">
              <button onClick={() => window.location.reload()} className="rounded-full bg-[#5b2ddc] px-4 py-2 text-sm font-semibold text-white">Try Again</button>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="px-4 pb-28 pt-5">
        <div className="mb-4 flex items-center gap-3">
          <button onClick={() => router.back()} className="rounded-full bg-white p-2 text-slate-700 shadow-sm ring-1 ring-slate-200">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <p className="text-sm font-medium text-slate-500">Back</p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white">
          <div className="relative h-64 w-full bg-slate-100">
            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 420px) 100vw, 420px" />
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-violet-700">{product.brand}</p>
                <h1 className="mt-1 text-2xl font-semibold text-slate-900">{product.name}</h1>
              </div>
              <span className="rounded-full bg-violet-50 px-2 py-1 text-[0.62rem] font-semibold text-violet-700">No-cost EMI</span>
            </div>

            <p className="mt-4 text-3xl font-semibold text-slate-900">₹{totalPrice.toLocaleString('en-IN')}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{product.description}</p>

            <div className="mt-6 rounded-[1.5rem] bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Choose Variant</p>
              {Array.from(new Set(product.variants.map((variant) => variant.name))).map((variantName) => {
                const options = product.variants.filter((variant) => variant.name === variantName);
                return (
                  <div key={variantName} className="mt-4">
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">{variantName}</p>
                    <div className="flex flex-wrap gap-2">
                      {options.map((variant) => {
                        const valueKey = `${variant.name}: ${variant.value}`;
                        const isSelected = selectedVariants[variant.name] === variant.value;
                        return (
                          <button
                            key={valueKey}
                            onClick={() => setSelectedVariants((current) => ({ ...current, [variant.name]: variant.value }))}
                            className={`rounded-full border px-3 py-2 text-sm font-medium ${isSelected ? 'border-[#5b2ddc] bg-violet-50 text-[#5b2ddc]' : 'border-slate-200 bg-white text-slate-700'}`}
                          >
                            {variant.value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-[1.5rem] bg-white p-4 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-900">Select a plan</p>
              <div className="mt-4 space-y-3">
                {plans.map((plan) => (
                  <button key={plan.id} onClick={() => setSelectedPlanId(plan.id)} className={`flex w-full items-center justify-between rounded-[1.2rem] border px-3 py-3 text-left ${selectedPlanId === plan.id ? 'border-[#5b2ddc] bg-violet-50' : 'border-slate-200 bg-white'}`}>
                    <div className="flex items-center gap-3">
                      <span className={`h-4 w-4 rounded-full border ${selectedPlanId === plan.id ? 'border-[#5b2ddc] bg-[#5b2ddc]' : 'border-slate-300'}`} />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{plan.tenure_months} Months</p>
                        <p className="text-xs text-slate-500">₹{Math.ceil(totalPrice / plan.tenure_months).toLocaleString('en-IN')}/month</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] bg-[#f7f4ff] p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900"><ShieldCheck className="h-4 w-4 text-[#5b2ddc]" /> No-cost EMI</div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#5b2ddc]" /> No credit score required</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#5b2ddc]" /> Flexible repayment</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#5b2ddc]" /> 0% interest</li>
              </ul>
            </div>

            <Link
              href={isReady ? `/marketplace/${product.id}/checkout?variant=${encodeURIComponent(selectedVariantLabel)}&plan=${selectedPlan?.id ?? ''}&price=${totalPrice}&monthly=${monthlyAmount}` : '#'}
              className={`mt-6 block w-full rounded-full px-4 py-3 text-center text-sm font-semibold text-white ${isReady ? 'bg-[#5b2ddc]' : 'cursor-not-allowed bg-slate-300'}`}
              onClick={(event) => {
                if (!isReady) {
                  event.preventDefault();
                }
              }}
            >
              Proceed with EMI
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
