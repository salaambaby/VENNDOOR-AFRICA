"use client";

import { useEffect, useState } from "react";
import { useToast } from "./ToastProvider";

type Props = { policyId: string };

export default function ClaimStatus({ policyId }: Props) {
  const { notify } = useToast();
  const [status, setStatus] = useState<'pending'|'approved'|'paid'>('pending');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('approved');
      notify('Claim approved', `Policy ${policyId} has been approved.`);
      setTimeout(() => {
        setStatus('paid');
        notify('Claim paid', `Payout sent for policy ${policyId}.`);
      }, 3500);
    }, 2500);
    return () => clearTimeout(timer);
  }, [policyId, notify]);

  const badge = status === 'paid' ? 'bg-emerald-100 text-emerald-700' : status === 'approved' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700';

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="text-sm text-gray-700 flex items-center justify-between">
        <div>
          <div className="font-medium">Claim Status</div>
          <div className="text-xs text-gray-500">Policy: {policyId}</div>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded ${badge}`}>{status.toUpperCase()}</span>
      </div>
    </div>
  );
}










