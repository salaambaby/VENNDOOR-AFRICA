"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type Toast = { id: string; title: string; message?: string };
type Ctx = { toasts: Toast[]; notify: (title: string, message?: string) => void; dismiss: (id: string) => void };

const ToastCtx = createContext<Ctx | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = useCallback((title: string, message?: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, title, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  }, []);

  const dismiss = useCallback((id: string) => setToasts((t) => t.filter((x) => x.id !== id)), []);
  const value = useMemo(() => ({ toasts, notify, dismiss }), [toasts, notify, dismiss]);

  return (
    <ToastCtx.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((t) => (
          <div key={t.id} className="bg-gray-900 text-white rounded-lg px-4 py-3 shadow-lg min-w-[240px]">
            <div className="font-medium">{t.title}</div>
            {t.message && <div className="text-sm text-gray-200">{t.message}</div>}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}










