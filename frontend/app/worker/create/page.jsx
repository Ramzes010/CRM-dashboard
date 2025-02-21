"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../header/Header";

export default function CreateWorkerPage() {
  const router = useRouter();
  
  const [role, setRole] = useState("confectioner");
  const [district, setDistrict] = useState("sheikh_mansurovsky");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("+337 77 77 77 77");
  const [password, setPassword] = useState("");
  const [telegramToken, setTelegramToken] = useState("");

  useEffect(() => {
    setTelegramToken(generateToken());
  }, []);

  const generateToken = () => {
    return Math.random().toString(36).substr(2, 10);
  };

  const handleSubmit = async () => {
    const workerData = { role, district, name, address, phone, password, telegramToken };
<<<<<<< HEAD
    try {
      const response = await fetch("http://localhost/api/profiles/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token 6578881f25b133aa817d7d8bb6c2a07b90e4bcff`
        },
        body: JSON.stringify(workerData),
      });
      if (!response.ok) {
        throw new Error("Ошибка при отправке данных");
      }
      const data = await response.json();
      console.log("Успешно создано:", data);
    } catch (error) {
      console.error("Ошибка:", error);
    }
=======
    console.log("Saving worker:", workerData);
>>>>>>> 4209af87ea2b0c413d53f4d274e4f86a5c625e14
  };

  return (
    <div>
<<<<<<< HEAD
      <Header />
      <div className="flex">
        <div className="flex items-start min-h-screen bg-[#003C46] text-white px-[3.056vw] mt-[5vw]">
          <div className="flex items-center mr-[18.056vw]">
            <button className="mr-[6.667vw]" onClick={() => router.back()}>
              <img src="../../images/icons/iconButton.svg" alt="Назад" className="w-[3.056vw] h-[3.056vw]" />
            </button>
            <h1 className="text-[3.889vw] leading-[4.167vw]">Создание <br/> работника</h1>
          </div>
          <div className="bg-[#ffffff08] p-6 rounded-lg max-w-md">
            <div className="mb-4">
              <label className="text-sm block mb-1">ИМЯ РАБОТНИКА</label>
              <input type="text" placeholder="Введите имя" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 rounded bg-transparent border border-white/20 text-white placeholder-gray-400" />
            </div>
            <div className="mb-4">
              <label className="text-sm block mb-1">АДРЕС</label>
              <input type="text" placeholder="Введите адрес" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-3 rounded bg-transparent border border-white/20 text-white placeholder-gray-400" />
            </div>
            <div className="mb-4">
              <label className="text-sm block mb-1">НОМЕР</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3 rounded bg-transparent border border-white/20 text-white placeholder-gray-400" />
            </div>
            <div className="mb-4">
              <label className="text-sm block mb-1">ПАРОЛЬ</label>
              <input type="password" placeholder="Создайте пароль" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 rounded bg-transparent border border-white/20 text-white placeholder-gray-400" />
            </div>
            <div className="mb-4">
              <label className="text-sm block mb-1">TELEGRAM ТОКЕН</label>
              <input type="text" value={telegramToken} readOnly className="w-full p-3 rounded bg-transparent border border-white/20 text-white" />
            </div>
            <button className="mt-6 bg-[#53CFBA] text-[#003C46] px-6 py-3 rounded-lg text-lg" onClick={handleSubmit}>
              Создать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
=======

 
      <Header />
      <div className="flex">
      <div className=" flex items-start min-h-screen bg-[#003C46] text-white px-[3.056vw] mt-[5vw]">
       <div className="flex items-center mr-[18.056vw]">
        {/* Кнопка Назад */}
        <button className="mr-[6.667vw]" onClick={() => router.back()}>
                <img src="../../images/icons/iconButton.svg" alt="Назад" className="w-[3.056vw] h-6[3.056vw]" />
            </button>

            {/* Заголовок */}
            <h1 className="text-[3.889vw] leading-[4.167vw]  ">Создание <br/> работника</h1>
        </div>
     {/*  */}
        <div>
{/* Выбор роли */}
<p className="text-[1.667vw] mb-[1.389vw]">Роль</p>
      <div className="flex  mb-[2.778vw]">
        {[
          { id: "confectioner", name: "Кондитер" },
          { id: "courier", name: "Курьер" }
        ].map(r => (
          <button
            key={r.id}
            className={`px-[1.667vw] font-[500] py-[0.972vw] rounded-full text-[1.111vw] mr-[0.833vw] ${
              role === r.id ? "bg-white text-[#003C46] font-[500]" : "border border-white/20 text-white "
            }`}
            onClick={() => setRole(r.id)}
          >
            {r.name}
          </button>
        ))}
      </div>

      {/* Выбор района */}
      <p className="text-[1.667vw] mb-[1.389vw]">Район работы</p>
      <div className="flex mr-[0.833vw] mb-[2.778vw]">
        {[
          { id: "sheikh_mansurovsky", name: "Шейх Мансуровский" },
          { id: "baisangurovsky", name: "Басайнгуровский" },
          { id: "akhmatovsky", name: "Ахматовский" }
        ].map(d => (
          <button
            key={d.id}
            className={`px-[1.667vw] py-[0.972vw] rounded-full text-[1.111vw] mr-[0.833vw] ${
              district === d.id ? "bg-white text-[#003C46]" : "border border-white/20 text-white"
            }`}
            onClick={() => setDistrict(d.id)}
          >
            {d.name}
          </button>
        ))}
      </div>

      {/* Основная информация */}
      <p className="text-[1.667vw] mb-[1.389vw]">Основная информация</p>
      <div className="bg-[#ffffff08] p-6 rounded-lg max-w-md">
        <div className="mb-4">
          <label className="text-sm block mb-1">ИМЯ РАБОТНИКА</label>
          <input
            type="text"
            placeholder="Введите имя"
            className="w-full p-3 rounded bg-transparent border border-white/20 text-white placeholder-gray-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="text-sm block mb-1">АДРЕС</label>
          <input
            type="text"
            placeholder="Введите адрес"
            className="w-full p-3 rounded bg-transparent border border-white/20 text-white placeholder-gray-400"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="text-sm block mb-1">НОМЕР</label>
          <div className="relative">
            <input
              type="text"
              className="w-full p-3 pl-10 rounded bg-transparent border border-white/20 text-white placeholder-gray-400"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <span className="absolute left-3 top-3">🇫🇷</span>
          </div>
        </div>

        <div className="mb-4 relative">
          <label className="text-sm block mb-1">ПАРОЛЬ</label>
          <div className="relative">
            <input
              type="password"
              placeholder="Создайте пароль"
              className="w-full p-3 rounded bg-transparent border border-white/20 text-white placeholder-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              className="absolute right-3 top-3 cursor-pointer w-5 h-5"
              src="../images/icons/eye.svg"
              alt="Показать пароль"
            />
          </div>
        </div>

        <div className="mb-4 relative">
          <label className="text-sm block mb-1">TELEGRAM ТОКЕН</label>
          <div className="relative">
            <input
              type="text"
              value={telegramToken}
              readOnly
              className="w-full p-3 rounded bg-transparent border border-white/20 text-white"
            />
            <img
              className="absolute right-3 top-3 cursor-pointer w-5 h-5"
              src="../images/icons/copy.svg"
              alt="Скопировать токен"
              onClick={() => navigator.clipboard.writeText(telegramToken)}
            />
          </div>
        </div>
      </div>

      {/* Кнопка Создать */}
      <button
        className="mt-6 bg-[#53CFBA] text-[#003C46] px-6 py-3 rounded-lg text-lg"
        onClick={handleSubmit}
      >
        Создать
      </button>
        </div>


      {/*  */}

    </div>
      </div>
   
    </div>
  );
}
>>>>>>> 4209af87ea2b0c413d53f4d274e4f86a5c625e14
