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
  };

  return (
    <div>
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