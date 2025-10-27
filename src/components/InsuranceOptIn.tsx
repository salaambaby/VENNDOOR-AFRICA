"use client";

import { useEffect, useMemo, useState } from "react";
import { assessRisk, calculatePremium, RiskAssessment } from "../lib/tradeshield";

type Props = {
  amount: number;
  onChange?: (optedIn: boolean, premium: number, risk: RiskAssessment | null) => void;
};

export default function InsuranceOptIn({ amount, onChange }: Props) {
  const [optIn, setOptIn] = useState(false);
  const [risk, setRisk] = useState<RiskAssessment | null>(null);
  const [premium, setPremium] = useState(0);
  const [loading, setLoading] = useState(false);
  const canQuote = useMemo(() => amount > 0, [amount]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!optIn || !canQuote) {
        setPremium(0);
        onChange?.(false, 0, null);
        return;
      }
      setLoading(true);
      try {
        const r = await assessRisk({ amount });
        if (cancelled) return;
        setRisk(r);
        const { premium } = await calculatePremium(amount, r);
        if (cancelled) return;
        setPremium(premium);
        onChange?.(true, premium, r);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [optIn, amount, canQuote, onChange]);

  return (
    <div className="space-y-3">
      <label className="flex items-center space-x-3">
        <input
          type="checkbox"
          className="h-4 w-4"
          checked={optIn}
          onChange={(e) => setOptIn(e.target.checked)}
          disabled={!canQuote}
        />
        <span className="text-sm text-gray-700">Insure this transaction (TradeShield)</span>
      </label>
      {optIn && (
        <div className="text-sm text-gray-600">
          {loading ? (
            <span>Calculating premium...</span>
          ) : (
            <div className="space-y-1">
              <div>
                Estimated premium: <span className="font-medium">₦{premium.toLocaleString()}</span>
              </div>
              {risk && (
                <div className="text-xs text-gray-500">
                  Risk score: {(risk.riskScore * 100).toFixed(0)}% • Delay probability: {(risk.delayProbability * 100).toFixed(0)}% • Fraud risk: {(risk.fraudRisk * 100).toFixed(0)}%
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}










