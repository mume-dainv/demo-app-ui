"use client";

import { useState } from "react";
import clsx from "clsx";
import { AlertProps, AlertVariant } from "@/types/common";
import { DEFAULT_ALERT_DURATION } from "@/const";

const variantStyles: Record<AlertVariant, string> = {
  success: "bg-green-100 text-green-800 border-green-300",
  error: "bg-red-100 text-red-800 border-red-300",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
  info: "bg-blue-100 text-blue-800 border-blue-300",
};

export default function Alert({
  variant = "info",
  title,
  message,
  duration = DEFAULT_ALERT_DURATION,
  closeAlert,
}: { closeAlert: Function } & AlertProps) {
  if (!open) return null;
  return (
    <div
      className={clsx(
        "flex min-w-64 items-center justify-between rounded-md border bg-white px-4 py-3 shadow-lg",
        variantStyles[variant],
      )}
    >
      {title && <p className="mb-1 font-semibold">{title}</p>}
      <p className="text-sm">{message}</p>

      <button onClick={() => closeAlert()} className="ml-1 text-lg">
        ×
      </button>
    </div>
  );
}
