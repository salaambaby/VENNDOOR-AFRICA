import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { transactionData } = await request.json();
  const amount = Number((transactionData?.amount as number) ?? 0);
  // Lightweight mocked model: scale risk by amount, keep within 0..1
  const base = Math.min(1, Math.max(0, amount / 1_000_000));
  const delayProbability = Math.min(1, base * 0.6 + 0.1);
  const fraudRisk = Math.min(1, base * 0.3 + 0.05);
  const riskScore = Math.min(1, (delayProbability * 0.7 + fraudRisk * 0.3));
  return NextResponse.json({ riskScore, delayProbability, fraudRisk });
}










