"use client";

import { useEffect, useState } from "react";
import { useToast } from "./ToastProvider";

type Props = { transactionId: string };

export default function ShipmentTracker({ transactionId }: Props) {
  const { notify } = useToast();
  const [status, setStatus] = useState<string>("loading");
  const [eta, setEta] = useState<number | null>(null);
  const [delayed, setDelayed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function poll() {
      try {
        const res = await fetch(`/api/logistics/status?transaction_id=${transactionId}`, { cache: "no-store" });
        const data = await res.json();
        if (cancelled) return;
        setStatus(data.status);
        setEta(data.eta);
        setDelayed(Boolean(data.delayed));
        if (data.delayed) {
          notify("Shipment delay detected", `Transaction ${transactionId} is delayed. Claim may be eligible.`);
        }
      } catch {}
    }
    poll();
    const id = setInterval(poll, 8000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [transactionId, notify]);

  return (
    <div className={`rounded-lg border p-4 ${delayed ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'}`}>
      <div className="text-sm text-gray-700 flex items-center justify-between">
        <div>
          <div className="font-medium">Shipment status: {status}</div>
          {eta && <div className="text-xs text-gray-500">ETA: {new Date(eta).toLocaleString()}</div>}
        </div>
        {delayed && (
          <span className="text-xs font-medium text-red-700 bg-red-100 px-2 py-1 rounded">Delayed</span>
        )}
      </div>
    </div>
  );
}










