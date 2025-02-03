"use client";

import React, { useState, useEffect } from "react";

export default function Main() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: "all", name: "Все районы" },
    { id: "baisangurovsky", name: "Байсангуровский" },
    { id: "sheikh_mansurovsky", name: "Шейх Мансуровский" },
    { id: "akhmatovsky", name: "Ахматовский" },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // Искусственные данные
        const artificialOrders = [
          {
            id: 1,
            number: 1,
            time: "18:50",
            date: "21 ЯНВ 24",
            category: "akhmatovsky",
            categoryName: "Ахматовский",
            status: "Новый",
            timeLeft: "4:26",
            items: "×1 Премиум, ×2 Стандарт",
          },
          {
            id: 2,
            number: 2,
            time: "19:15",
            date: "21 ЯНВ 24",
            category: "akhmatovsky",
            categoryName: "Ахматовский",
            status: "Готов",
            timeLeft: "0:00",
            items: "×2 Мини",
          },
          {
            id: 3,
            number: 3,
            time: "19:30",
            date: "21 ЯНВ 24",
            category: "sheikh_mansurovsky",
            categoryName: "Шейх Мансуровский",
            status: "Готов",
            timeLeft: "1:15",
            items: "×1 Премиум, ×1 Мини",
          },
        ];

        await new Promise((resolve) => setTimeout(resolve, 1000)); // Имитация задержки
        setOrders(artificialOrders);
      } catch (error) {
        console.error("Ошибка при загрузке заказов:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getCategoryOrderCount = (categoryId) => {
    if (categoryId === "all") return orders.length;
    return orders.filter((order) => order.category === categoryId).length;
  };

  const filteredOrders = React.useMemo(() => {
    if (activeCategory === "all") return orders;
    return orders.filter((order) => order.category === activeCategory);
  }, [activeCategory, orders]);

  
  return (
    <div>
      {/* Навигация по категориям */}
      <div className="main-container flex justify-center items-center mt-[3.056vw]">
        <div className="flex gap-[1vw]">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`flex items-center justify-center px-[1.5vw] py-[0.8vw] rounded-full border border-solid border-[#1F535C] ${
                activeCategory === category.id
                  ? "bg-[#fff] text-[#003c46] border-[#003c46]"
                  : "bg-transparent text-[#fff] border-[#003c46]"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="text-[1vw] font-medium">
                {category.name} {getCategoryOrderCount(category.id)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Заказы */}
      <div className={`orders-container mt-[2vw] p-[2vw] rounded-lg flex  flex-wrap gap-[2vw] ${filteredOrders.length <= 2 ? "justify-start" : "justify-around"}`}>
        {loading ? (
          <p className="text-[1vw] text-[#888] text-center">Загрузка заказов...</p>
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
            key={order.id}
            className="main-container flex w-[30.139vw] pt-[1.667vw] pr-[2.222vw] pb-[2.222vw] pl-[2.222vw] flex-col gap-[2.222vw] items-start flex-nowrap bg-[rgba(255,255,255,0.08)] rounded-[0.833vw] relative overflow-hidden  my-0"
          >
            <div className="flex flex-col gap-[2.222vw] items-start self-stretch shrink-0 flex-nowrap relative">
              <div className="flex flex-col gap-[1.667vw] items-start self-stretch shrink-0 flex-nowrap relative z-[1]">
                <div className="flex flex-col gap-[1.111vw] items-start self-stretch shrink-0 flex-nowrap relative z-[2]">
                  <span className="h-[1.389vw] self-stretch shrink-0 basis-auto font-['Golos_Text'] text-[1.042vw] font-[460] leading-[1.389vw] text-[rgba(255,255,255,0.6)] tracking-[0.014vw] relative text-left uppercase whitespace-nowrap z-[3]">
                    {order.time}, {order.date}
                  </span>
                  <div className="flex flex-col gap-[0.833vw] items-start self-stretch shrink-0 flex-nowrap relative z-[4]">
                    <span className="h-[3.056vw] self-stretch shrink-0 basis-auto font-['NAMU'] text-[2.778vw] font-light leading-[3.056vw] text-[#fff] relative text-left whitespace-nowrap z-[5]">
                      №{order.number}
                    </span>
                    <span className="h-[1.944vw] self-stretch shrink-0 basis-auto font-['Golos_Text'] text-[1.319vw] font-medium leading-[1.944vw] text-[#fff] relative text-left whitespace-nowrap z-[6]">
                      {order.categoryName}
                    </span>
                  </div>
                </div>
                <button className="flex w-[10.278vw] pt-[0.556vw] pr-[0.833vw] pb-[0.556vw] pl-[0.833vw] gap-[0.556vw] items-center shrink-0 flex-nowrap bg-[rgba(255,255,255,0.12)] rounded-[0.556vw] border-none relative overflow-hidden z-[7] pointer">
                  <div className="flex w-[1.667vw] flex-col justify-center items-center shrink-0 flex-nowrap relative overflow-hidden z-[8]">
                    <div className="w-[1.667vw] h-[1.667vw] shrink-0 bg-[url(/path-to-icon)] bg-cover bg-no-repeat relative overflow-hidden z-[9]" />
                  </div>
                  <div className="flex w-[6.389vw] gap-[0.278vw] items-center shrink-0 flex-nowrap relative z-10">
                    <span className="h-[1.667vw] shrink-0 basis-auto font-['Golos_Text'] text-[1.111vw] font-medium leading-[1.667vw] text-[#fff] relative text-left whitespace-nowrap z-[11]">
                      {order.status}
                    </span>
                    <span className="h-[1.667vw] shrink-0 basis-auto font-['Golos_Text'] text-[1.111vw] font-medium leading-[1.667vw] text-[rgba(255,255,255,0.6)] relative text-left whitespace-nowrap z-[12]">
                      {order.timeLeft}
                    </span>
                  </div>
                </button>
              </div>
              <div className="h-[0.069vw] self-stretch shrink-0 relative z-[13]">
                <div className="w-full h-full bg-[rgba(255,255,255,0.12)] rounded-full absolute top-0 left-0 z-[14]" />
              </div>
              <div className="flex flex-col gap-[1.667vw] items-start self-stretch shrink-0 flex-nowrap relative z-[15]">
                <div className="flex flex-col gap-[0.556vw] items-start self-stretch shrink-0 flex-nowrap relative z-[16]">
                  <span className="h-[1.389vw] self-stretch shrink-0 basis-auto font-['Golos_Text'] text-[1.042vw] font-[460] leading-[1.389vw] text-[rgba(255,255,255,0.6)] tracking-[0.014vw] relative text-left uppercase whitespace-nowrap z-[17]">
                    Заказ
                  </span>
                  <span className="h-[1.944vw] self-stretch shrink-0 basis-auto font-['Golos_Text'] text-[1.319vw] font-medium leading-[1.944vw] text-[#fff] relative text-left whitespace-nowrap z-[18]">
                    {order.items}
                  </span>
                </div>
              </div>
            </div>
          </div>
          ))
        ) : (
          <p className="text-[1vw] text-[#888] text-center">Нет заказов для этой категории.</p>
        )}
      </div>
    </div>
  );
}