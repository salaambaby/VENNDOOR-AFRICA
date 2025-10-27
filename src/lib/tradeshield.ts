import { TRADESHIELD_ENDPOINTS } from "../config/app";

export type RiskAssessment = {
  riskScore: number; // 0..1
  delayProbability: number; // 0..1
  fraudRisk: number; // 0..1
};

export async function assessRisk(transactionData: Record<string, unknown>): Promise<RiskAssessment> {
  const res = await fetch(TRADESHIELD_ENDPOINTS.assessRisk, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transactionData }),
  });
  if (!res.ok) throw new Error("Failed to assess risk");
  return res.json();
}

export async function calculatePremium(amount: number, risk: RiskAssessment): Promise<{ premium: number }>{
  const res = await fetch(TRADESHIELD_ENDPOINTS.calculatePremium, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, risk }),
  });
  if (!res.ok) throw new Error("Failed to calculate premium");
  return res.json();
}

export async function processClaim(policyId: string, payoutAmount: number): Promise<{ status: string }>{
  const res = await fetch(TRADESHIELD_ENDPOINTS.processClaim, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ policyId, payoutAmount }),
  });
  if (!res.ok) throw new Error("Failed to process claim");
  return res.json();
}


