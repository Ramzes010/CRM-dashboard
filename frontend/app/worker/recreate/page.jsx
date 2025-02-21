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
          <div className="flex items-center mr-[18.056vw] max-md: ">
            <button className="mr-[6.667vw]" onClick={() => router.back()}>
              <img src="../../images/icons/iconButton.svg" alt="Назад" className="w-[3.056vw] h-[3.056vw]" />
            </button>
            <h1 className="text-[3.889vw] leading-[4.167vw]">Обновление <br/> работника</h1>
          </div>
          <div>
            <h1 className="text-[1.667vw] text-white mb-[1.389vw]">Роль</h1>
            <div className="flex w-[40.28vw] gap-[0.83vw] items-start flex-wrap relative mx-auto my-0 mb-[2.778vw]">
              <button
                className={`flex w-[8.68vw] py-[0.97vw] px-[1.67vw] gap-[0.42vw] justify-center items-center rounded-full border ${
                  role === "confectioner" ? "bg-[#fff] text-[#003c46]" : "border-white/20 text-white"
                }`}
                onClick={() => setRole("confectioner")}
              >
                <span className="h-[1.39vw] text-[1.11vw] font-medium leading-[1.39vw]">Кондитер</span>
              </button>
              <button
                className={`flex w-[7.36vw] py-[0.97vw] px-[1.67vw] gap-[0.42vw] justify-center items-center rounded-full border ${
                  role === "courier" ? "bg-[#fff] text-[#003c46]" : "border-white/20 text-white"
                }`}
                onClick={() => setRole("courier")}
              >
                <span className="h-[1.39vw] text-[1.11vw] font-medium leading-[1.39vw]">Курьер</span>
              </button>
            </div>

            <h2 className="text-[1.667vw] text-white mb-[1.389vw]">Район работы</h2>
            <div className="flex w-[40.28vw] gap-[0.83vw] items-start flex-wrap relative mx-auto my-0 mb-[2.778vw]">
              {[
                { id: "sheikh_mansurovsky", label: "Шейх Мансуровский", width: "14.79vw" },
                { id: "baisangurovsky", label: "Байсангуровский", width: "13.13vw" },
                { id: "akhmatovsky", label: "Ахматовский", width: "10.63vw" },
              ].map((d) => (
                <button
                  key={d.id}
                  className={`flex ${d.width} py-[0.97vw] px-[1.67vw] gap-[0.42vw] justify-center items-center rounded-full border ${
                    district === d.id ? "bg-[#fff] text-[#003c46]" : "border-white/20 text-white"
                  }`}
                  onClick={() => setDistrict(d.id)}
                >
                  <span className="h-[1.39vw] text-[1.11vw] font-medium leading-[1.39vw]">
                    {d.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="main-container flex w-[40.28vw] flex-col gap-[1.39vw] items-start flex-nowrap relative mx-auto my-0">
              <span className="h-[1.94vw] self-stretch text-[1.67vw] font-medium leading-[1.94vw] text-[#fff]">Основная информация</span>
              <div className="flex flex-col items-start self-stretch rounded-[0.83vw] border border-[#1f535c] overflow-hidden">
                {[
                  { label: "Имя работника", value: name, setter: setName, placeholder: "Введите имя" },
                  { label: "Адрес", value: address, setter: setAddress, placeholder: "Введите адрес" },
                  { label: "Номер", value: phone, setter: setPhone, placeholder: "+337 77 77 77 77" },
                  { label: "Пароль", value: password, setter: setPassword, placeholder: "Создайте пароль", type: "password" },
                //   { label: "Телеграм токен", value: telegramToken, setter: () => {}, placeholder: telegramToken, readOnly: true },
                ].map((field, index) => (
                  <div key={index} className="flex py-[1.11vw] px-[1.67vw] gap-[0.83vw] items-center self-stretch border-t border-[#1f535c]">
                    <div className="flex flex-col gap-[0.56vw] items-start grow">
                      <span className="h-[1.39vw] text-[1.04vw] font-[460] leading-[1.39vw] text-[rgba(255,255,255,0.6)] tracking-[0.014vw] uppercase">{field.label}</span>
                      <input
                        type={field.type || "text"}
                        value={field.value}
                        onChange={(e) => field.setter(e.target.value)}
                        readOnly={field.readOnly}
                        placeholder={field.placeholder}
                        className="w-full p-[0.56vw] rounded bg-transparent text-white placeholder-gray-400 text-[1.53vw] font-[450] leading-[1.67vw]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="mt-6 bg-[#53CFBA] text-[#003C46] px-6 py-3 rounded-lg text-lg mb-[8.333vw]" onClick={handleSubmit}>
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}