"use client";
import Header from "../../header/Header";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderDetails() {
  const { id } = useParams();
  const router = useRouter();

  // 🔹 Демо-данные
  const fakeOrders = [
    { 
      id: 1, number: 1, time: "18:50", date: "January 21, 2024", 
      category: "sheikh_mansurovsky", categoryName: "Sheikh Mansurovsky", 
      status: "New", timeLeft: "4:26", 
      items: "×1 Premium, ×2 Standard, ×1 Mini", 
      comment: "Put a note with the text: “Text text”",
      client: { name: "Ruslan X", phone: "8 928 902 99 99", address: "12 Leonova Lane, kv 42" }
    }
  ];

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const foundOrder = fakeOrders.find((o) => o.id === parseInt(id));
      setOrder(foundOrder || null);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (!order) return <p className="text-center text-xl text-red-500">The order was not found</p>;

  return (
    <div>
      <Header />

      <div className="max-w mx-auto mt-[5vw] px-[3.056vw] bg-[#003C46] text-white  flex justify-between items-start">
        
          <div className="flex items-center flex-col gap-[0.556vw] mr-[6.667vw]">
            <button 
              onClick={() => router.push("/")} 
              className="p-[0.556vw]   transition"
            >
              <img  src="../images/icons/IconButton.svg" alt="Назад" className="bg-cover w-[3.056vw] h-[3.056vw]" />
            </button>
            <div className="w-[3.056vw] h-[0.069vw] bg-white/10"></div>

            <button className="p-[0.556vw] transition">
            <div className="rounded-[0.556vw] border border-white/10 p-[0.833vw] group-hover:fill-red-500 ">
              <svg className="w-[1.389vw] h-[1.389vw]" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="none">
                <path d="M16.875 3.75H13.75V3.125C13.75 2.62772 13.5525 2.15081 13.2008 1.79917C12.8492 1.44754 12.3723 1.25 11.875 1.25H8.125C7.62772 1.25 7.15081 1.44754 6.79917 1.79917C6.44754 2.15081 6.25 2.62772 6.25 3.125V3.75H3.125C2.95924 3.75 2.80027 3.81585 2.68306 3.93306C2.56585 4.05027 2.5 4.20924 2.5 4.375C2.5 4.54076 2.56585 4.69973 2.68306 4.81694C2.80027 4.93415 2.95924 5 3.125 5H3.75V16.25C3.75 16.5815 3.8817 16.8995 4.11612 17.1339C4.35054 17.3683 4.66848 17.5 5 17.5H15C15.3315 17.5 15.6495 17.3683 15.8839 17.1339C16.1183 16.8995 16.25 16.5815 16.25 16.25V5H16.875C17.0408 5 17.1997 4.93415 17.3169 4.81694C17.4342 4.69973 17.5 4.54076 17.5 4.375C17.5 4.20924 17.4342 4.05027 17.3169 3.93306C17.1997 3.81585 17.0408 3.75 16.875 3.75ZM7.5 3.125C7.5 2.95924 7.56585 2.80027 7.68306 2.68306C7.80027 2.56585 7.95924 2.5 8.125 2.5H11.875C12.0408 2.5 12.1997 2.56585 12.3169 2.68306C12.4342 2.80027 12.5 2.95924 12.5 3.125V3.75H7.5V3.125ZM15 16.25H5V5H15V16.25ZM8.75 8.125V13.125C8.75 13.2908 8.68415 13.4497 8.56694 13.5669C8.44973 13.6842 8.29076 13.75 8.125 13.75C7.95924 13.75 7.80027 13.6842 7.68306 13.5669C7.56585 13.4497 7.5 13.2908 7.5 13.125V8.125C7.5 7.95924 7.56585 7.80027 7.68306 7.68306C7.80027 7.56585 7.95924 7.5 8.125 7.5C8.29076 7.5 8.44973 7.56585 8.56694 7.68306C8.68415 7.80027 8.75 7.95924 8.75 8.125ZM12.5 8.125V13.125C12.5 13.2908 12.4342 13.4497 12.3169 13.5669C12.1997 13.6842 12.0408 13.75 11.875 13.75C11.7092 13.75 11.5503 13.6842 11.4331 13.5669C11.3158 13.4497 11.25 13.2908 11.25 13.125V8.125C11.25 7.95924 11.3158 7.80027 11.4331 7.68306C11.5503 7.56585 11.7092 7.5 11.875 7.5C12.0408 7.5 12.1997 7.56585 12.3169 7.68306C12.4342 7.80027 12.5 7.95924 12.5 8.125Z" fill="white"/>
              </svg>
            </div>

            </button>
          </div>
        {/* Левая часть */}
        <div className="w-1/3 flex flex-col items-start mr-[15vw]">
          {/* Верхние кнопки */}

          {/* Основная информация */}
          <p className="text-gray-400 text-[1.042vw] mb-[1.111vw]">{order.time}, {order.date}</p>
          <h1 className="text-[3.889vw] font-bold mb-[0.833vw]">№{order.number}</h1>
          <p className="text-[1.319vw] text-gray-300">{order.categoryName}</p>

          {/* Кнопка "Оформить" */}
          <button 
            className="mt-[2.5vw] px-[1.667vw] py-[1.111vw] bg-[#53CFBA] text-[#003C46] rounded-[0.833vw] text-[1.25vw]  hover:text-white"
          >
            Arrange
          </button>
        </div>

        {/* Правая часть */}
        <div className="w-2/3">
          {/* Статус */}
          

          {/* Информация о заказе */}
          <div>
            <h2 className="text-[1.042vw]  text-white/60 mb-[0.556vw]">ORDER</h2>
            <p className="text-[1.319vw] text-white mb-[1.667vw]">{order.items}</p>
          </div>

          {/* Комментарий */}
          <div>
            <h2 className="text-[1.042vw] text-white/60 mb-[0.556vw]">COMMENT</h2>
            <p className="text-[1.319vw] text-white  mb-[1.667vw]">{order.comment}</p>
          </div>

          {/* Разделительная линия */}
          <div className="w-[29.861vw] h-[0.069vw] bg-white/10 mb-[2.222vw]"></div>

          {/* Информация о клиенте */}
          <div className="mt-4 flex items-center gap-[0.833vw]">
            <img src="../images/icons/AvatarIcon.svg" alt="Клиент" className="w-[2.222vw] h-[2.222vw] mr-[1.389vw] relative bottom-[2.8vw]" />
            <div>
              <h2 className="text-[1.042vw]  text-white/60 mb-[0.556vw]">CLIENT {order.client.name.toUpperCase()}</h2>
              <p className="text-[1.319vw] text-white  mb-[0.278vw]">{order.client.phone}</p>
              <p className="text-[1.319vw] text-white  mb-[1.667vw]">{order.client.address}</p>
            </div>
          </div>
          <div className="flex justify-end relative bottom-[21.5vw]">
            <div className="flex items-center gap-[0.556vw] bg-white/15 px-[0.556vw] py-[0.556vw] rounded-[0.556vw] text-[1.111vw]">
              <img src="../images/IconWrapper.svg" alt="Статус" className="w-[1.389vw] h-[1.389vw]" />
              {order.status} {order.timeLeft}
            </div>
          </div>
        </div>
      </div>
        {/*  */}

      <div className="px-[3.056vw]">
        <h3 className="text-[1.667vw] mt-[3.889vw] mb-[3.056vw]">Order structure</h3>

        
        <div className="w-[22.43vw] h-[22.29vw] bg-[rgba(255,255,255,0.08)] rounded-[0.83vw]">
        {/* Заголовок */}
        <div className="flex justify-between items-center bg-[#6d7a74] p-[0.69vw] rounded-t-[0.83vw]">
          <span className="text-white text-[1.11vw] font-medium">#2 Mini Picheni</span>
          <span className="text-[#b4c2bd] text-[0.9vw] uppercase tracking-[0.018vw]">Стандарт</span>
        </div>

        {/* Изображение */}
        <div className="w-[10.14vw] h-[5.56vw] bg-cover bg-no-repeat  mt-[2.29vw] ml-[1.67vw]"
            style={{ backgroundImage: "url(../images/CookieBox.svg)" }}>
        </div>

        {/* Список печений */}
        <ul className="mt-[1.93vw] ml-[3.01vw] text-white text-[1.11vw] font-medium space-y-[0.28vw] list-disc">
          <li>Picheni Signature</li>
          <li>Клубничное облако</li>
          <li>Красный закат</li>
          <li>Млечный путь</li>
        </ul>
        </div>
        
        
      </div>
      
      

    </div>
  );
}
