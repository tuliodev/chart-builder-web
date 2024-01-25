import { createContext, ReactNode, useEffect, useState } from "react";

import datasourceData from "../services/api/datasource.json";

interface DataSource {
  id: string;
  chain_id: string;
  chain_address: string;
  chain_name: string;
  contract_address: string;
  status: string;
  last_sync: string | null;
  contract_type: string | null;
  name: string;
  symbol: string;
  decimals: number;
  logo: string | null;
  thumbnail: string | null;
}

interface ContextProps {
  currentDatasources: DataSource[];
}

interface ProviderProps {
  children: ReactNode;
}

export const DatasourceContext = createContext({} as ContextProps);

export function DatasourceContextProvider({ children }: ProviderProps) {
  const [currentDatasources, setCurrentDatasources] = useState<DataSource[]>(
    [],
  );

  useEffect(() => setCurrentDatasources(datasourceData.data), []);

  return (
    <DatasourceContext.Provider value={{ currentDatasources }}>
      {children}
    </DatasourceContext.Provider>
  );
}
