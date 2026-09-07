"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AppShell } from '@/components/layout/AppShell';
import { HeroBanner } from '@/components/home/HeroBanner';
import { getProducts } from '@/lib/api';
import type { Product } from '@/types/product';

const tabs = [
  { key: "top-brands", label: "Top Brands" },
  { key: "nearby-stores", label: "Nearby Stores" },
  { key: "marketplace", label: "1Fi Marketplace" },
] as const;

const categories = ["Electronics", "Travel", "Fashion", "Lifestyle"];

const topBrands = [
  { name: "Air India", subtitle: "No-cost EMI up to 18 months", accent: "#e11d48" },
  { name: "Apple Premium Reseller", subtitle: "No-cost EMI up to 24 months", accent: "#111827" },
  { name: "CartLane", subtitle: "No-cost EMI up to 6 months", accent: "#e879f9" },
  { name: "CGH Earth", subtitle: "No-cost EMI up to 24 months", accent: "#d1d5db" },
  { name: "Croma", subtitle: "No-cost EMI up to 6 months", accent: "#2dd4bf" },
  { name: "EaseMyTrip Holiday", subtitle: "No-cost EMI up to 24 months", accent: "#0ea5e9" },
  { name: "EaseMyTrip Hotel", subtitle: "No-cost EMI up to 24 months", accent: "#38bdf8" },
  { name: "Giva", subtitle: "No-cost EMI up to 36 months", accent: "#f9a8d4" },
  { name: "Giva Gold Voucher", subtitle: "No-cost EMI up to 12 months", accent: "#f472b6" },
];

const nearbyStores = [
  { name: "Pacholi Suzuki Raiway Road", distance: "1.0 KM", accent: "#e11d48", address: "64/9, New Railway Rd, near DSD College, Subhash Nagar, Sector 8, Gurugram, Haryana, 122001" },
  { name: "Pacholi Suzuki Rajiv Chowk", distance: "1.4 KM", accent: "#ef4444", address: "6/38, Rajiv Chowk, Sector 33, Rajiv Chowk, Gurugram, Haryana, 122001" },
  { name: "Mahindra Honda Khandra Road", distance: "2.1 KM", accent: "#f97316", address: "60, Khandra Rd, Pace City I, Sector 10A, Gurugram, Haryana, 122001" },
  { name: "Atelier Forbidden Journeys", distance: "3.3 KM", accent: "#f59e0b", address: "Sector 40, Gurugram, Haryana, 122001" },
  { name: "Ashoka Suzuki", distance: "3.6 KM", accent: "#ef4444", address: "Khasra No. 271, 318, Badshahpur Sohna Rd, Gurugram, Haryana, 122001" },
  { name: "Charger On Wheels", distance: "4.1 KM", accent: "#22c55e", address: "Orchid Business Park, Near Subhash Chowk, Gurugram, Haryana, 122001" },
  { name: "TripBouquet", distance: "4.9 KM", accent: "#fbbf24", address: "241, Tower B, Spazeedge, near Dmart, Gurugram, Haryana, 122018" },
  { name: "Pacholi Suzuki Hayatpur", distance: "9.0 KM", accent: "#ef4444", address: "RAKBA 12, KANAL 11, MARLA 0, Hayatpur, SARSAM, Gurugram, Haryana, 122001" },
];

function ShopCardLogo({ accent, label }: { accent: string; label: string }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-lg text-[0.54rem] font-bold text-white shadow-sm" style={{ background: accent }}>
      {label.slice(0, 2).toUpperCase()}
    </div>
  );
}

function ShopPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") ?? "marketplace";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    let mounted = true;

    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getProducts();
        if (mounted) {
          setProducts(result);
        }
      } catch {
        if (mounted) {
          setError('Unable to load products.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    void loadProducts();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((product) => {
      const categoryMatches = selectedCategory === "All" || product.category === selectedCategory;
      const searchMatches = !q || [product.name, product.brand, product.category].some((value) => value.toLowerCase().includes(q));
      return categoryMatches && searchMatches;
    });
  }, [products, search, selectedCategory]);

  const setTab = (nextTab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", nextTab);
    router.replace(`/shop?${params.toString()}`);
  };

  const renderTabs = () => (
    <div className="relative z-20 -mt-4 mb-4 grid grid-cols-3 gap-2 rounded-full bg-white p-1 shadow-sm ring-1 ring-slate-200">
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setTab(key)}
          className={`rounded-full px-3 py-2 text-[11px] font-medium leading-4 ${tab === key ? 'bg-[#5b2ddc] text-white shadow-sm' : 'text-slate-500'}`}
        >
          {label}
        </button>
      ))}
    </div>
  );

  const renderSearch = (placeholder: string) => (
    <div className="mb-4 overflow-hidden rounded-full border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
      <div className="flex items-center gap-2 text-slate-500">
        <Search className="h-4 w-4" />
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={placeholder} className="w-full bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400" />
      </div>
    </div>
  );

  if (tab === "top-brands") {
    return (
      <AppShell>
        <div className="px-4 pb-8 pt-5">
          <HeroBanner />

          {renderTabs()}

          {renderSearch("Search online stores...")}

          <h3 className="mb-3 text-[1.05rem] font-bold text-slate-900">Top Brands</h3>

          <div className="space-y-3">
            {topBrands.map((brand) => (
              <div key={brand.name} className="flex items-center gap-3 rounded-[1rem] border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                <ShopCardLogo accent={brand.accent} label={brand.name} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-medium text-slate-900">{brand.name}</p>
                  <p className="text-xs text-slate-500">{brand.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AppShell>
    );
  }

  if (tab === "nearby-stores") {
    return (
      <AppShell>
        <div className="px-4 pb-8 pt-5">
          <HeroBanner />

          {renderTabs()}

          {renderSearch("Search stores...")}

          <div className="mb-3 flex items-center justify-between gap-2">
            <h3 className="text-[1.05rem] font-bold text-slate-900">Nearby Stores</h3>
            <button className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[0.7rem] text-slate-600">Gurugram</button>
          </div>

          <div className="space-y-3">
            {nearbyStores.map((store) => (
              <div key={store.name} className="flex items-center gap-3 rounded-[1rem] border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                <ShopCardLogo accent={store.accent} label={store.name} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate text-[0.96rem] font-medium text-slate-900">{store.name}</p>
                    <span className="whitespace-nowrap text-[0.62rem] font-semibold text-slate-500">{store.distance}</span>
                  </div>
                  <p className="mt-1 text-[0.68rem] leading-4 text-slate-500">{store.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="px-4 pb-8 pt-5">
        <HeroBanner />

        {renderTabs()}

        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2.5 text-slate-500">
            <Search className="h-4 w-4" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products..." className="w-full bg-transparent text-[11px] outline-none placeholder:text-slate-400" />
          </div>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {['All', ...categories].map((category) => (
            <button key={category} onClick={() => setSelectedCategory(category)} className={`whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-medium ${selectedCategory === category ? 'bg-[#5b2ddc] text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200'}`}>
              {category}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-3">
          {loading ? (
            <div className="grid gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse rounded-[1.25rem] border border-slate-200 bg-white p-2.5">
                  <div className="h-36 rounded-[1rem] bg-slate-200" />
                  <div className="mt-3 h-4 w-2/3 rounded bg-slate-200" />
                  <div className="mt-2 h-3 w-1/2 rounded bg-slate-100" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white px-5 py-16 text-center text-sm text-slate-500">
              {error}
              <div className="mt-4 flex justify-center">
                <button onClick={() => window.location.reload()} className="rounded-full bg-[#5b2ddc] px-4 py-2 text-sm font-semibold text-white">Try Again</button>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-[1.6rem] border border-dashed border-slate-300 bg-white px-5 py-14 text-center text-sm text-slate-500">
              No products found for your search.
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white shadow-sm">
                <div className="relative h-36 w-full bg-slate-100">
                  <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 420px) 100vw, 420px" />
                </div>
                <div className="p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[0.62rem] font-medium uppercase tracking-[0.16em] text-violet-700">{product.brand}</p>
                      <h3 className="mt-1 text-base font-semibold leading-5 text-slate-900">{product.name}</h3>
                    </div>
                    <span className="whitespace-nowrap rounded-full bg-violet-50 px-2 py-1 text-[0.58rem] font-semibold text-violet-700">No-cost EMI</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-4 text-slate-500">{product.description}</p>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[0.65rem] text-slate-400 line-through">₹{product.price.toLocaleString('en-IN')}</p>
                      <p className="text-lg font-semibold text-slate-900">₹{product.price.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[0.62rem] text-slate-500">EMI from</p>
                      <p className="text-sm font-semibold text-[#5b2ddc]">₹{Math.round(product.price / 12).toLocaleString('en-IN')}/mo</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between rounded-[0.8rem] bg-slate-50 px-3 py-1.5 text-[0.68rem] text-slate-600">
                    <span>12 months</span>
                    <span className="text-slate-400">•</span>
                    <span>Flexible plan</span>
                  </div>
                  <Link href={`/marketplace/${product.id}`} className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-[#5b2ddc] px-4 py-2.5 text-xs font-semibold text-white">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#f5f5f3] text-sm text-slate-500">Loading marketplace...</div>}>
      <ShopPageContent />
    </Suspense>
  );
}
