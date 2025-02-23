"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../header/Header";

const StatCard = ({ title, value, change, isPositive }) => (
  <div className="flex-1 p-[1.667vw] bg-white/8 rounded-[0.833vw] max-md:p-[4vw]">
    <span className="block text-white/60 text-[0.972vw] uppercase tracking-wider mb-[2.222vw] max-md:text-[3.2vw] max-md:mb-[4vw]">
      {title}
    </span>
    <div>
      <div className="text-[2.778vw] text-white font-light mb-[0.833vw] max-md:text-[6.4vw] max-md:mb-[2vw]">{value}</div>
      <div className="flex items-center gap-[0.278vw] max-md:gap-[1vw]">
        <img 
          src={`/images/icons/IconButton.svg`} 
          alt="trend" 
          className="w-[0.972vw] h-[0.972vw] max-md:w-[3.2vw] max-md:h-[3.2vw]" 
        />
        <span className="text-[0.972vw] text-white max-md:text-[3.2vw]">{change}</span>
      </div>
    </div>
  </div>
);

const OrderRow = ({ order }) => (
  <div className="flex items-center p-[0.833vw] gap-[1.111vw] max-md:flex-col max-md:p-[4vw] max-md:gap-[2vw]">
    <span className="w-[8.333vw] max-md:w-full max-md:text-[3.2vw]">{order.number}</span>
    <span className="w-[12.5vw] max-md:w-full max-md:text-[3.2vw]">{order.date}</span>
    <span className="w-[12.5vw] max-md:w-full max-md:text-[3.2vw]">{order.craftTime}</span>
    <span className="flex-1 max-md:w-full max-md:text-[3.2vw]">{order.district}</span>
    <div className="flex-1 max-md:w-full max-md:text-[3.2vw]">
      <span className="text-white/60">₽</span>
      <span className="text-white">{order.earned}</span>
    </div>
    <button className="p-[0.833vw] border border-white/12 rounded-[0.556vw] max-md:w-full max-md:p-[2vw]">
      <img src="/images/icons/details.svg" alt="details" className="w-[1.389vw] h-[1.389vw] max-md:w-[4vw] max-md:h-[4vw]" />
    </button>
  </div>
);

