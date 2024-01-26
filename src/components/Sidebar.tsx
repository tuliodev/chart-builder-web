import { useContext } from "react";

import { ChevronDown, PlusIcon } from "lucide-react";
import { CheckedState } from "@radix-ui/react-checkbox";

import MetricCard from "./MetricCard";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { DatasourceContext } from "@/contexts/Datasource";

export default function SiderBar() {
  const {
    currentDatasources,
    handleSelectedDatasource,
    selectedDatasources,
    currentMetrics,
  } = useContext(DatasourceContext);

  const handleDatasourceCheckbox = (checked: CheckedState, id: string) => {
    handleSelectedDatasource(id, checked);
  };

  return (
    <div className="hidden sm:flex flex-col items-center w-96 relative h-screen border-r border-[#E2E8F0] bg-[#F7FAFC] p-5">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="datasource">
          <AccordionTrigger icon={ChevronDown}>Datasource</AccordionTrigger>
          <AccordionContent>
            <div className="border-2 rounded-md p-3 w-full">
              <div className="flex flex-col gap-4 w-full border-b overflow-y-scroll no-scrollbar h-44">
                {currentDatasources.map((data) => {
                  return (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={data.id}
                        onCheckedChange={(event) => {
                          handleDatasourceCheckbox(event, data.id);
                        }}
                        checked={selectedDatasources.some(
                          (selectedDt) => selectedDt.id === data.id,
                        )}
                      />
                      <Avatar>
                        <AvatarImage
                          src={
                            data.logo ||
                            "https://cdn.moralis.io/eth/0x6b175474e89094c44da98b954eedeac495271d0f.png"
                          }
                          alt="@shadcn"
                        />
                      </Avatar>
                      <label
                        htmlFor="terms"
                        className="text-xs font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {data.name}
                      </label>
                    </div>
                  );
                })}
              </div>
              <p className="text-s font-normal text-[#4A5568] hover:opacity-75 cursor-pointer text-center mt-3">
                Add new datasource
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="metrics">
          <AccordionTrigger icon={PlusIcon}>Metrics</AccordionTrigger>
          <AccordionContent>
            {selectedDatasources.length > 0 && (
              <div className="overflow-y-scroll no-scrollbar h-72">
                {selectedDatasources.map((data) => (
                  <div id={data.id} className="flex flex-col gap-2">
                    {currentMetrics.map((metric) => (
                      <MetricCard
                        id={metric.id}
                        contract_chain_name={data.chain_name}
                        metric_description={metric.metric_description}
                        metric_display_name={metric.metric_display_name}
                        contract_name={data.name}
                        contract_type={data.contract_type}
                        contract_id={data.id}
                        operations={metric.operations}
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}
            {selectedDatasources.length === 0 && (
              <h1>Please select a datasource</h1>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="filter">
          <AccordionTrigger icon={PlusIcon}>Filter</AccordionTrigger>
          <AccordionContent>Filter</AccordionContent>
        </AccordionItem>

        <AccordionItem value="Breakdown">
          <AccordionTrigger icon={PlusIcon}>Datasource</AccordionTrigger>
          <AccordionContent>Datasource</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
