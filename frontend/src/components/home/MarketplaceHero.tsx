export function MarketplaceHero() {
  return (
    <div className="relative mx-4 mt-4 mb-4 overflow-hidden rounded-[24px] bg-gradient-to-br from-[#4f29d9] via-[#6a38e6] to-[#331f80] px-4 py-5 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.15),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.08),_transparent_25%)]" />
      <div className="relative flex items-center justify-between gap-3">
        <div className="max-w-[63%]">
          <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-[0.54rem] font-semibold uppercase tracking-[0.16em] text-white/90">
            <span className="inline-block h-2 w-2 rounded-full bg-white" />
            NO-COST EMI
          </div>
          <h2 className="text-[1.85rem] leading-[1.06] font-bold tracking-[-0.02em]">
            Shop today,
            <br />
            Pay later using
            <br />
            Mutual funds.
          </h2>
          <p className="mt-2 text-[0.62rem] leading-3.5 text-violet-100">
            No credit score required. No interest.
            <br />
            Backed by your investments.
          </p>
        </div>
        <div className="relative h-32 w-32 flex-shrink-0">
          <div className="absolute right-2 top-1 h-12 w-12 rounded-[1.2rem] bg-[#ffb800] shadow-[0_10px_24px_rgba(255,184,0,0.4)]" />
          <div className="absolute right-8 bottom-4 h-16 w-14 rounded-[1.1rem] bg-[#f5f3ff] shadow-lg" />
          <div className="absolute right-1 bottom-0 h-11 w-16 rounded-[1.1rem] bg-[#714df7]" />
          <div className="absolute left-0 top-2 h-14 w-14 rounded-[1rem] bg-[#ff5d7a] shadow-md" />
          <div className="absolute left-4 bottom-1 h-10 w-10 rounded-full bg-[#2d1d72]" />
          <div className="absolute right-6 top-0 h-6 w-6 rounded-full border-[3px] border-white bg-[#ff7a00] opacity-90" />
        </div>
      </div>
    </div>
  );
}
