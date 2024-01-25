import { useContext } from "react";

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
  const { currentDatasources } = useContext(DatasourceContext);
  return (
    <div className="hidden sm:flex flex-col gap-3 items-center w-96 h-screen border-r border-[#E2E8F0] bg-[#F7FAFC] p-5">
      <Accordion type="single" collapsible className="w-full ">
        <AccordionItem value="datasource">
          <AccordionTrigger>Datasource</AccordionTrigger>
          <AccordionContent>
            <div className="border-2 rounded-md p-3 w-max">
              <div className="flex flex-col gap-4 p-3 w-max border-b overflow-y-scroll no-scrollbar h-36">
                {currentDatasources.map((data) => {
                  return (
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
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
                        {data.chain_name}
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
      </Accordion>

      <Accordion type="single" collapsible className="w-full ">
        <AccordionItem value="metrics">
          <AccordionTrigger>Metrics</AccordionTrigger>
          <AccordionContent>Metrics</AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="w-full ">
        <AccordionItem value="filter">
          <AccordionTrigger>Filter</AccordionTrigger>
          <AccordionContent>Filter</AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="w-full ">
        <AccordionItem value="Breakdown">
          <AccordionTrigger>Datasource</AccordionTrigger>
          <AccordionContent>Datasource</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
