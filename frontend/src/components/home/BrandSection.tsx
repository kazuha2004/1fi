const brands = [
  { name: "Apple", color: "bg-[#f6f6f7]" },
  { name: "Samsung", color: "bg-[#f5f2ff]" },
  { name: "Nike", color: "bg-[#f9f5ea]" },
  { name: "Sony", color: "bg-[#f2f7ff]" },
  { name: "Zomato", color: "bg-[#fff4f4]" },
  { name: "Myntra", color: "bg-[#f3f7ea]" },
];

export function BrandSection() {
  return (
    <section className="mx-4 mt-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="h-5 w-1 rounded-full bg-[#5b2ddc]" />
        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5b2ddc]">Shop using 1Fi at top brands</h2>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {brands.map((brand) => (
          <div key={brand.name} className={`flex h-14 items-center justify-center rounded-[16px] border border-zinc-100 ${brand.color}`}>
            <span className="text-[13px] font-semibold text-slate-800">{brand.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
