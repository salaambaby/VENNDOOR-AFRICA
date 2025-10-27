"use client";

import { useCallback, useState } from "react";
import { CreditCard } from "lucide-react";
import InsuranceOptIn from "./InsuranceOptIn";

export default function TradeShieldPanel() {
  const [amount, setAmount] = useState(250000);
  const [summary, setSummary] = useState<{ optedIn: boolean; premium: number } | null>(null);
  const handleChange = useCallback((optedIn: boolean, premium: number) => setSummary({ optedIn, premium }), []);

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Transaction amount (₦)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2"
            min={0}
          />
        </div>
        <div className="md:col-span-1">
          <InsuranceOptIn amount={amount} onChange={handleChange} />
        </div>
      </div>
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 mt-4">
        <div className="text-sm text-gray-700">Estimated total</div>
        <div className="text-sm font-medium text-gray-900">
          ₦{(amount + (summary?.optedIn ? summary?.premium ?? 0 : 0)).toLocaleString()}
        </div>
      </div>
      <div className="text-right mt-4">
        <button className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm">
          <CreditCard className="mr-2" size={16} /> Generate virtual card (demo)
        </button>
      </div>
    </div>
  );
}










