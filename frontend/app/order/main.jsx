"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Импорт роутера

export default function Main() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Используем роутер



  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/api/orders/");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error loading orders:", error);
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
      <div className={`orders-container mt-[2vw] p-[2vw] rounded-lg flex flex-wrap gap-[2vw] ${filteredOrders.length <= 2 ? "justify-start" : "justify-around"}`}>
        {loading ? (
          <p className="text-[1vw] text-[#888] text-center">Loading orders...</p>
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="main-container flex w-[30.139vw] pt-[1.667vw] pr-[2.222vw] pb-[2.222vw] pl-[2.222vw] flex-col gap-[2.222vw] items-start flex-nowrap bg-[rgba(255,255,255,0.08)] rounded-[0.833vw] relative overflow-hidden my-0 cursor-pointer"
              onClick={() => router.push(`/order/${order.id}`)} // Добавляем переход на страницу заказа
            >
              <div className="flex flex-col gap-[2.222vw] items-start self-stretch shrink-0 flex-nowrap relative">
                <div className="flex flex-col gap-[1.667vw] items-start self-stretch shrink-0 flex-nowrap relative z-[1]">
                  <div className="flex flex-col gap-[1.111vw] items-start self-stretch shrink-0 flex-nowrap relative z-[2]">
                    <span className="h-[1.389vw] self-stretch shrink-0 basis-auto text-[1.042vw] font-[460] leading-[1.389vw] text-[rgba(255,255,255,0.6)] tracking-[0.014vw] uppercase">
                      {order.time}, {order.date}
                    </span>
                    <div className="flex flex-col gap-[0.833vw] items-start self-stretch shrink-0">
                      <span className="text-[2.778vw] font-light leading-[3.056vw] text-[#fff]">№{order.id}</span>
                      <span className="text-[1.319vw] font-medium leading-[1.944vw] text-[#fff]">{order.categoryName}</span>
                    </div>
                  </div>
                </div>
                <div className="h-[0.069vw] self-stretch">
                  <div className="w-full h-full bg-[rgba(255,255,255,0.12)] rounded-full" />
                </div>
                <div className="flex flex-col gap-[1.667vw] items-start self-stretch">
                  <div className="flex flex-col gap-[0.556vw] items-start self-stretch">
                    <span className="text-[1.042vw] font-[460] leading-[1.389vw] text-[rgba(255,255,255,0.6)] uppercase">Order</span>
                    <span className="text-[1.319vw] font-medium leading-[1.944vw] text-[#fff]">{order.items}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-[1vw] text-[#888] text-center">There are no orders for this category.</p>
        )}
      </div>
    </div>
  );
}
