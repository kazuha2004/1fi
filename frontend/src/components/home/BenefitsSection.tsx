import { BadgeDollarSign, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

const benefits = [
  { title: "No credit score", description: "Fast checks and simple approvals", icon: ShieldCheck },
  { title: "Flexible repayments", description: "Choose EMI that fits your budget", icon: BadgeDollarSign },
  { title: "0% interest", description: "No hidden charges on eligible purchases", icon: Sparkles },
  { title: "Trusted brands", description: "Shop from curated sellers and top labels", icon: CheckCircle2 },
];

export function BenefitsSection() {
  return (
    <section className="mx-4 mt-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="h-5 w-1 rounded-full bg-[#5b2ddc]" />
        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5b2ddc]">Why pay with 1Fi</h2>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {benefits.map(({ title, description, icon: Icon }) => (
          <div key={title} className="rounded-[16px] border border-zinc-100 bg-white p-3">
            <div className="mb-2 inline-flex rounded-xl bg-violet-50 p-2 text-[#5b2ddc]">
              <Icon className="h-4 w-4" />
            </div>
            <h3 className="text-[13px] font-semibold text-slate-900">{title}</h3>
            <p className="mt-1 text-[11px] leading-4 text-slate-500">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
