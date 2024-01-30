import React, { useContext } from "react";
import Image from "next/image";

import { Input } from "./ui/input";

import cursorIcon from "@/assets/img/icons/cursor-icon.svg";
import searchIcon from "@/assets/img/icons/search-icon.svg";
import whiteCursorIcon from "@/assets/img/icons/white-cursor-icon.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DatasourceContext } from "@/contexts/Datasource";

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

interface MetricCardProps {
  id: string;
  metric_display_name: string;
  metric_description: string;
  contract_name: string;
  contract_type: string | null;
  contract_chain_name: string;
  contract_id: string;
  symbol: string;
  operations: Operation[];
}

export default function MetricCard(metric: MetricCardProps) {
  const { handleSelectedOperation, selectedOperations } =
    useContext(DatasourceContext);
  const handleOperationSelect = (
    event: Event,
    id: string,
    metric_id: string,
    contract_id: string,
    contract_name: string,
    field: string,
    operation: string,
    chain_name: string,
    metric_display_name: string,
    symbol: string,
  ) => {
    event.preventDefault();
    handleSelectedOperation(
      id,
      metric_id,
      contract_id,
      contract_name,
      field,
      operation,
      chain_name,
      metric_display_name,
      symbol,
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="border-2 rounded-md p-3 w-full cursor-pointer hover:opacity-60 bg-white">
          <div className="flex flex-col gap-4 w-full">
            <div
              key={metric.id}
              className="flex flex-col items-start justify-start gap-1"
            >
              <p className="text-primary-blue text-xs font-medium">
                {metric.metric_display_name}
              </p>
              <p className="text-[#718096] text-xs font-medium">
                {metric.metric_description} for {metric.contract_name} (
                {metric.contract_type}) on {metric.contract_chain_name}
              </p>
            </div>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-52 sm:w-72"
        sideOffset={10}
        align="start"
        side="right"
      >
        <DropdownMenuRadioGroup>
          <DropdownMenuLabel>
            <div className="flex flex-col gap-3 justify-start">
              <div>
                <Input
                  type="text"
                  placeholder="Search..."
                  className="text-xs font-medium text-[#718096] bg-[#EDF2F7] border-[##CBD5E0] outline-none"
                />
                <Image
                  priority
                  src={searchIcon}
                  height={8}
                  width={8}
                  alt="Search icon"
                  className="pointer-events-none w-7 h-7 absolute transform -translate-y-1/2 right-6 top-9 cursor-pointer"
                />
              </div>

              <p className="text-[#4A5568] text-xs font-normal ml-0.5 cursor-pointer hover:opacity-65">
                Show all events
              </p>
            </div>
          </DropdownMenuLabel>

          <div className="overflow-y-scroll no-scrollbar h-40">
            {metric.operations.map((operation, index) => (
              <DropdownMenuItem
                key={index}
                onSelect={(event: Event) =>
                  handleOperationSelect(
                    event,
                    operation.id,
                    metric.id,
                    metric.contract_id,
                    metric.contract_name,
                    operation.field,
                    operation.operation,
                    metric.contract_chain_name,
                    metric.metric_display_name,
                    metric.symbol,
                  )
                }
              >
                {selectedOperations.some(
                  (selectedOp) =>
                    selectedOp.id === operation.id &&
                    selectedOp.metric_id === metric.id &&
                    selectedOp.contract_id === metric.contract_id,
                ) ? (
                  <div>
                    <p className="font-medium text-xs text-[#F3F8FF] cursor-pointer flex flex-row items-center gap-2 bg-primary-blue border rounded-sm border-primary-blue p-3">
                      <Image
                        priority
                        src={whiteCursorIcon}
                        height={30}
                        width={30}
                        alt="Cursor icon"
                      />
                      <span className="">{`${operation.operation_description} for ${metric.contract_name} (${metric.contract_type} on ${metric.contract_chain_name})`}</span>
                    </p>
                  </div>
                ) : (
                  <div className="group">
                    <p className="font-medium text-xs cursor-pointer flex flex-row items-center gap-2 group-hover:bg-[#CFE2FD] group-hover:border group-hover:rounded-sm group-hover:border-[#CFE2FD] group-hover:p-3">
                      <Image
                        priority
                        src={cursorIcon}
                        height={20}
                        width={20}
                        alt="Cursor icon"
                      />
                      <span className="group-hover:hidden">
                        {}
                        {operation.operation_name}
                      </span>
                      <span className="hidden group-hover:flex">{`${operation.operation_description} for ${metric.contract_name} (${metric.contract_type} on ${metric.contract_chain_name})`}</span>
                    </p>
                  </div>
                )}
              </DropdownMenuItem>
            ))}
          </div>

          <DropdownMenuSeparator />
          <DropdownMenuLabel className="cursor-pointer">
            {" "}
            <p className="font-normal text-xs mx-14 hover:opacity-75 text-center text-[#4A5568]">
              Create custom
            </p>
          </DropdownMenuLabel>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
