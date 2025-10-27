import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { policyId, payoutAmount } = await request.json();
  // Mock payout processing
  const status = payoutAmount > 0 ? "paid" : "rejected";
  return NextResponse.json({ policyId, status });
}










