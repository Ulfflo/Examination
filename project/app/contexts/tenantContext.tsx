"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { fetchApiKey } from "../api/fetcApiKey";
import { fetchTenant } from "../api/fetchTenant";
import { TenantContextType } from "../types";



const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider = ({ children }: { children: React.ReactNode }) => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeTenant = async () => {
      try {
        
        const key = await fetchApiKey();
        if (!key) throw new Error("Failed to retrieve API key.");
        setApiKey(key);

        
        const storedTenantId = localStorage.getItem("tenantId");
        if (storedTenantId) {
          setTenantId(storedTenantId);
        } else {
         
          const tenant = await fetchTenant(key);
          if (!tenant) throw new Error("Failed to retrieve tenant ID.");
          setTenantId(tenant);

          
          localStorage.setItem("tenantId", tenant);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    initializeTenant();
  }, []);

  return (
    <TenantContext.Provider value={{ apiKey, tenantId, loading }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
};
