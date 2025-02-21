"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Добавлен импорт useRouter
import Header from "../header/Header";

export default function WorkersPage() {
  const router = useRouter(); // Инициализируем useRouter

  const [activeDistrict, setActiveDistrict] = useState("all");
  const [activeRole, setActiveRole] = useState("all");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);

  const districts = [
    { id: "all", name: "Все районы" },
    { id: "baisangurovsky", name: "Байсангуровский" },
    { id: "sheikh_mansurovsky", name: "Шейх Мансуровский" },
    { id: "akhmatovsky", name: "Ахматовский" },
  ];

  const roles = [
    { id: "all", name: "Все роли" },
    { id: "couriers", name: "Курьеры" },
    { id: "confectioners", name: "Кондитеры" },
  ];

  useEffect(() => {
    const fetchWorkers = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost/api/workers/");
        if (!response.ok) {
          throw new Error("Failed to fetch workers");
        }
        const data = await response.json();
        setWorkers(data);
      } catch (error) {
        console.error("Error loading workers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkers();
  }, []);

  const handleNavigation = (path) => {
    router.push(path); // Исправленный вызов handleNavigation
  };

  const filteredWorkers = workers.filter(worker =>
    (activeDistrict === "all" || worker.district === activeDistrict) &&
    (activeRole === "all" || worker.role === activeRole)
  );

  return (
    <div>
      <Header />
      <div className="">
        <h1 className="text-[3.889vw] font-semibold text-white text-center mt-[5vw] mb-[3.056vw]">
          Работники
        </h1>

        <div className="flex justify-center gap-4 mb-4">
          {districts.map((district) => (
            <button
              key={district.id}
              className={`px-4 py-2 rounded-full mb-[9.167vw] border border-white/20 ${
                activeDistrict === district.id ? "bg-white text-black" : "bg-transparent text-white border-white/20"
              }`}
              onClick={() => setActiveDistrict(district.id)}
            >
              {district.name}
            </button>
          ))}
        </div>

        <div className="flex justify-between mx-[3.056vw] mb-[1.806vw]">
          <div className="relative flex items-center">
            <div
              className="flex items-center pt-[0.556vw] pb-[0.556vw] pl-[1.111vw] border border-white/20 rounded-full cursor-pointer"
              onMouseEnter={() => setShowRoleDropdown(true)}
              onMouseLeave={() => setShowRoleDropdown(false)}
            >
              <button className="mr-[0.556vw]">{roles.find(r => r.id === activeRole)?.name}</button>
              <img className="mr-[1.111vw] ml-[0.556vw]" src="../images/icons/dawn.svg" alt="x" />
              {showRoleDropdown && (
                <div className="absolute top-8 left-0 bg-white text-black shadow-md rounded-lg mt-1">
                  {roles.map(role => (
                    <div
                      key={role.id}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setActiveRole(role.id);
                        setShowRoleDropdown(false);
                      }}
                    >
                      {role.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button className="ml-[0.556vw] border border-white/20 rounded-full py-[0.556vw] px-[1.111vw]">
              Доступные
            </button>
          </div>
          <div>
            <button
              className="py-[0.417vw] px-[0.833vw] text-[#003C46] bg-[#53CFBA] rounded-[0.556vw]"
              onClick={() => handleNavigation("/worker/create")} // Исправленный вызов
            >
              Создать работника
            </button>
          </div>
        </div>

        <div className="bg-white/8 p-4 rounded-lg mx-[3.056vw] bg-[#ffffff08]">
          {loading ? (
            <p className="text-center">Загрузка...</p>
          ) : (
            <table className="w-full text-[#FFF.15]">
              <thead>
                <tr>
                  <th className="font-[300] text-[#ffffff60] text-left p-2">№</th>
                  <th className="font-[300] text-[#ffffff60] text-left p-2">Район</th>
                  <th className="font-[300] text-[#ffffff60] text-left p-2">Имя</th>
                  <th className="font-[300] text-[#ffffff60] text-left p-2">Роль</th>
                  <th className="font-[300] text-[#ffffff60] text-left p-2">Номер</th>
                  <th className="font-[300] text-[#ffffff60] text-left p-2">Статус</th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkers.length > 0 ? (
                  filteredWorkers.map((worker, index) => (
                    <tr key={worker.id} className="border-t border-gray-700">
                      <td className="p-2">{worker.number}</td>
                      <td className="p-2">{worker.districtName}</td>
                      <td className="p-2">{worker.name}</td>
                      <td className="p-2">{worker.role}</td>
                      <td className="p-2">{worker.phone}</td>
                      <td className={`p-2 ${worker.status === "Доступен" ? "text-green-400" : "text-red-400"}`}>
                        {worker.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-4 text-gray-500">Нет работников</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
