import { NextResponse } from "next/server";

// Mock logistics tracker: returns ETA and status with a delay flag
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("transaction_id") ?? "demo-tx";
  const now = Date.now();
  const eta = now + 1000 * 60 * 60 * 24; // +24h
  const delayed = Math.random() < 0.35; // 35% chance
  const status = delayed ? "delayed" : "in_transit";
  return NextResponse.json({ transaction_id: id, eta, status, delayed });
}










