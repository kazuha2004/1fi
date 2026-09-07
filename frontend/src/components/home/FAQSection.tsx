const faqs = [
  { question: "Is 1Fi available for all products?", answer: "Yes, eligible products across top brands and curated merchants can be purchased with 1Fi EMI." },
  { question: "Do I need to share my credit score?", answer: "No. 1Fi keeps the experience simple and helps you check eligibility quickly." },
  { question: "Can I pay in monthly instalments?", answer: "Yes. Choose a repayment plan that fits your budget and complete the checkout flow." },
];

export function FAQSection() {
  return (
    <section className="mx-4 mt-4 pb-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="h-5 w-1 rounded-full bg-[#5b2ddc]" />
        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5b2ddc]">Frequently asked questions</h2>
      </div>
      <div className="space-y-2.5">
        {faqs.map((faq) => (
          <div key={faq.question} className="rounded-[16px] border border-zinc-100 bg-white p-3.5">
            <p className="text-[13px] font-semibold text-slate-900">{faq.question}</p>
            <p className="mt-1.5 text-[11px] leading-4 text-slate-500">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
