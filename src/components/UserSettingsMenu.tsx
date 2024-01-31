"use client";

import * as React from "react";
import Image from "next/image";

import chevronDownIcon from "@/assets/img/icons/chevron-down.svg";
import userIcon from "@/assets/img/icons/user-icon.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserSettingsMenu() {
  const [position, setPosition] = React.useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-36 sm:w-40 bg-none border-none">
        <p className="text-white flex flex-row items-center gap-2">
          <Image
            priority
            src={userIcon}
            height={40}
            width={40}
            alt="User Icon"
          />
          <span className="cursor-pointer hover:opacity-75 flex flex-row items-center gap-2 font-semibold text-sm">
            John Smith{" "}
            <Image
              priority
              src={chevronDownIcon}
              height={20}
              width={20}
              alt="Chevron down icon"
            />
          </span>
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36 sm:w-40" sideOffset={6}>
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuLabel>
            <p className="font-medium text-xs  hover:opacity-75 cursor-pointer">
              Organization settings
            </p>
          </DropdownMenuLabel>
          <DropdownMenuLabel>
            <p className="font-medium text-xs  hover:opacity-75 cursor-pointer">
              Projects settings
            </p>
          </DropdownMenuLabel>
          <DropdownMenuLabel>
            <p className="font-medium text-xs  hover:opacity-75 cursor-pointer">
              Personal settings
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>
            <p className="font-medium text-xs text-primary-neutral hover:opacity-75 cursor-pointer">
              Shortcuts
            </p>
          </DropdownMenuLabel>
          <DropdownMenuLabel>
            <p className="font-medium text-xs  hover:opacity-75 cursor-pointer">
              Data sources
            </p>
          </DropdownMenuLabel>
          <DropdownMenuLabel>
            <p className="font-medium text-xs  hover:opacity-75 cursor-pointer">
              Plan details and billing
            </p>
          </DropdownMenuLabel>
          <DropdownMenuLabel>
            <p className="font-medium text-xs  hover:opacity-75 cursor-pointer">
              Invite users
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>
            <p className="font-medium text-xs  hover:opacity-75 cursor-pointer">
              Log out
            </p>
          </DropdownMenuLabel>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
