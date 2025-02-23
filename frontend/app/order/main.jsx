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
    { id: "baisangurovsky", name: "Baisangurovsky" },
    { id: "sheikh_mansurovsky", name: "Sheikh Mansurovsky" },
    { id: "akhmatovsky", name: "Akhmatovsky" },
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
        console.log("Полученные данные:", data); // для отладки

        const formattedOrders = data.results.map(order => ({
          id: order.id,
          number: order.id,
          time: order.created_at.split(" ")[1],
          date: order.created_at.split(" ")[0],
          category: `district_${order.district}`,
          categoryName: order.district_name,
          status: order.status,
          timeLeft: "4:26", // Временная заглушка
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
      <div className="orders-container mt-[2vw] p-[2vw] rounded-lg grid grid-cols-3 gap-[2vw] justify-start">
        {loading ? (
          <p className="text-[1vw] text-[#888] text-center">Loading orders...</p>
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="w-[30.14vw] p-[24px] bg-[rgba(255,255,255,0.08)] rounded-[12px] relative mx-auto my-0 flex flex-col gap-[24px] cursor-pointer"
              onClick={() => router.push(`/order/${order.id}`)}
            >
              <span className="text-[15px] text-[rgba(255,255,255,0.6)] uppercase">
                {order.time}, {order.date}
              </span>
              <div>
                <h2 className="text-[40px] text-white">№{order.number}</h2>
                <p className="text-[19px] text-white">{order.categoryName}</p>
              </div>
              <button className="flex items-center gap-[8px] px-[0.83vw] py-[0.56vw] bg-[rgba(255,255,255,0.12)] rounded-[8px] border-none">
                <span className="text-[16px] text-white">{order.status}</span>
                <span className="text-[16px] text-[rgba(255,255,255,0.6)]">{order.timeLeft}</span>
              </button>
              <div className="w-full h-px bg-[rgba(255,255,255,0.12)]" />
              <div>
                <span className="text-[15px] text-[rgba(255,255,255,0.6)] uppercase">Заказ</span>
                <p className="text-[19px] text-white">{order.items}</p>
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
