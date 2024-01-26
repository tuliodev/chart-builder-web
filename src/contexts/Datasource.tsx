import { createContext, ReactNode, useEffect, useState } from "react";

import { CheckedState } from "@radix-ui/react-checkbox";

import datasourceData from "../services/api/datasource.json";
import metricData from "../services/api/metrics.json";

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

interface Operation {
  id: string;
  metric_id: string;
  field: string;
  as: string;
  distinct: boolean;
  operation: string;
  operation_name: string;
  operation_description: string;
  created_at: string;
  updated_at: string;
}

interface Metric {
  id: string;
  metric: string;
  metric_display_name: string;
  metric_description: string;
  metric_type: string;
  api_endpoint: string;
  created_at: string;
  updated_at: string;
  operations: Operation[];
}

interface ContextProps {
  currentDatasources: DataSource[];
  selectedDatasources: DataSource[];
  currentMetrics: Metric[];
  handleSelectedDatasource: (id: string, checked: CheckedState) => void;
}

interface ProviderProps {
  children: ReactNode;
}

export const DatasourceContext = createContext({} as ContextProps);

export function DatasourceContextProvider({ children }: ProviderProps) {
  const [currentDatasources, setCurrentDatasources] = useState<DataSource[]>(
    [],
  );
  const [selectedDatasources, setSelectedDatasources] = useState<DataSource[]>(
    [],
  );

  const [currentMetrics, setCurrentMetrics] = useState<Metric[]>([]);

  const handleSelectedDatasource = (id: string, checked: CheckedState) => {
    const isSelected = selectedDatasources.some((item) => item.id === id);

    if (checked === false && isSelected) {
      setSelectedDatasources((prevSelected) =>
        prevSelected.filter((item) => item.id !== id),
      );
    } else if (checked === true && !isSelected) {
      const selectedContract = currentDatasources.find(
        (item) => item.id === id,
      );
      if (selectedContract) {
        setSelectedDatasources((prevSelected) => [
          ...prevSelected,
          selectedContract,
        ]);
      }
    }
  };

  useEffect(() => {
    setCurrentDatasources(datasourceData.data);
    setCurrentMetrics(metricData.data.data);
  }, []);

  return (
    <DatasourceContext.Provider
      value={{
        currentDatasources,
        selectedDatasources,
        currentMetrics,
        handleSelectedDatasource,
      }}
    >
      {children}
    </DatasourceContext.Provider>
  );
}
