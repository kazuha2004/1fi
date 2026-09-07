import { Gift } from "lucide-react";

export function ReferralBanner() {
  return (
    <section className="mx-4 mt-4">
      <div className="flex items-center justify-between rounded-[20px] bg-[#f3ebff] p-3 text-slate-900">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white p-2 text-[#5b2ddc]">
            <Gift className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[13px] font-semibold">Invite friends, earn rewards</p>
            <p className="text-[11px] text-slate-600">Get ₹500 when they shop with 1Fi</p>
          </div>
        </div>
        <button className="rounded-full bg-[#5b2ddc] px-3 py-2 text-[11px] font-semibold text-white">Refer now</button>
      </div>
    </section>
  );
}
