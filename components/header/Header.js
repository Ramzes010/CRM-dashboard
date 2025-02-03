"use client"; // Важно для использования useEffect в app router

import React from "react";
import { useRouter } from "next/navigation";
import HeaderLogoPicheni from "./HeaderLogoPicheni";

export default function Header() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <header className="main-container w-full bg-[#e6ebce]">
      <div className="w-[100vw] h-[5.56vw] relative overflow-hidden mx-auto my-0 flex items-center">
        <HeaderLogoPicheni />
        <div className="flex w-[23.47vw] items-start flex-nowrap absolute top-0 bottom-0 left-1/2 translate-x-[-49.85%] translate-y-0">
          <div 
            className="flex w-[6.88vw] pt-[0.56vw] pr-[1.39vw] pb-[0.56vw] pl-[1.39vw] justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[1] cursor-pointer"
            onClick={() => handleNavigation("/")}
          >
            <span className="h-[1.67vw] shrink-0 basis-auto golos-text font-[500] text-[1.11vw] font-medium leading-[1.67vw] text-[#003c46] hover:text-[#858745] relative text-left whitespace-nowrap z-[2]">
              Заказы
            </span>
          </div>
          <div 
            className="flex w-[7.85vw] pt-[0.56vw] pr-[1.39vw] pb-[0.56vw] pl-[1.39vw] justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[3] cursor-pointer"
            onClick={() => handleNavigation("/dashboard")}
          >
            <span className="h-[1.67vw] shrink-0 basis-auto font-golos font-[500] text-[1.11vw] font-medium leading-[1.67vw] text-[#003c46] hover:text-[#858745] relative text-left whitespace-nowrap z-[4]">
              Дашборд
            </span>
          </div>
          <div 
            className="flex w-[7.85vw] pt-[0.56vw] pr-[1.39vw] pb-[0.56vw] pl-[1.39vw] justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[3] cursor-pointer"
            onClick={() => handleNavigation("/workers")}
          >
            <span className="h-[1.67vw] shrink-0 basis-auto font-golos font-[500] text-[1.11vw] font-medium leading-[1.67vw] text-[#003c46] hover:text-[#858745] relative text-left whitespace-nowrap z-[4]">
              Работники
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}