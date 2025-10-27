import { NextResponse } from "next/server";

// Premium = clamp(0.2%..0.5%) * amount * riskScore factor
export async function POST(request: Request) {
  const { amount, risk } = await request.json();
  const riskScore = Number(risk?.riskScore ?? 0.3);
  const baseRate = 0.002 + (0.003 * Math.min(1, Math.max(0, riskScore))); // 0.2%..0.5%
  const premium = Math.round((amount ?? 0) * baseRate * 100) / 100;
  return NextResponse.json({ premium });
}










