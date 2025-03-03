"use client";

import React from "react";
import { useRouter } from "next/navigation";
import HeaderLogoPicheni from "./HeaderLogoPicheni";

export default function Header() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <header className="w-[100vw] bg-[#E6EBCE] max-md:hidden">
      <div className="w-[83.33vw] h-[5.56vw] relative mx-auto flex items-center">
        <div className="flex items-center gap-[1.11vw]">
          <HeaderLogoPicheni />
          <div className="w-[2.78vw] h-[2.78vw] flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" className="w-[1.67vw] h-[1.67vw]">
              <path d="M19.9813 18.5206L15.9001 14.4377C17.1238 12.8432 17.6951 10.8428 17.4982 8.84248C17.3012 6.84215 16.3507 4.99164 14.8395 3.66633C13.3284 2.34102 11.3697 1.64015 9.36074 1.7059C7.35182 1.77165 5.44312 2.59909 4.02184 4.02037C2.60055 5.44165 1.77311 7.35035 1.70737 9.35927C1.64162 11.3682 2.34249 13.3269 3.6678 14.8381C4.99311 16.3493 6.84362 17.2997 8.84394 17.4967C10.8443 17.6936 12.8446 17.1224 14.4392 15.8987L18.5238 19.9842C18.6197 20.0801 18.7336 20.1562 18.859 20.2081C18.9843 20.26 19.1186 20.2867 19.2543 20.2867C19.3899 20.2867 19.5243 20.26 19.6496 20.2081C19.775 20.1562 19.8888 20.0801 19.9848 19.9842C20.0807 19.8882 20.1568 19.7743 20.2087 19.649C20.2606 19.5237 20.2873 19.3893 20.2873 19.2537C20.2873 19.118 20.2606 18.9837 20.2087 18.8584C20.1568 18.733 20.0807 18.6191 19.9848 18.5232L19.9813 18.5206ZM3.78296 9.62525C3.78296 8.46946 4.12569 7.33963 4.76781 6.37863C5.40993 5.41763 6.3226 4.66863 7.39041 4.22633C8.45821 3.78403 9.6332 3.6683 10.7668 3.89378C11.9003 4.11927 12.9416 4.67583 13.7589 5.49309C14.5761 6.31036 15.1327 7.35161 15.3582 8.48519C15.5837 9.61877 15.4679 10.7937 15.0256 11.8616C14.5833 12.9294 13.8343 13.842 12.8733 14.4841C11.9123 15.1263 10.7825 15.469 9.62671 15.469C8.07734 15.4674 6.59189 14.8512 5.49632 13.7556C4.40075 12.6601 3.78456 11.1746 3.78296 9.62525Z" fill="#003C46"/>
            </svg>
          </div>
        </div>
        <nav className="absolute left-1/2 transform -translate-x-1/2 flex gap-[2.78vw]">
          <button 
            className="text-[1.11vw] font-medium text-[#003C46] hover:text-[#858745] transition-colors"
            onClick={() => handleNavigation("/")}
          >
            Orders
          </button>
          <button 
            className="text-[1.11vw] font-medium text-[#003C46] hover:text-[#858745] transition-colors"
            onClick={() => handleNavigation("/dashboard")}
          >
            Dashboard
          </button>
          <button 
            className="text-[1.11vw] font-medium text-[#003C46] hover:text-[#858745] transition-colors"
            onClick={() => handleNavigation("/worker")}
          >
            Workers
          </button>
        </nav>
      </div>
    </header>
  );
}