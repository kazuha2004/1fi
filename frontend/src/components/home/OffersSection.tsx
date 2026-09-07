import { ArrowUpRight } from "lucide-react";

const offers = [
  { title: "Extra 10% instant discount", subtitle: "On domestic flights", accent: "bg-[#efe9ff] text-[#4b2fa6]" },
  { title: "Limited time cashback", subtitle: "Up to ₹2,500", accent: "bg-[#eefaf7] text-[#0f766e]" },
  { title: "Travel with no-cost EMI", subtitle: "From ₹1,699/mo", accent: "bg-[#fff4db] text-[#a16207]" },
];

export function OffersSection() {
  return (
    <section className="mx-4 mt-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="h-5 w-1 rounded-full bg-[#5b2ddc]" />
        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5b2ddc]">Offers</h2>
        <button className="ml-auto inline-flex items-center gap-1 text-[13px] font-semibold text-violet-700">
          View all <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-2.5">
        {offers.map((offer) => (
          <div key={offer.title} className="flex items-center justify-between rounded-[16px] border border-zinc-100 bg-white p-3 shadow-[0_2px_6px_rgba(20,14,50,0.04)]">
            <div className="flex items-center gap-3">
              <div className={`rounded-xl px-3 py-1.5 text-[11px] font-semibold ${offer.accent}`}>{offer.title.split(" ")[0]}</div>
              <div>
                <p className="text-[13px] font-semibold text-slate-900">{offer.title}</p>
                <p className="text-[11px] text-slate-500">{offer.subtitle}</p>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-slate-400" />
          </div>
        ))}
      </div>
    </section>
  );
}