export default function WorkerPage() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          throw new Error("Authorization token not found");
        }

        const response = await fetch("http://localhost/api/dashboard/user_dashboard/?user_id=2", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${authToken}`
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-[#003C46] flex items-center justify-center text-white text-[1.667vw] max-md:text-[4.8vw]">Loading...</div>;
  }

  if (!userData) {
    return <div className="min-h-screen bg-[#003C46] flex items-center justify-center text-white text-[1.667vw] max-md:text-[4.8vw]">Error loading data</div>;
  }

  const stats = [
    {
      title: "number of orders",
      value: userData.user_order_count,
      change: "today",
      isPositive: true
    },
    {
      title: "Average crafting time",
      value: userData.user_performance.average_crafting_time,
      change: "Average time",
      isPositive: true
    },
    {
      title: "Earned",
      value: `₽ ${userData.user_income}`,
      change: "For all the time",
      isPositive: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#003C46]">
      <Header />

      {/* header mobile */}
      <svg width="24" height="24" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden max-md:block max-md:w-[10.417vw] max-md:ml-[4vw] max-md:mt-[4vw]">
        <g clipPath="url(#clip0_1312_7314)">
          <path d="M18.5 36C28.4411 36 36.5 27.9411 36.5 18C36.5 8.05887 28.4411 0 18.5 0C8.55888 0 0.5 8.05887 0.5 18C0.5 27.9411 8.55888 36 18.5 36Z" fill="#53CFBA"/>
          <path d="M23.4516 11.0828C22.1844 9.79766 20.4364 9 18.5027 9C14.6354 9 11.5 12.1796 11.5 16.1014C11.5 18.0624 12.2811 19.835 13.5538 21.1201L15.1543 19.4971C14.2967 18.6274 13.7669 17.4254 13.7669 16.1014C13.7669 13.4481 15.8863 11.2988 18.5027 11.2988C19.8137 11.2988 20.999 11.8362 21.8512 12.7058C22.7087 13.5755 23.2386 14.7775 23.2386 16.1014C23.2386 18.3615 21.6982 20.256 19.6225 20.7656V14.9603L17.3775 17.237V28H19.6225V23.1032C22.9545 22.5604 25.5 19.6245 25.5 16.0959C25.5 14.135 24.7189 12.3624 23.4516 11.0773V11.0828Z" fill="#003C46"/>
        </g>
        <defs>
          <clipPath id="clip0_1312_7314">
            <rect width="36" height="36" fill="white" transform="translate(0.5)"/>
          </clipPath>
        </defs>
      </svg>
      {/* header mobile */}
      
      <div className="max-w-[69.444vw] mx-auto px-[2.778vw] py-[1.667vw] relative max-md:max-w-full max-md:px-[4vw] max-md:py-[6vw]">
        {/* Кнопки слева */}
        <div className="absolute left-0 flex flex-col gap-[1.111vw] max-md:static max-md:flex-row max-md:mb-[6vw] max-md:gap-[3vw]">
          <button 
            onClick={() => router.back()}
            className="flex w-[3.056vw] h-[3.056vw] items-center justify-center rounded-[0.556vw] max-md:w-[10vw] max-md:h-[10vw]"
          >
            <img 
              src="/images/icons/IconButton.svg" 
              alt="back" 
              className="w-[3.389vw] h-[3.389vw] max-md:w-[10vw] max-md:h-[10vw]"
            />         
          </button>
          <button 
            onClick={() => router.push(`/worker/recreate/`)}
            className="flex w-[3.056vw] h-[3.056vw] items-center justify-center rounded-[0.556vw] border border-white/4 max-md:w-[10vw] max-md:h-[10vw]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="max-md:w-[5vw] max-md:h-[5vw]">
              <path d="M17.7594 5.73222L14.268 2.2416C14.1519 2.1255 14.0141 2.0334 13.8624 1.97056C13.7107 1.90772 13.5482 1.87538 13.384 1.87538C13.2198 1.87538 13.0572 1.90772 12.9056 1.97056C12.7539 2.0334 12.6161 2.1255 12.5 2.2416L2.86641 11.8752C2.74983 11.9908 2.65741 12.1285 2.59451 12.2802C2.5316 12.4319 2.49948 12.5946 2.50001 12.7588V16.2502C2.50001 16.5817 2.6317 16.8997 2.86612 17.1341C3.10054 17.3685 3.41849 17.5002 3.75001 17.5002H16.875C17.0408 17.5002 17.1997 17.4343 17.3169 17.3171C17.4342 17.1999 17.5 17.041 17.5 16.8752C17.5 16.7094 17.4342 16.5505 17.3169 16.4333C17.1997 16.316 17.0408 16.2502 16.875 16.2502H9.00938L17.7594 7.50019C17.8755 7.38412 17.9676 7.2463 18.0304 7.09463C18.0933 6.94295 18.1256 6.78038 18.1256 6.61621C18.1256 6.45203 18.0933 6.28946 18.0304 6.13779C17.9676 5.98611 17.8755 5.8483 17.7594 5.73222Z" fill="white"/>
            </svg>
          </button>
        </div>

        {/* Заголовок */}
        <div className="text-center mb-[3.333vw] max-md:mb-[8vw]">
          <div className="text-white/60 text-[1.042vw] uppercase tracking-wider mb-[1.111vw] max-md:text-[3.2vw] max-md:mb-[3vw]">
            {userData.user_performance.role} • {userData.user_performance.district}
          </div>
          <h1 className="text-[3.889vw] text-white font-light max-md:text-[8vw]">
            {userData.user_performance.fullname}
          </h1>
        </div>

        {/* Фильтры периода */}
        <div className="flex gap-[0.833vw] justify-center mb-[4.444vw] max-md:flex-wrap max-md:gap-[2vw] max-md:mb-[8vw]">
          {["Today", "7 days", "30 days", "Select a period"].map((period, i) => (
            <button
              key={i}
              className={`px-[1.667vw] py-[0.972vw] rounded-full max-md:px-[4vw] max-md:py-[2vw] max-md:text-[3.2vw] ${
                i === 0 ? "bg-white text-[#003C46]" : "border border-white/12 text-white"
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Статистика */}
        <div className="mb-[4.444vw] max-md:mb-[8vw]">
          <h2 className="text-[1.667vw] text-white mb-[1.667vw] max-md:text-[4.8vw] max-md:mb-[4vw]">Statistics</h2>
          <div className="grid grid-cols-3 gap-[1.667vw] max-md:grid-cols-1 max-md:gap-[4vw]">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </div>
        </div>

        {/* Таблица заказов */}
        <div>
          <h2 className="text-[1.667vw] text-white mb-[1.667vw] max-md:text-[4.8vw] max-md:mb-[4vw]">Completed orders</h2>
          <div className="bg-white/8 rounded-[0.833vw] overflow-hidden">
            <div className="grid grid-cols-6 p-[1.111vw] text-white/60 text-[0.972vw] uppercase tracking-wider max-md:hidden">
              <span>№</span>
              <span>Date</span>
              <span>Crafting Time</span>
              <span>district</span>
              <span>Earned</span>
              <span></span>
            </div>
            {/* Здесь будет маппинг заказов, когда появятся данные с бэкенда */}
          </div>
        </div>
      </div>
    </div>
  );
}