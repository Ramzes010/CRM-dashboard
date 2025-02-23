"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Main() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const categories = [
    { id: "all", name: "All districts" },
    { id: "district_baisangurovsky", name: "Baisangurovsky" },
    { id: "district_sheikh_mansurovsky", name: "Sheikh Mansurovsky" },
    { id: "district_akhmatovsky", name: "Akhmatovsky" },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          throw new Error("Токен авторизации не найден");
        }

        const response = await fetch("http://localhost/api/orders/", {
          method: "GET",
          headers: {
            "Authorization": `Token ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Ответ сервера:", errorData);
          throw new Error(errorData.detail || `Ошибка при загрузке данных: ${response.status}`);
        }

        const data = await response.json();
        console.log("Полученные данные:", data);

        const formattedOrders = data.results.map(order => ({
          id: order.id,
          number: order.id,
          time: order.created_at.split(" ")[1],
          date: order.created_at.split(" ")[0],
          category: `district_${order.district}`,
          categoryName: order.district_name,
          status: order.status,
          timeLeft: "4:26",
          items: order.content.cart.boxes.map(box => `×${box.quantity} Box ${box.box_id}`).join(", ")
        }));

        setOrders(formattedOrders);
      } catch (error) {
        console.error("Ошибка при загрузке заказов:", error);
        if (error.message === "Токен авторизации не найден") {
          router.push('/login');
        }
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
    <div className="min-h-screen bg-[#003C46]">
      {/* Навигация по категориям */}
      <div className="main-container flex justify-center items-center pt-[3.056vw] max-md:pt-[20px] px-[2vw] max-md:px-4">
        <div className="flex flex-wrap gap-[1vw] max-md:gap-2 justify-center w-full">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`flex items-center justify-center px-[1.5vw] py-[0.8vw] rounded-full border border-solid
                max-md:px-4 max-md:py-2 max-md:text-sm max-md:flex-1 min-w-[150px] max-md:min-w-[calc(50%-0.5rem)] 
                transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-white text-[#003c46] border-white"
                  : "bg-transparent text-white border-[rgba(255,255,255,0.12)] hover:border-white"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="text-[1vw] font-medium max-md:text-sm whitespace-nowrap">
                {category.name} ({getCategoryOrderCount(category.id)})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Заказы */}
      <div className="mt-[2vw] p-[2vw] max-md:mt-6 max-md:p-4">
        <div className="grid grid-cols-3 gap-[2vw] max-md:grid-cols-1 max-md:gap-4">
          {loading ? (
            <p className="text-[1vw] text-[rgba(255,255,255,0.6)] text-center col-span-3 max-md:col-span-1 max-md:text-base">
              Loading orders...
            </p>
          ) : filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="w-[30.14vw] max-md:w-full p-[1.667vw] max-md:p-4 bg-[rgba(255,255,255,0.08)] 
                  rounded-[0.833vw] max-md:rounded-xl relative mx-auto my-0 flex flex-col gap-[1.667vw] max-md:gap-4 
                  cursor-pointer hover:bg-[rgba(255,255,255,0.12)] transition-all duration-300"
                onClick={() => router.push(`/order/${order.id}`)}
              >
                <span className="text-[1.042vw] max-md:text-sm text-[rgba(255,255,255,0.6)] uppercase">
                  {order.time}, {order.date}
                </span>
                <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h2 className="text-[2.778vw] max-md:text-[32px] text-white">№{order.number}</h2>
                  <p className="text-[1.319vw] max-md:text-lg text-white">{order.categoryName}</p>
                </div>
                <img src="/images/icons/IconButton.svg" alt="/images/icons/" className="transform rotate-180"/>
                </div>
                
                <button className="flex items-center gap-[0.556vw] max-w-[10.417vw] max-md:max-w-[33.5vw] max-md:gap-2 px-[0.83vw] max-md:px-3 
                  py-[0.56vw] max-md:py-2 bg-[rgba(255,255,255,0.12)] rounded-[0.556vw] max-md:rounded-lg border-none">
                  <span className="text-[1.111vw] max-md:text-sm text-white">{order.status}</span>
                  <span className="text-[1.111vw] max-md:text-sm text-[rgba(255,255,255,0.6)]">{order.timeLeft}</span>
                </button>
                <div className="w-full h-[0.069vw] max-md:h-[1px] bg-[rgba(255,255,255,0.12)]" />
                <div>
                  <span className="text-[1.042vw] max-md:text-sm text-[rgba(255,255,255,0.6)] uppercase block mb-[0.347vw] max-md:mb-1">
                    Заказ
                  </span>
                  <p className="text-[1.319vw] max-md:text-base text-white">{order.items}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[1vw] text-[rgba(255,255,255,0.6)] text-center col-span-3 max-md:col-span-1 max-md:text-base">
              There are no orders for this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}