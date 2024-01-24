import { useState } from "react";
import Image from "next/image";

import chevronDownIcon from "@/assets/img/icons/chevron-down.svg";
import helpCircleIcon from "@/assets/img/icons/help-circle-contained.svg";
import settingsIcon from "@/assets/img/icons/settings.svg";
import userIcon from "@/assets/img/icons/user-icon.svg";
import logoImg from "@/assets/img/logo.svg";

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-primary-blue p-5 flex flex-row justify-between">
      <div className="flex flex-row gap-8 items-center">
        <Image priority src={logoImg} height={80} width={80} alt="Logo" />
        <p className="hidden sm:flex text-white cursor-pointer hover:opacity-75">
          Boards
        </p>
        <p className="text-white hidden sm:flex flex-row items-center gap-1 cursor-pointer hover:opacity-75">
          Reports{" "}
          <Image
            priority
            src={chevronDownIcon}
            height={20}
            width={20}
            alt="Chevron down icon"
          />
        </p>
      </div>

      <div className="hidden sm:flex flex-row gap-6 items-center">
        <Image
          priority
          src={helpCircleIcon}
          height={26}
          width={26}
          alt="Help Circle"
          className="cursor-pointer hover:opacity-75"
        />
        <Image
          priority
          src={settingsIcon}
          height={26}
          width={26}
          alt="Settings"
          className="cursor-pointer hover:opacity-75"
        />
        <p className="text-white flex flex-row items-center gap-2">
          <Image
            priority
            src={userIcon}
            height={40}
            width={40}
            alt="User Icon"
          />
          <span className="cursor-pointer hover:opacity-75 flex flex-row items-center gap-2">
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
      </div>

      <div className="sm:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white"></button>
        <button
          type="button"
          className="inline-flex items-center md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            ""
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fff"
                d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
              />
            </svg>
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden flex flex-col gap-3 items-end ">
          <button onClick={toggleMenu} className="text-white mb-2 text-2xl">
            X
          </button>
          <p className="text-white cursor-pointer hover:opacity-75">Boards</p>
          <p className="text-white cursor-pointer hover:opacity-75 flex items-center gap-1">
            Reports{" "}
          </p>
          <div className="flex flex-row gap-1">
            <Image
              priority
              src={helpCircleIcon}
              height={26}
              width={26}
              alt="Help Circle"
              className="cursor-pointer hover:opacity-75"
            />
            <Image
              priority
              src={settingsIcon}
              height={26}
              width={26}
              alt="Settings"
              className="cursor-pointer hover:opacity-75"
            />
          </div>
          <p className="text-white flex flex-row items-center gap-2">
            <Image
              priority
              src={userIcon}
              height={40}
              width={40}
              alt="User Icon"
            />
          </p>
        </div>
      )}
    </header>
  );
}
