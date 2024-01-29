import { createContext, ReactNode, useEffect, useState } from "react";

import { CheckedState } from "@radix-ui/react-checkbox";

import giostoneChartData from "../services/api/battle_for_giostone_chart_data.json";
import datasourceData from "../services/api/datasource.json";
import honTokenChartData from "../services/api/hon_token_chart_data.json";
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

interface SelectedOperation {
  id: string;
  metric_id: string;
  contract_id: string;
  field: string;
  operation: string;
  series: Record<string, number>;
  active: true;
}

interface ContextProps {
  currentDatasources: DataSource[];
  selectedDatasources: DataSource[];
  currentMetrics: Metric[];
  selectedOperations: SelectedOperation[];
  currentProjectInfo: Project;
  handleSelectedDatasource: (id: string, checked: CheckedState) => void;
  handleSelectedOperation: (
    id: string,
    metric_id: string,
    contract_id: string,
    field: string,
    operation: string,
  ) => void;
  setProjectInfo: (data: Project) => void;
}

interface Project {
  title: string;
  description: string;
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
  const [selectedOperations, setSelectedOperations] = useState<
    SelectedOperation[]
  >([]);

  const [currentProjectInfo, setCurrentProjectInfo] = useState<Project>({
    title: "Untitled",
    description: "+ Add description..",
  });

  const handleSelectedDatasource = (id: string, checked: CheckedState) => {
    const isSelected = selectedDatasources.some((item) => item.id === id);

    if (checked === false && isSelected) {
      setSelectedDatasources((prevSelected) =>
        prevSelected.filter((item) => item.id !== id),
      );
      const updatedOperations = selectedOperations.filter(
        (operation) => !(operation.contract_id === id),
      );

      setSelectedOperations(updatedOperations);
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

  function checkMetadata(
    metric_id: string,
    contract_id: string,
    field: string,
    operation: string,
  ): string | false {
    const findContractName = (chartData: any) => {
      const metadata = chartData.data.metadata;

      for (const metricName in metadata) {
        const metricMetadata = metadata[metricName];
        if (
          metricMetadata.metric_id === metric_id &&
          metricMetadata.contract_id === contract_id &&
          metricMetadata.field === field &&
          metricMetadata.operation === operation
        ) {
          return chartData.data.series["A: Transfer ERC-20"];
        }
      }

      return false;
    };

    const giostoneContractName = findContractName(giostoneChartData);
    const honTokenContractName = findContractName(honTokenChartData);

    if (giostoneContractName) {
      return giostoneContractName;
    } else if (honTokenContractName) {
      return honTokenContractName;
    } else {
      alert("Doesn't have chart data");
      return false;
    }
  }

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toISOString().split("T")[0];
  };

  const formatChartData = (series: any): Record<string, number> => {
    const formattedSeries: Record<string, number> = {};

    for (const timestamp in series) {
      const formattedDate = formatDate(Number(timestamp));
      formattedSeries[formattedDate] = series[timestamp];
    }

    return formattedSeries;
  };

  const handleSelectedOperation = (
    id: string,
    metric_id: string,
    contract_id: string,
    field: string,
    operation: string,
  ) => {
    const isSelected = selectedOperations.some(
      (operation) =>
        operation.id === id &&
        operation.metric_id === metric_id &&
        operation.contract_id === contract_id,
    );

    const chartData = checkMetadata(metric_id, contract_id, field, operation);

    if (chartData) {
      if (isSelected) {
        const updatedOperations = selectedOperations.filter(
          (operation) =>
            !(
              operation.id === id &&
              operation.metric_id === metric_id &&
              operation.contract_id === contract_id
            ),
        );

        setSelectedOperations(updatedOperations);
      } else {
        const series = formatChartData(chartData);
        const newOperation: SelectedOperation = {
          id,
          metric_id,
          contract_id,
          field,
          operation,
          series,
          active: true,
        };

        setSelectedOperations([...selectedOperations, newOperation]);
      }
    }
  };

  const setProjectInfo = (data: Project) => {
    setCurrentProjectInfo({
      description: data.description,
      title: data.title,
    });
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
        selectedOperations,
        currentProjectInfo,
        handleSelectedDatasource,
        handleSelectedOperation,
        setProjectInfo,
      }}
    >
      {children}
    </DatasourceContext.Provider>
  );
}
