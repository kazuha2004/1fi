"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, CreditCard, Landmark, User } from "lucide-react";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/shop?tab=marketplace", label: "Shop", icon: ShoppingBag },
  { href: "/emi-dues", label: "EMI Dues", icon: CreditCard },
  { href: "/limit", label: "Limit", icon: Landmark },
  { href: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-[500px] items-stretch rounded-[28px] border border-white/40 bg-white px-1.5 py-1.5 shadow-[0_8px_32px_rgba(20,14,50,0.12)]">
        <div className="grid w-full grid-cols-5 gap-1">
          {items.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);

            return (
              <Link
                key={label}
                href={href}
                className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-[3px] rounded-[18px] px-1 py-2 text-center text-[10px] tracking-wide font-medium transition-colors ${
                  isActive ? "text-[#5b2ddc]" : "text-slate-400"
                }`}
              >
                <Icon className={`mb-1 h-[22px] w-[22px] ${isActive ? "fill-[#5b2ddc] text-[#5b2ddc]" : "text-slate-400"}`} strokeWidth={1.75} />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
