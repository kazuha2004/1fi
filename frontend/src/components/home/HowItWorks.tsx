const steps = [
  { number: "1", title: "Choose product", description: "Browse curated deals from top brands" },
  { number: "2", title: "Select EMI", description: "Pick a repayment plan that works best" },
  { number: "3", title: "Checkout", description: "Complete purchase with a simple approval" },
];

export function HowItWorks() {
  return (
    <section className="mx-4 mt-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="h-5 w-1 rounded-full bg-[#5b2ddc]" />
        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5b2ddc]">How 1Fi works</h2>
      </div>
      <div className="space-y-2.5">
        {steps.map((step) => (
          <div key={step.number} className="flex items-center gap-3 rounded-[16px] border border-zinc-100 bg-white p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5b2ddc] text-sm font-bold text-white">
              {step.number}
            </div>
            <div>
              <p className="text-[13px] font-semibold text-slate-900">{step.title}</p>
              <p className="text-[11px] text-slate-500">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
