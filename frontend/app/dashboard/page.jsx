"use client";

import React from "react";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Header from "../header/Header";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = React.useState({
    total_orders: 0,
    total_income: 0,
    average_income: "0.00",
    average_crafting_time: "0:00:00",
    average_delivery_time: "0:00:00",
    sales_count: {},
    flavor_count: {},
    team_performance: [],
    cookies: {},
    boxes: {}
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          throw new Error("Токен авторизации не найден");
        }

        const headers = {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json'
        };

        // Запрос данных дашборда
        const dashboardResponse = await fetch('http://localhost/api/dashboard/dashboard/', {
          headers
        });
        
        if (!dashboardResponse.ok) {
          const errorData = await dashboardResponse.json();
          throw new Error(errorData.detail || 'Ошибка при загрузке данных дашборда');
        }
        
        const dashboardResult = await dashboardResponse.json();

        // Запрос данных cookies
        const cookiesResponse = await fetch('http://localhost/api/cookies/get_cookies/?box_id=2', {
          headers
        });

        if (!cookiesResponse.ok) {
          const errorData = await cookiesResponse.json();
          throw new Error(errorData.detail || 'Ошибка при загрузке данных cookies');
        }

        const cookiesResult = await cookiesResponse.json();
        const cookiesMap = {};
        cookiesResult.forEach(cookie => {
          cookiesMap[cookie.id] = cookie.name;
        });

        // Запрос данных boxes
        const boxesResponse = await fetch('http://localhost/api/boxes/', {
          headers
        });

        if (!boxesResponse.ok) {
          const errorData = await boxesResponse.json();
          throw new Error(errorData.detail || 'Ошибка при загрузке данных boxes');
        }

        const boxesResult = await boxesResponse.json();
        const boxesMap = {};
        boxesResult.forEach(box => {
          boxesMap[box.id] = box.name;
        });

        setDashboardData({
          ...dashboardResult,
          cookies: cookiesMap,
          boxes: boxesMap
        });

      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        if (error.message === "Токен авторизации не найден") {
          router.push('/login');
        }
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: Object.values(dashboardData.boxes),
    datasets: [
      {
        data: Object.keys(dashboardData.boxes).map(boxId => 
          dashboardData.sales_count[boxId] || 0
        ),
        backgroundColor: ['#54CFBA', '#E6EBCE'],
        hoverBackgroundColor: ['#45B29D', '#D6DAB2'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '80%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const showAlert = () => {
    alert("The button is muted. The page is being developed!");
  };

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatCurrency = (amount) => {
    return `$${formatNumber(Math.round(amount))}`;
  };

  return (
    <div>
      <Header/>
      <div className="main-container flex pt-[5vw] pr-[3.06vw] pb-0 pl-[3.06vw] flex-col gap-[8.33vw] items-center flex-nowrap bg-[#003c46] rounded-tl-[1.67vw] rounded-tr-[1.67vw] rounded-br-none rounded-bl-none relative mx-auto my-0">
        <div className="flex flex-col gap-[3.89vw] items-start self-stretch shrink-0 flex-nowrap relative">
          <div className="flex flex-col gap-[3.06vw] items-center self-stretch shrink-0">
            <span className="text-[3.89vw] font-light leading-[4.17vw] text-white text-center">
              Dashboard
            </span>
            
            <div className="flex w-[52.57vw] gap-[1.11vw] items-start">
              <div className="flex w-[38.96vw] gap-[0.83vw] justify-center flex-wrap">
                {[ 
                  { label: "Today", active: true },
                  { label: "7 days" },
                  { label: "30 days" },
                  { label: "Select a period", icon: "/images/calendar-icon.svg" }
                ].map(({ label, active, icon }, index) => (
                  <button 
                    key={index} 
                    onClick={showAlert} 
                    className={`flex px-[1.67vw] py-[0.97vw] gap-[0.42vw] justify-center items-center rounded-full transition-all duration-300
                      ${active ? "bg-white text-[#003c46]" : "border border-[rgba(255,255,255,0.12)] text-white hover:bg-[rgba(255,255,255,0.08)] active:bg-[rgba(255,255,255,0.16)]"}`}
                  >
                    <span className="text-[1.11vw] font-medium">{label}</span>
                    {icon && <div className="w-[1.11vw] h-[1.11vw] bg-cover bg-no-repeat" style={{ backgroundImage: `url(${icon})` }} />}
                  </button>
                ))}
              </div>

              <div className="w-px bg-cover bg-no-repeat" />
              
              <button onClick={showAlert} className="flex w-[11.32vw] justify-center items-center gap-[0.42vw] px-[1.67vw] py-[0.97vw] bg-white rounded-full">
                <span className="text-[1.11vw] font-medium text-[#003c46]">All districts</span>
                <div className="w-[1.11vw] h-[1.11vw] bg-cover bg-no-repeat" style={{ backgroundImage: "url('/images/calendar2-icon.svg')" }} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-[1.67vw] items-start self-stretch">
            <span className="text-[1.67vw] font-medium leading-[1.94vw] text-white">The overview</span>
            
            <div className="flex gap-[0.83vw] items-start self-stretch">
              <div className="flex w-[63.671vw] gap-[0.83vw] items-center flex-wrap">
                {[ 
                  { title: "number of orders", value: formatNumber(dashboardData.total_orders), change: "17 more orders than yesterday" },
                  { title: "Avg. order accept time", value: dashboardData.average_crafting_time, change: "2 min faster than yesterday" },
                  { title: "income", value: formatCurrency(dashboardData.total_income), change: "$540 more than yesterday" },
                  { title: "Average crafting time", value: dashboardData.average_crafting_time, change: "2 min faster than yesterday" },
                  { title: "Average receipt", value: formatCurrency(parseFloat(dashboardData.average_income)), change: "$3.5 less than yesterday", icon: "/images/Redwrapper.svg" },
                  { title: "average delivery time", value: dashboardData.average_delivery_time, change: "4 min faster than yesterday" }
                ].map(({ title, value, change, icon }, index) => (
                  <div key={index} className="flex w-[20.67vw] p-[1.67vw] flex-col gap-[2.22vw] bg-[rgba(255,255,255,0.08)] rounded-[0.83vw]">
                    <span className="text-[1.04vw] font-[460] leading-[1.39vw] text-[rgba(255,255,255,0.6)] uppercase">{title}</span>
                    <div className="flex flex-col gap-[0.83vw]">
                      <span className="text-[2.78vw] font-light leading-[3.06vw] text-white">{value}</span>
                      <div className="flex gap-[0.28vw] items-center">
                        <img src={icon || "./images/Greenwrapper.svg"} alt="change" className="w-[0.97vw]" />
                        <span className="text-[0.97vw] font-[450] leading-[1.39vw] text-white">{change}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex w-[26.04vw] h-[25vw] p-[1.67vw] flex-col justify-between items-center bg-[rgba(255,255,255,0.08)] rounded-[0.83vw]">
                <span className="text-[1.04vw] font-[460] leading-[1.39vw] text-[rgba(255,255,255,0.6)] uppercase">Box Sales</span>
                <div className="h-[12.99vw] relative">
                  <Doughnut data={data} options={options} />
                  <span className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-[1.67vw] font-medium text-white">
                    {Object.values(dashboardData.sales_count).reduce((a, b) => a + b, 0)}
                  </span>
                </div>
                <div className="flex w-[20.35vw] gap-[0.56vw] justify-center items-start">
                  {Object.values(dashboardData.boxes).map((name, index) => (
                    <div key={index} className="flex w-[5.76vw] gap-[0.14vw] items-center">
                      <div className="w-[0.75vw] h-[0.75vw] bg-white rounded-full" />
                      <span className="text-[0.72vw] font-[450] leading-[1.39vw] text-white">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[1.667vw] items-start self-stretch">
            <span className="text-[1.667vw] font-medium leading-[1.944vw] text-white mb-[1.667vw]">Popular tastes</span>
            
            <div className="flex w-full h-[38.889vw] p-[0.556vw] flex-col items-start">
              <div className="flex w-full h-full bg-[url('/images/dashboard_background.svg')] bg-cover bg-center bg-no-repeat relative">
                <div className="relative right-5 top-0 bottom-0 flex flex-col justify-between py-[1.111vw] text-[0.833vw] font-medium text-[rgba(255,255,255,0.6)] uppercase">
                  {[100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0].map((num, index) => (
                    <span key={index} className="leading-none">{num}</span>
                  ))}
                </div>
                
                <div className="flex w-full h-full items-end gap-[5.292vw] justify-center">
                  {Object.entries(dashboardData.flavor_count).map(([id, count], index) => {
                    const maxCount = Math.max(...Object.values(dashboardData.flavor_count));
                    const height = maxCount > 0 ? (count / maxCount) * 100 : 0;
                    return (
                      <div key={id} className="w-[6.736vw] bg-[#53cfba] opacity-80" style={{ height: `${height}%` }} />
                    );
                  })}
                </div>
              </div>
              
              <div className="flex justify-between w-full px-[2.014vw] pt-[0.556vw] text-[0.833vw] font-medium text-white uppercase text-center">
                {Object.keys(dashboardData.flavor_count).map((id) => (
                  <span key={id} className="w-[6.736vw] text-center">
                    {dashboardData.cookies[id] || `Cookie ${id}`}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[1.67vw] items-start self-stretch">
            <span className="text-[1.67vw] font-medium leading-[1.94vw] text-white">Team Performance</span>
            
            <div className="flex gap-[0.56vw] items-center">
              {[{ label: "All", active: true }, { label: "Pastry chefs" }, { label: "Couriers" }].map(({ label, active }, index) => (
                <button key={index} onClick={showAlert} className={`flex px-[1.11vw] py-[0.56vw] rounded-full transition-all duration-300 
                  ${active ? "bg-white text-[#003c46]" : "border border-[rgba(255,255,255,0.12)] text-white hover:bg-[rgba(255,255,255,0.08)] active:bg-[rgba(255,255,255,0.16)]"}`}>
                  <span className="text-[1.11vw] font-medium">{label}</span>
                </button>
              ))}
            </div>
            
            <div className="main-container flex w-[93.89vw] px-[1.75vw] py-[1.15vw] flex-col gap-[0.28vw] bg-[rgba(255,255,255,0.08)] rounded-[0.83vw] mx-auto">
              <div className="flex gap-[1.11vw] items-start text-[1.04vw] font-[460] text-[rgba(255,255,255,0.6)] uppercase">
                {["District", "Name", "Role", "Number of orders", "Average lead time"].map((header, index) => (
                  <span key={index} className="flex-1 text-left">{header}</span>
                ))}
              </div>
              
              {dashboardData.team_performance.map((team, index) => (
                <div key={index} className="flex gap-[1.11vw] items-center text-[1.32vw] font-[450] text-white">
                  <span className="flex-1">{team.district}</span>
                  <div className="flex items-center gap-[0.83vw]">
                    <div className="w-[2.22vw] h-[2.22vw] bg-[url(/images/Avatar.svg)] bg-cover rounded-full" />
                    <span>{team.fullname}</span>
                  </div>
                  <span className="flex-1">{team.role}</span>
                  <span className="flex-1">{team.order_count}</span>
                  <span className="flex-1">{team.role === 'confectioner' ? team.average_crafting_time : team.average_delivery_time}</span>
                  <div className="cursor-pointer w-[3.06vw] h-[3.06vw] bg-[url(/images/IconWrapper3.svg)] bg-cover rounded-[0.56vw] border border-[rgba(255,255,255,0.12)]" />
                </div>
              ))}
            </div>
            
            <div className="flex gap-[0.56vw]">
              {[1, 2, 3, 4, 5].map((num, index) => (
                <button key={index} onClick={showAlert} className={`w-[2.22vw] h-[2.22vw] flex justify-center items-center rounded-full transition-all duration-300 
                  ${num === 1 ? "bg-white text-[#003c46]" : "border border-[rgba(255,255,255,0.12)] text-white hover:bg-[rgba(255,255,255,0.08)] active:bg-[rgba(255,255,255,0.16)]"}`}>
                  <span className="text-[1.11vw] font-medium">{num}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex py-[1.39vw] justify-between items-center self-stretch rounded-br-[0.83vw] rounded-bl-[0.83vw]">
          <div className="flex w-[21.94vw] gap-[1.11vw] items-center">
            <span onClick={showAlert} className="h-[1.11vw] text-[0.83vw] font-[460] leading-[1.11vw] text-[rgba(255,255,255,0.45)] tracking-[0.014vw] uppercase whitespace-nowrap">
              Picheni © 2024
            </span>
            <div className="w-[0.07vw] self-stretch bg-white/30" />
            {["terms", "privacy", "help"].map((item) => (
              <span key={item} onClick={showAlert} className="h-[1.11vw] text-[0.83vw] font-[460] leading-[1.11vw] text-[rgba(255,255,255,0.6)] tracking-[0.014vw] uppercase whitespace-nowrap">
                {item}
              </span>
            ))}
          </div>
          <div className="flex w-[5.28vw] gap-[0.83vw] items-start">
            {[
              { src: "/images/IconInstaAB.svg", alt: "Instagram" },
              { src: "/images/UnionTele.svg", alt: "Telegram" },
            ].map((icon, index) => (
              <div key={index} className="flex w-[2.22vw] p-[0.56vw] justify-center items-center bg-[rgba(255,255,255,0.12)] rounded-[0.56vw]">
                <img src={icon.src} alt={icon.alt} className="w-[1.11vw] h-[1.11vw] cursor-pointer" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;