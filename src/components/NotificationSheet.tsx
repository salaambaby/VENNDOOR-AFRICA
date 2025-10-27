"use client";

import { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";

type Notification = { id: string; title: string; message: string; type: 'info'|'success'|'warning'; time: string };

export default function NotificationSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [items, setItems] = useState<Notification[]>([]);

  useEffect(() => {
    // Seed with demo notifications
    setItems([
      { id: '1', title: 'Claim paid', message: 'Policy POL-001 payout sent.', type: 'success', time: 'Just now' },
      { id: '2', title: 'Shipment delayed', message: 'TX demo-tx-123 marked delayed.', type: 'warning', time: '8m ago' },
      { id: '3', title: 'Invoice approved', message: 'INV-2024-002 was approved.', type: 'info', time: '1h ago' },
    ]);
  }, []);

  return (
    <div className={`${open ? 'translate-y-0' : 'translate-y-full'} fixed inset-x-0 bottom-0 z-50 transition-transform duration-300`}> 
      <div className="mx-auto max-w-2xl bg-white border-t border-gray-200 rounded-t-2xl shadow-2xl">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-sm">Close</button>
        </div>
        <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
          {items.map(n => (
            <div key={n.id} className="p-4 flex items-start space-x-3">
              <div className="mt-0.5">
                {n.type === 'success' ? <CheckCircle className="h-4 w-4 text-emerald-600" /> : n.type === 'warning' ? <AlertCircle className="h-4 w-4 text-yellow-600" /> : <Clock className="h-4 w-4 text-gray-400" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">{n.title}</div>
                  <div className="text-xs text-gray-500">{n.time}</div>
                </div>
                <div className="text-sm text-gray-600">{n.message}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* scrim */}
      {open && <div className="fixed inset-0 bg-black/30 -z-10" onClick={onClose} />}
    </div>
  );
}










