"use client";

import * as React from "react";
import Image from "next/image";

import settingsIcon from "@/assets/img/icons/settings.svg";
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
      <DropdownMenuTrigger asChild>
        <Image
          priority
          src={settingsIcon}
          height={26}
          width={26}
          alt="Settings"
          className="cursor-pointer hover:opacity-75"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52 sm:w-56" sideOffset={20}>
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuLabel>
            <p className="font-medium text-xs mx-14 hover:opacity-75 cursor-pointer">
              Projects (2)
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
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
