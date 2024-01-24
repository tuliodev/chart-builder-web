"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProjectsMenu() {
  const [position, setPosition] = React.useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-56">
        <Button variant="outline" className="outline-none border-">
          {" "}
          <p className="font-medium text-xs mx-14 hover:opacity-75">
            Projects (2)
          </p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuLabel>
            <p className="font-medium text-xs  hover:opacity-75 cursor-pointer text-primary-blue">
              ChainSkope
            </p>
          </DropdownMenuLabel>
          <DropdownMenuLabel>
            <p className="font-medium text-xs  hover:opacity-75 cursor-pointer">
              Project 2
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="bg-[#F7FAFC] cursor-pointer">
            {" "}
            <p className="font-medium text-xs mx-14 hover:opacity-75 text-center">
              Create Project
            </p>
          </DropdownMenuLabel>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
