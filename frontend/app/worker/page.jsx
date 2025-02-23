"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Добавлен импорт useRouter
import Header from "../header/Header";



export default function WorkersPage() {
  const router = useRouter(); // Инициализируем useRouter
  const [activeDistrict, setActiveDistrict] = useState("all");
  const [activeRole, setActiveRole] = useState("all");
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  

  useEffect(() => {
    fetchWorkers();
  }, []);

  // Функция загрузки работников с API
  const fetchWorkers = async () => {
    setLoading(true);
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error("Токен авторизации не найден");
      }

      const response = await fetch("http://localhost/api/profiles/", {  // Изменен URL
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${authToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Ответ сервера:", errorData); // Добавляем лог для отладки
        throw new Error(errorData.detail || "Ошибка при загрузке данных");
      }

      const data = await response.json();
      console.log("Полученные данные:", data); // Добавляем лог для отладки

      // Проверяем формат данных и адаптируем маппинг
      const workersData = Array.isArray(data) ? data : (data.results || []);

      // Маппинг данных из API под нужные переменные
      const mappedWorkers = workersData.map((worker, index) => ({
        id: worker.id, // Добавляем id для возможности навигации
        number: index + 1,
        districtName: getDistrictName(worker.district),
        name: worker.fullname,
        role: getRoleName(worker.role),
        phone: worker.phone_number,
        status: worker.status ? "Доступен" : "Недоступен",
      }));

      setWorkers(mappedWorkers);
    } catch (error) {
      console.error("Ошибка при получении работников:", error);
      console.error("Детали ошибки:", error.message); // Добавляем больше деталей об ошибке
      if (error.message === "Токен авторизации не найден") {
        router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  // Функция для получения названия района по ID
  const getDistrictName = (districtId) => {
    const districtMap = {
      1: "Байсангуровский",
      2: "Шейх Мансуровский",
      3: "Ахматовский",
    };
    return districtMap[districtId] || "Не указан";
  };

  // Функция для получения роли по значению API
  const getRoleName = (role) => {
    const roleMap = {
      courier: "Курьер",
      confectioner: "Кондитер",
    };
    return roleMap[role] || "Не указана";
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  const filteredWorkers = workers.filter(
    (worker) =>
      (activeDistrict === "all" || worker.districtName === getDistrictName(activeDistrict)) &&
      (activeRole === "all" || worker.role === getRoleName(activeRole))
  );

  return (
    <div className="min-h-screen bg-[#003C46]">
      <Header />

    {/* header mobile */}
    <svg width="24" height="24" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden max-md:block max-md:w-[10.417vw] max-md:ml-[1.267vw] max-md:mt-[3.2vw]">
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

      <div className="max-md:px-4 px-[3.056vw]">
        <h1 className="max-md:text-2xl text-[3.889vw]  text-white text-center max-md:mt-6 mt-[5vw] max-md:mb-4 mb-[3.056vw] max-md:text-start">
          Workers
        </h1>
  
        {/* Фильтр по районам */}
        <div className="flex flex-wrap flex-row max-md:flex-wrap justify-center max-md:gap-2 gap-4 max-md:mb-6 mb-[9.167vw] max-md:flex-row  max-md:hidden">
          {[
            { id: "all", name: "Все районы" },
            { id: 1, name: "Байсангуровский" },
            { id: 2, name: "Шейх Мансуровский" },
            { id: 3, name: "Ахматовский" },
          ].map((district) => (
            <button
              key={district.id}
              className={`max-md:px-3 px-4 max-md:py-1.5 py-2 max-md:text-sm text-base rounded-full border border-white/20 
                ${activeDistrict === district.id ? "bg-white text-black" : "bg-transparent text-white"}`}
              onClick={() => setActiveDistrict(district.id)}
            >
              {district.name}
            </button>
          ))}
        </div>
  
        {/* Фильтры и кнопка создания */}
        <div className="flex max-md:flex-col flex-row justify-between max-md:gap-4 max-md:mb-4 mb-[1.806vw]">
          <div className="flex max-md:flex-wrap max-md:gap-2 items-center">
            <div
              className="relative flex items-center"
              onMouseEnter={() => setShowRoleDropdown(true)}
              onMouseLeave={() => setShowRoleDropdown(false)}
            >
              <div className="flex items-center max-md:py-1.5 py-[0.556vw] max-md:px-3 px-[1.111vw] border border-white/20 rounded-full">
                <button className="max-md:text-sm text-base text-white">{getRoleName(activeRole)}</button>
                <img className="max-md:w-4 max-md:h-4 w-[1.111vw] h-[1.111vw] ml-2" src="../images/icons/dawn.svg" alt="dropdown" />
              </div>
              {showRoleDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg z-10">
                  {[
                    { id: "all", name: "All" },
                    { id: "courier", name: "Courier" },
                    { id: "confectioner", name: "Confectioner" },
                  ].map((role) => (
                    <div
                      key={role.id}
                      className="px-4 py-2 max-md:text-sm text-base hover:bg-gray-100 cursor-pointer"
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
            <button className="max-md:text-sm text-base text-white border border-white/20 rounded-full max-md:py-1.5 py-[0.556vw] max-md:px-3 px-[1.111vw]">
              Available
            </button>
          </div>
          
          <button
            className="max-md:text-sm text-base max-md:py-1.5 py-[0.417vw] max-md:px-3 px-[0.833vw] text-[#003C46] bg-[#53CFBA] rounded-[0.556vw]"
            onClick={() => handleNavigation("/worker/create")}
          >
            create worker
          </button>
        </div>
  
        {/* Таблица работников */}
        <div className="bg-white/8 rounded-lg max-md:overflow-x-auto bg-[#ffffff08] px-[2vw]">
          {loading ? (
            <p className="text-center text-white p-4">Загрузка...</p>
          ) : (
            <table className="w-full max-md:min-w-[640px]">
              <thead>
                <tr>
                  <th className="font-[300] text-[#ffffff60] text-left p-2 max-md:text-sm text-base">№</th>
                  <th className="font-[300] text-[#ffffff60] text-left p-2 max-md:text-sm text-base">Район</th>
                  <th className="font-[300] text-[#ffffff60] text-left p-2 max-md:text-sm text-base">Имя</th>
                  <th className="font-[300] text-[#ffffff60] text-left p-2 max-md:text-sm text-base">Роль</th>
                  <th className="font-[300] text-[#ffffff60] text-left p-2 max-md:text-sm text-base">Номер</th>
                  <th className="font-[300] text-[#ffffff60] text-left p-2 max-md:text-sm text-base">Статус</th>
                  <th className="font-[300] text-[#ffffff60] text-left p-2 max-md:text-sm text-base"></th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkers.length > 0 ? (
                  filteredWorkers.map((worker) => (
                    <tr key={worker.number} className="text-white">
                      <td className="p-2 max-md:text-sm text-base">{worker.number}</td>
                      <td className="p-2 max-md:text-sm text-base">{worker.districtName}</td>
                      <td className="p-2 max-md:text-sm text-base">{worker.name}</td>
                      <td className="p-2 max-md:text-sm text-base">{worker.role}</td>
                      <td className="p-2 max-md:text-sm text-base">{worker.phone}</td>
                      <td className={`p-2 max-md:text-sm text-base ${worker.status === "Доступен" ? "text-green-400" : "text-red-400"}`}>
                        {worker.status}
                      </td>
                      <td className="p-2">
                        <button 
                          onClick={() => router.push(`/worker/${worker.id}`)}
                          className="p-1"
                        >
                          <img 
                            src="/images/icons/IconButton.svg" 
                            alt="details" 
                            className="max-md:w-5 max-md:h-5 w-[1.111vw] h-[1.111vw] rotate-180 w-[2.5vw] h-[2.5vw]" 
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center p-4 text-gray-500">Нет работников</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="hidden max-md:flex max-md:fixed max-md:bottom-0 max-md:w-[375px] max-md:flex-col max-md:bg-[#003c46] max-md:mx-auto max-md:left-0 max-md:right-0 max-md:mt-[10.667vw]">
  {/* Навигационные кнопки */}
  <div className="flex h-[56px] p-[8px] justify-between items-center px-[7.389vw]">
    <button className="flex p-[4px] items-center"  onClick={() => router.push('/')}>
      <div className="w-[24px] h-[24px]">
      
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
        <path d="M19.625 3.00011H16.2256C15.8042 2.52829 15.2879 2.15079 14.7105 1.89232C14.1331 1.63385 13.5076 1.50024 12.875 1.50024C12.2424 1.50024 11.6169 1.63385 11.0395 1.89232C10.4621 2.15079 9.94579 2.52829 9.52437 3.00011H6.125C5.72718 3.00011 5.34564 3.15814 5.06434 3.43945C4.78304 3.72075 4.625 4.10228 4.625 4.50011V20.2501C4.625 20.6479 4.78304 21.0295 5.06434 21.3108C5.34564 21.5921 5.72718 21.7501 6.125 21.7501H19.625C20.0228 21.7501 20.4044 21.5921 20.6857 21.3108C20.967 21.0295 21.125 20.6479 21.125 20.2501V4.50011C21.125 4.10228 20.967 3.72075 20.6857 3.43945C20.4044 3.15814 20.0228 3.00011 19.625 3.00011ZM12.875 3.00011C13.6706 3.00011 14.4337 3.31618 14.9963 3.87879C15.5589 4.4414 15.875 5.20446 15.875 6.00011H9.875C9.875 5.20446 10.1911 4.4414 10.7537 3.87879C11.3163 3.31618 12.0794 3.00011 12.875 3.00011ZM15.875 15.0001H9.875C9.67609 15.0001 9.48532 14.9211 9.34467 14.7804C9.20402 14.6398 9.125 14.449 9.125 14.2501C9.125 14.0512 9.20402 13.8604 9.34467 13.7198C9.48532 13.5791 9.67609 13.5001 9.875 13.5001H15.875C16.0739 13.5001 16.2647 13.5791 16.4053 13.7198C16.546 13.8604 16.625 14.0512 16.625 14.2501C16.625 14.449 16.546 14.6398 16.4053 14.7804C16.2647 14.9211 16.0739 15.0001 15.875 15.0001ZM15.875 12.0001H9.875C9.67609 12.0001 9.48532 11.9211 9.34467 11.7804C9.20402 11.6398 9.125 11.449 9.125 11.2501C9.125 11.0512 9.20402 10.8604 9.34467 10.7198C9.48532 10.5791 9.67609 10.5001 9.875 10.5001H15.875C16.0739 10.5001 16.2647 10.5791 16.4053 10.7198C16.546 10.8604 16.625 11.0512 16.625 11.2501C16.625 11.449 16.546 11.6398 16.4053 11.7804C16.2647 11.9211 16.0739 12.0001 15.875 12.0001Z" fill="#E6EBCE"/>
      </svg>

      </div>
    </button>
    
    <button className="flex p-[4px] items-center" onClick={() => router.push('/dashboard')}>
      <div className="w-[24px] h-[24px]">
    
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
        <path d="M11.875 5.25024V9.75024C11.875 10.1481 11.717 10.5296 11.4357 10.8109C11.1544 11.0922 10.7728 11.2502 10.375 11.2502H5.875C5.47718 11.2502 5.09564 11.0922 4.81434 10.8109C4.53304 10.5296 4.375 10.1481 4.375 9.75024V5.25024C4.375 4.85242 4.53304 4.47089 4.81434 4.18958C5.09564 3.90828 5.47718 3.75024 5.875 3.75024H10.375C10.7728 3.75024 11.1544 3.90828 11.4357 4.18958C11.717 4.47089 11.875 4.85242 11.875 5.25024ZM19.375 3.75024H14.875C14.4772 3.75024 14.0956 3.90828 13.8143 4.18958C13.533 4.47089 13.375 4.85242 13.375 5.25024V9.75024C13.375 10.1481 13.533 10.5296 13.8143 10.8109C14.0956 11.0922 14.4772 11.2502 14.875 11.2502H19.375C19.7728 11.2502 20.1544 11.0922 20.4357 10.8109C20.717 10.5296 20.875 10.1481 20.875 9.75024V5.25024C20.875 4.85242 20.717 4.47089 20.4357 4.18958C20.1544 3.90828 19.7728 3.75024 19.375 3.75024ZM10.375 12.7502H5.875C5.47718 12.7502 5.09564 12.9083 4.81434 13.1896C4.53304 13.4709 4.375 13.8524 4.375 14.2502V18.7502C4.375 19.1481 4.53304 19.5296 4.81434 19.8109C5.09564 20.0922 5.47718 20.2502 5.875 20.2502H10.375C10.7728 20.2502 11.1544 20.0922 11.4357 19.8109C11.717 19.5296 11.875 19.1481 11.875 18.7502V14.2502C11.875 13.8524 11.717 13.4709 11.4357 13.1896C11.1544 12.9083 10.7728 12.7502 10.375 12.7502ZM19.375 12.7502H14.875C14.4772 12.7502 14.0956 12.9083 13.8143 13.1896C13.533 13.4709 13.375 13.8524 13.375 14.2502V18.7502C13.375 19.1481 13.533 19.5296 13.8143 19.8109C14.0956 20.0922 14.4772 20.2502 14.875 20.2502H19.375C19.7728 20.2502 20.1544 20.0922 20.4357 19.8109C20.717 19.5296 20.875 19.1481 20.875 18.7502V14.2502C20.875 13.8524 20.717 13.4709 20.4357 13.1896C20.1544 12.9083 19.7728 12.7502 19.375 12.7502Z" fill="white" fill-opacity="0.6"/>
      </svg>
      
      </div>
    </button>
    
    <button className="flex p-[4px] items-center"  onClick={() => router.push('/worker/')}>
      <div className="w-[24px] h-[24px]">
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
        <path d="M6.3848 13.8564C6.38734 13.9072 6.37952 13.958 6.36182 14.0057C6.34411 14.0533 6.31689 14.0969 6.28182 14.1338C6.24674 14.1706 6.20453 14.1999 6.15777 14.2199C6.111 14.2399 6.06066 14.2502 6.0098 14.2501H1.87355C1.70427 14.2504 1.53988 14.1934 1.40711 14.0884C1.27435 13.9833 1.18102 13.8365 1.1423 13.6717C1.11818 13.5589 1.1193 13.4422 1.14555 13.3299C1.17181 13.2176 1.22256 13.1124 1.29417 13.022C1.95587 12.1445 2.83382 11.4536 3.8423 11.0167C3.39954 10.613 3.05996 10.1091 2.85199 9.54721C2.64403 8.9853 2.57373 8.38173 2.647 7.78707C2.72026 7.1924 2.93495 6.62395 3.27308 6.12931C3.61122 5.63468 4.06295 5.22827 4.59045 4.94413C5.11795 4.65998 5.70585 4.50636 6.30493 4.49615C6.904 4.48594 7.4968 4.61942 8.03368 4.88542C8.57056 5.15142 9.03589 5.54219 9.39069 6.02501C9.74548 6.50783 9.97943 7.06863 10.0729 7.66046C10.085 7.74004 10.0707 7.82139 10.0323 7.89213C9.99391 7.96287 9.93343 8.01912 9.86011 8.05233C8.81985 8.53325 7.93886 9.30168 7.32108 10.267C6.70331 11.2322 6.37453 12.3541 6.37355 13.5001C6.37355 13.6201 6.37355 13.7383 6.3848 13.8564ZM23.4473 13.0211C22.7871 12.1446 21.9112 11.454 20.9048 11.0167C21.3475 10.613 21.6871 10.1091 21.8951 9.54721C22.1031 8.9853 22.1734 8.38173 22.1001 7.78707C22.0268 7.1924 21.8121 6.62395 21.474 6.12931C21.1359 5.63468 20.6841 5.22827 20.1566 4.94413C19.6291 4.65998 19.0412 4.50636 18.4422 4.49615C17.8431 4.48594 17.2503 4.61942 16.7134 4.88542C16.1765 5.15142 15.7112 5.54219 15.3564 6.02501C15.0016 6.50783 14.7677 7.06863 14.6742 7.66046C14.6621 7.74004 14.6764 7.82139 14.7148 7.89213C14.7532 7.96287 14.8137 8.01912 14.887 8.05233C15.9272 8.53325 16.8082 9.30168 17.426 10.267C18.0438 11.2322 18.3726 12.3541 18.3735 13.5001C18.3735 13.6201 18.3735 13.7383 18.3623 13.8564C18.3598 13.9072 18.3676 13.958 18.3853 14.0057C18.403 14.0533 18.4302 14.0969 18.4653 14.1338C18.5004 14.1706 18.5426 14.1999 18.5893 14.2199C18.6361 14.2399 18.6864 14.2502 18.7373 14.2501H22.8735C23.0428 14.2504 23.2072 14.1934 23.34 14.0884C23.4727 13.9833 23.5661 13.8365 23.6048 13.6717C23.6291 13.5587 23.6279 13.4417 23.6015 13.3292C23.5751 13.2167 23.524 13.1115 23.452 13.0211H23.4473ZM15.1035 17.0692C15.8503 16.4973 16.3991 15.7058 16.6728 14.8059C16.9464 13.9059 16.9312 12.9429 16.6293 12.0521C16.3274 11.1612 15.7539 10.3874 14.9895 9.83936C14.225 9.2913 13.3081 8.99656 12.3675 8.99656C11.4268 8.99656 10.5099 9.2913 9.74545 9.83936C8.98101 10.3874 8.40752 11.1612 8.10559 12.0521C7.80366 12.9429 7.78846 13.9059 8.06213 14.8059C8.33581 15.7058 8.88459 16.4973 9.63136 17.0692C8.30624 17.6434 7.19973 18.6267 6.47386 19.8751C6.40802 19.9892 6.37337 20.1185 6.37338 20.2502C6.37338 20.3819 6.40805 20.5112 6.4739 20.6252C6.53975 20.7392 6.63445 20.8339 6.74849 20.8997C6.86252 20.9655 6.99188 21.0002 7.12355 21.0001H17.6235C17.7552 21.0002 17.8846 20.9655 17.9986 20.8997C18.1126 20.8339 18.2073 20.7392 18.2732 20.6252C18.339 20.5112 18.3737 20.3819 18.3737 20.2502C18.3737 20.1185 18.3391 19.9892 18.2732 19.8751C17.5458 18.6258 16.4372 17.6425 15.1101 17.0692H15.1035Z" fill="white" fill-opacity="0.6"/>
      </svg>
      </div>
    </button>
    
    <button className="flex p-[4px] items-center"  onClick={() => router.push('/')}>
      <div className="w-[24px] h-[24px]">
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
        <path d="M21.9242 20.2042L17.472 15.7501C18.8069 14.0106 19.4302 11.8284 19.2153 9.64619C19.0005 7.46401 17.9636 5.44527 16.315 3.99948C14.6665 2.55369 12.5297 1.7891 10.3381 1.86083C8.14658 1.93255 6.06437 2.83521 4.51388 4.3857C2.96339 5.9362 2.06073 8.01841 1.989 10.21C1.91728 12.4015 2.68186 14.5383 4.12765 16.1868C5.57345 17.8354 7.59219 18.8723 9.77436 19.0871C11.9565 19.302 14.1387 18.6788 15.8783 17.3439L20.3342 21.8007C20.4389 21.9054 20.5631 21.9884 20.6998 22.045C20.8366 22.1017 20.9831 22.1308 21.1311 22.1308C21.2791 22.1308 21.4256 22.1017 21.5624 22.045C21.6991 21.9884 21.8233 21.9054 21.928 21.8007C22.0326 21.6961 22.1156 21.5719 22.1723 21.4351C22.2289 21.2984 22.2581 21.1519 22.2581 21.0039C22.2581 20.8559 22.2289 20.7093 22.1723 20.5726C22.1156 20.4359 22.0326 20.3116 21.928 20.207L21.9242 20.2042ZM4.25329 10.5001C4.25329 9.23926 4.62718 8.00672 5.32767 6.95836C6.02816 5.90999 7.0238 5.09289 8.18868 4.61038C9.35356 4.12788 10.6354 4.00163 11.872 4.24761C13.1086 4.49359 14.2445 5.10075 15.1361 5.99231C16.0277 6.88387 16.6348 8.01979 16.8808 9.25642C17.1268 10.493 17.0005 11.7748 16.518 12.9397C16.0355 14.1046 15.2184 15.1002 14.17 15.8007C13.1217 16.5012 11.8891 16.8751 10.6283 16.8751C8.93807 16.8734 7.31757 16.2012 6.1224 15.006C4.92723 13.8108 4.25503 12.1903 4.25329 10.5001Z" fill="white" fill-opacity="0.6"/>
      </svg>
      </div>
    </button>
  </div>

  {/* Индикатор */}
  <div className="w-[139px] h-[5px] bg-white rounded-[100px] mx-auto mb-[8px]" />
</div>
    </div>
    
  );
}