"use client";
import Alert from "@/components/UI/Alert";
import { DEFAULT_ALERT_DURATION } from "@/const";
import { AlertProps } from "@/types/common";
import { AlertContextType } from "@/types/contexts";

import { createContext, ReactNode, useContext, useState } from "react";

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlert] = useState<AlertState[]>([]);
  const addAlert = (alert: AlertProps) => {
    let alertConvert = alert as AlertState;
    alertConvert.id = crypto.randomUUID();
    setAlert((pre) => [...pre, alertConvert]);
    setTimeout(() => {
      closeAlert(alertConvert.id);
    }, alert.duration || DEFAULT_ALERT_DURATION);
  };

  const closeAlert = (id: string) => {
    setAlert((pre) => pre.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ addAlert }}>
      <div className="h-screen">
        <div className="fixed right-2 top-2 z-50 flex flex-col gap-3">
          {alerts.length > 0 &&
            alerts.map((alert) => {
              return (
                <Alert
                  message={alert.message}
                  duration={alert.duration}
                  title={alert.title}
                  variant={alert.variant}
                  key={alert.id}
                  closeAlert={() => closeAlert(alert.id)}
                />
              );
            })}
        </div>
        {children}
      </div>
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within AlertProvider");
  }
  return context;
};

type AlertState = { id: string } & AlertProps;
