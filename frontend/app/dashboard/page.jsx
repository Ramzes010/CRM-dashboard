"use client";

import React from "react";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Header from "../header/Header";

import Link from 'next/link';
import { useRouter } from 'next/navigation';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [activeTimeFilter, setActiveTimeFilter] = React.useState('today');
  const [activeRoleFilter, setActiveRoleFilter] = React.useState('all');
  const [showDistricts, setShowDistricts] = React.useState(false);
  const districts = ["All", "Sheikh Mansurovsky", "Baysangurovsky", "Akhmatovsky"];
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

  

  const fetchDashboardData = async (period) => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error("Токен авторизации не найден");
      }

      const headers = {
        'Authorization': `Token ${authToken}`,
        'Content-Type': 'application/json'
      };

      const dashboardResponse = await fetch(`http://localhost/api/dashboard/dashboard/?period=${period}`, {
        headers
      });
      
      if (!dashboardResponse.ok) {
        const errorData = await dashboardResponse.json();
        throw new Error(errorData.detail || 'Ошибка при загрузке данных дашборда');
      }
      
      const dashboardResult = await dashboardResponse.json();

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

  React.useEffect(() => {
    fetchDashboardData(activeTimeFilter);
  }, [activeTimeFilter]);

  const getFilteredTeam = () => {
    if (activeRoleFilter === 'all') return dashboardData.team_performance;
    return dashboardData.team_performance.filter(member => {
      if (activeRoleFilter === 'pastry_chefs') return member.role === 'confectioner';
      if (activeRoleFilter === 'couriers') return member.role === 'courier';
      return true;
    });
  };

  const handleTimeFilterChange = (period) => {
    setActiveTimeFilter(period);
  };

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


      <div className="main-container flex pt-[5vw] pr-[3.06vw] pb-0 pl-[3.06vw] flex-col gap-[8.33vw] items-center flex-nowrap bg-[#003c46] rounded-tl-[1.67vw] rounded-tr-[1.67vw] rounded-br-none rounded-bl-none relative mx-auto my-0">
        <div className="flex flex-col gap-[3.89vw] items-start self-stretch shrink-0 flex-nowrap relative">
          <div className="flex flex-col gap-[3.06vw] items-center self-stretch shrink-0 max-md:items-start max-md:text-[10.667vw]">
            <span className="text-[3.89vw] font-light leading-[4.17vw] text-white text-center max-md:text-start">
              Dashboard
            </span>
            
            <div className="flex w-[52.57vw] gap-[1.11vw] items-start">
              <div className="flex w-[38.96vw] gap-[0.83vw] justify-center flex-wrap max-md:hidden">
                {[ 
                  { label: "Today", value: "today" },
                  { label: "7 days", value: "week" },
                  { label: "30 days", value: "month" },
                  { label: "Select a period", value: "custom", icon: "/images/calendar-icon.svg" }
                ].map(({ label, value, icon }) => (
                  <button 
                    key={value} 
                    onClick={() => handleTimeFilterChange(value)}
                    className={`flex px-[1.67vw] py-[0.97vw] gap-[0.42vw] justify-center items-center rounded-full transition-all duration-300
                      ${activeTimeFilter === value 
                        ? "bg-white text-[#003c46]" 
                        : "border border-[rgba(255,255,255,0.12)] text-white hover:bg-[rgba(255,255,255,0.08)] active:bg-[rgba(255,255,255,0.16)]"}`}
                  >
                    <span className="text-[1.11vw] font-medium">{label}</span>
                    {icon && <div className="w-[1.11vw] h-[1.11vw] bg-cover bg-no-repeat" style={{ backgroundImage: `url(${icon})` }} />}
                  </button>
                ))}
              </div>

              <div className="w-px bg-cover bg-no-repeat" />
              
              <div className="relative">
                <button 
                  onClick={() => setShowDistricts(!showDistricts)}
                  onBlur={() => setTimeout(() => setShowDistricts(false), 200)}
                  className="flex w-[11.32vw] justify-center items-center gap-[0.42vw] px-[1.67vw] py-[0.97vw] bg-white rounded-full max-md:hidden"
                >
                  <span className="text-[1.11vw] font-medium text-[#003c46] max-md:text-[4.267vw]">All districts</span>
                  <div className="w-[1.11vw] h-[1.11vw] bg-cover bg-no-repeat" style={{ backgroundImage: "url('/images/calendar2-icon.svg')" }} />
                </button>
                
                {showDistricts && (
                  <div className="absolute top-full mt-2 w-full bg-white rounded-[0.83vw] shadow-lg z-50">
                    {districts.map((district, index) => (
                      <button
                        key={index}
                        className="w-full px-[1.67vw] py-[0.97vw] text-left text-[1.11vw] text-[#003c46] hover:bg-[#f0f0f0] transition-colors "
                        onClick={() => {
                          setShowDistricts(false);
                        }}
                      >
                        {district}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[1.67vw] items-start self-stretch">
            <span className="text-[1.67vw] font-medium leading-[1.94vw] text-white max-md:text-[5.867vw] max-md:mb-[5.867vw]">The overview</span>
            
            <div className="flex gap-[0.83vw] items-start self-stretch max-md:flex-col">
              <div className="flex w-[63.671vw] gap-[0.83vw] items-center flex-wrap max-md:flex-col ">
                {[ 
                  { title: "number of orders", value: formatNumber(dashboardData.total_orders), change: "17 more orders than yesterday" },
                  { title: "Avg. order accept time", value: dashboardData.average_crafting_time, change: "2 min faster than yesterday" },
                  { title: "income", value: formatCurrency(dashboardData.total_income), change: "$540 more than yesterday" },
                  { title: "Average crafting time", value: dashboardData.average_crafting_time, change: "2 min faster than yesterday" },
                  { title: "Average receipt", value: formatCurrency(parseFloat(dashboardData.average_income)), change: "$3.5 less than yesterday", icon: "/images/Redwrapper.svg" },
                  { title: "average delivery time", value: dashboardData.average_delivery_time, change: "4 min faster than yesterday" }
                ].map(({ title, value, change, icon }, index) => (
                  <div key={index} className="flex w-[20.67vw] p-[1.67vw] flex-col gap-[2.22vw] bg-[rgba(255,255,255,0.08)] rounded-[0.83vw] 
                  max-md:w-[95vw] max-md:h-[33.867vw] max-md:mb-[3.2vw] max-md:rounded-[3.2vw]">
                    <span className="text-[1.04vw] font-[460] leading-[1.39vw] text-[rgba(255,255,255,0.6)] uppercase 
                    max-md:text-[4vw] max-md:mt-[4.267vw] max-md:ml-[6.4vw] ">{title}</span>
                    <div className="flex flex-col gap-[0.83vw] ">
                      <span className="text-[2.78vw] font-light leading-[3.06vw] text-white max-md:text-[8.533vw] max-md:mt-[6.4vw]
                      max-md:ml-[6.4vw]">{value}</span>
                      <div className="flex gap-[0.28vw] items-center">
                        <img src={icon || "./images/Greenwrapper.svg"} alt="change" className="w-[0.97vw] max-md:w-[4.267vw] max-md:mt-[7.2vw] max-md:ml-[1.4vw] " />
                        <span className="text-[0.97vw] font-[450] leading-[1.39vw] text-white max-md:text-[4.267vw] max-md:mt-[6.4vw] 
                        max-md:ml-[1.4vw]">{change}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex w-[26.04vw] h-[25vw] p-[1.67vw] flex-col justify-between items-center bg-[rgba(255,255,255,0.08)] rounded-[0.83vw]
              max-md:w-[95vw] max-md:h-[33.867vw] max-md:mb-[3.2vw] max-md:rounded-[3.2vw] max-md:items-start max-md:h-[77.6vw]">
                <span className="text-[1.04vw] font-[460] leading-[1.39vw] text-[rgba(255,255,255,0.6)] uppercase
                max-md:text-[4vw] max-md:mt-[4.267vw] max-md:ml-[6.4vw] ">Box Sales</span>
                <div className="h-[12.99vw] relative max-md:h-[42.867vw] max-md:mx-auto ">
                  <Doughnut data={data} options={options} />
                  <span className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-[1.67vw] font-medium text-white max-md:text-[5.867vw]">
                    {Object.values(dashboardData.sales_count).reduce((a, b) => a + b, 0)}
                  </span>
                </div>
                <div className="flex w-[20.35vw] gap-[0.56vw] justify-center items-start max-md:items-center">
                  {Object.values(dashboardData.boxes).map((name, index) => (
                    <div key={index} className="flex w-[5.76vw] gap-[0.14vw] items-center">
                      <div className="w-[0.75vw] h-[0.75vw] bg-white rounded-full" />
                      <span className="text-[0.72vw] font-[450] leading-[1.39vw] text-white max-md:text-[3.2vw] max-md:text-center max-md:relative max-md:left-[29.6vw] max-md:bottom-[1.6vw]">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[1.667vw] items-start self-stretch">
            <span className="text-[1.667vw] font-medium leading-[1.944vw] text-white mb-[1.667vw] max-md:text-[5.867vw] max-md:mb-[7.467vw]">Popular tastes</span>
            
            <div className="flex w-full h-[38.889vw] p-[0.556vw] flex-col items-start">
              <div className="flex w-full h-full bg-[url('/images/dashboard_background.svg')] bg-cover bg-center bg-no-repeat relative">
                <div className="relative right-5 top-0 bottom-0 flex flex-col justify-between py-[1.111vw] text-[0.833vw] font-medium text-[rgba(255,255,255,0.6)] uppercase">
                  {[100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0].map((num, index) => (
                    <span key={index} className="leading-none">{num}</span>
                  ))}
                </div>
                
                <div className="flex flex-col w-full">
                  <div className="flex h-full justify-evenly items-end gap-[5.292vw] justify-center max-md:relative max-md:top-[4.267vw]">
                    {Object.entries(dashboardData.flavor_count).map(([id, count], index) => {
                      const maxCount = Math.max(...Object.values(dashboardData.flavor_count));
                      const height = maxCount > 0 ? (count / maxCount) * 100 : 0;
                      return (
                        <div key={id} className="w-[6.736vw]  relative top-[2.8vw] bg-[#53cfba] opacity-80" style={{ height: `${height}%` }} />
                      );
                    })}
                  </div>
                  
                  <div className="flex relative top-[1.11vw] justify-around w-full px-[2.014vw] mt-[2vw] text-[0.833vw] font-medium text-white uppercase text-center">
                    {Object.keys(dashboardData.flavor_count).map((id) => (
                      <span key={id} className="w-[6.736vw] text-center max-md:text-[3.2vw] max-md:relative max-md:top-[9.6vw] max-md:right-[6.6vw] max-md:rotate-[-30deg]">
                        {dashboardData.cookies[id] || `Cookie ${id}`}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[1.67vw] items-start self-stretch">
            <span className="text-[1.67vw] font-medium leading-[1.94vw] text-white max-md:mt-[12.867vw]
            max-md:text-[5.867vw] max-md:mb-[3.467vw]">Team Performance</span>
            
            <div className="flex gap-[0.56vw] items-center max-md:hidden">
              {[
                { label: "All", value: "all" },
                { label: "Pastry chefs", value: "pastry_chefs" },
                { label: "Couriers", value: "couriers" }
              ].map(({ label, value }) => (
                <button 
                  key={value} 
                  onClick={() => setActiveRoleFilter(value)}
                  className={`flex px-[1.11vw] py-[0.56vw] rounded-full transition-all duration-300 
                    ${activeRoleFilter === value 
                      ? "bg-white text-[#003c46]" 
                      : "border border-[rgba(255,255,255,0.12)] text-white hover:bg-[rgba(255,255,255,0.08)] active:bg-[rgba(255,255,255,0.16)]"}`}
                >
                  <span className="text-[1.11vw] font-medium">{label}</span>
                </button>
              ))}
            </div>
            
            <div className="main-container flex w-[93.89vw] px-[1.75vw] py-[1.15vw] flex-col gap-[0.28vw] bg-[rgba(255,255,255,0.08)] rounded-[0.83vw] mx-auto
            max-md:w-[95vw] max-md:h-[37.6vw] max-md:rounded-[3.2vw] max-md:px-[3.2vw] max-md:py-[2.267vw] max-md:gap-[0.533vw]">
              <div className="flex gap-[1.11vw] items-start text-[1.04vw] font-[460] text-[rgba(255,255,255,0.6)] uppercase">
                {["District", "Name", "Role", "# Orders", "Avg. LT"].map((header, index) => (
                  <span key={index} className="flex-1 text-left max-md:text-[3.2vw]">{header}</span>
                ))}
              </div>
              
              {getFilteredTeam().map((team, index) => (
                <div key={index} className="flex gap-[1.11vw] items-center text-[1.32vw] font-[450] text-white">
                  <span className="flex-1 max-md:text-[1.5vw]">{team.district}</span>
                  <span className="flex-1 max-md:text-[2.5vw]">{team.fullname}</span>
                  <span className="flex-1 max-md:text-[1.8vw]">{team.role}</span>
                  <span className="flex-1 max-md:text-[2.5vw] max-md:relative max-md:left-[10.6vw]">{team.order_count}</span>
                  <span className="flex-1 max-md:text-[1.8vw] max-md:relative max-md:left-[6.6vw]">{team.role === 'confectioner' ? team.average_crafting_time : team.average_delivery_time}</span>
                  <div className="cursor-pointer w-[3.06vw] h-[3.06vw] p-[0.76vw] bg-[url(/images/IconWrapper3.svg)] bg-cover rounded-[0.56vw] border border-[rgba(255,255,255,0.12)]" />
                </div>
              ))}
            </div>
            
            <div className="flex gap-[0.56vw]">
              <button className="w-[2.22vw] h-[2.22vw] flex justify-center items-center rounded-full bg-white text-[#003c46] max-md:w-[6.11vw] max-md:h-[6.11vw] max-md:text-[3.2vw]">
                <span className="text-[1.11vw] font-medium max-md:text-[3.2vw]">1</span>
              </button>
              {[2, 3, 4, 5].map((num) => (
                <div 
                  key={num}
                  className="w-[2.22vw] h-[2.22vw] flex justify-center items-center rounded-full border border-[rgba(255,255,255,0.12)] text-white opacity-50 cursor-not-allowed
                  max-md:w-[6.11vw] max-md:h-[6.11vw] max-md:text-[3.2vw]"
                >
                  <span className="text-[1.11vw] font-medium max-md:text-[3.2vw]">{num}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex py-[1.39vw] justify-between items-center self-stretch rounded-br-[0.83vw] rounded-bl-[0.83vw] max-md:mb-[10vw]">
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
        <div className="hidden max-md:flex max-md:fixed max-md:bottom-0 max-md:w-[375px] max-md:flex-col max-md:bg-[#003c46] max-md:mx-auto max-md:left-0 max-md:right-0 max-md:mt-[10.667vw]">
  {/* Навигационные кнопки */}
  <div className="flex h-[56px] p-[8px] justify-between items-center px-[7.389vw]">
  <Link href="/" className="flex p-[4px] items-center">
    <div className="w-[24px] h-[24px]">
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
        <path d="M19.625 3.00011H16.2256C15.8042 2.52829 15.2879 2.15079 14.7105 1.89232C14.1331 1.63385 13.5076 1.50024 12.875 1.50024C12.2424 1.50024 11.6169 1.63385 11.0395 1.89232C10.4621 2.15079 9.94579 2.52829 9.52437 3.00011H6.125C5.72718 3.00011 5.34564 3.15814 5.06434 3.43945C4.78304 3.72075 4.625 4.10228 4.625 4.50011V20.2501C4.625 20.6479 4.78304 21.0295 5.06434 21.3108C5.34564 21.5921 5.72718 21.7501 6.125 21.7501H19.625C20.0228 21.7501 20.4044 21.5921 20.6857 21.3108C20.967 21.0295 21.125 20.6479 21.125 20.2501V4.50011C21.125 4.10228 20.967 3.72075 20.6857 3.43945C20.4044 3.15814 20.0228 3.00011 19.625 3.00011Z" fill="#E6EBCE"/>
      </svg>
    </div>
  </Link>
  
  <Link href="/dashboard" className="flex p-[4px] items-center">
    <div className="w-[24px] h-[24px]">
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
        <path d="M11.875 5.25024V9.75024C11.875 10.1481 11.717 10.5296 11.4357 10.8109C11.1544 11.0922 10.7728 11.2502 10.375 11.2502H5.875C5.47718 11.2502 5.09564 11.0922 4.81434 10.8109C4.53304 10.5296 4.375 10.1481 4.375 9.75024V5.25024C4.375 4.85242 4.53304 4.47089 4.81434 4.18958C5.09564 3.90828 5.47718 3.75024 5.875 3.75024H10.375C10.7728 3.75024 11.1544 3.90828 11.4357 4.18958C11.717 4.47089 11.875 4.85242 11.875 5.25024ZM19.375 3.75024H14.875C14.4772 3.75024 14.0956 3.90828 13.8143 4.18958C13.533 4.47089 13.375 4.85242 13.375 5.25024V9.75024C13.375 10.1481 13.533 10.5296 13.8143 10.8109C14.0956 11.0922 14.4772 11.2502 14.875 11.2502H19.375C19.7728 11.2502 20.1544 11.0922 20.4357 10.8109C20.717 10.5296 20.875 10.1481 20.875 9.75024V5.25024C20.875 4.85242 20.717 4.47089 20.4357 4.18958C20.1544 3.90828 19.7728 3.75024 19.375 3.75024ZM10.375 12.7502H5.875C5.47718 12.7502 5.09564 12.9083 4.81434 13.1896C4.53304 13.4709 4.375 13.8524 4.375 14.2502V18.7502C4.375 19.1481 4.53304 19.5296 4.81434 19.8109C5.09564 20.0922 5.47718 20.2502 5.875 20.2502H10.375C10.7728 20.2502 11.1544 20.0922 11.4357 19.8109C11.717 19.5296 11.875 19.1481 11.875 18.7502V14.2502C11.875 13.8524 11.717 13.4709 11.4357 13.1896C11.1544 12.9083 10.7728 12.7502 10.375 12.7502ZM19.375 12.7502H14.875C14.4772 12.7502 14.0956 12.9083 13.8143 13.1896C13.533 13.4709 13.375 13.8524 13.375 14.2502V18.7502C13.375 19.1481 13.533 19.5296 13.8143 19.8109C14.0956 20.0922 14.4772 20.2502 14.875 20.2502H19.375C19.7728 20.2502 20.1544 20.0922 20.4357 19.8109C20.717 19.5296 20.875 19.1481 20.875 18.7502V14.2502C20.875 13.8524 20.717 13.4709 20.4357 13.1896C20.1544 12.9083 19.7728 12.7502 19.375 12.7502Z" fill="white" fill-opacity="0.6"/>
      </svg>
    </div>
  </Link>
  
  <Link href="/worker/" className="flex p-[4px] items-center">
    <div className="w-[24px] h-[24px]">
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
        <path d="M6.3848 13.8564C6.38734 13.9072 6.37952 13.958 6.36182 14.0057C6.34411 14.0533 6.31689 14.0969 6.28182 14.1338C6.24674 14.1706 6.20453 14.1999 6.15777 14.2199C6.111 14.2399 6.06066 14.2502 6.0098 14.2501H1.87355C1.70427 14.2504 1.53988 14.1934 1.40711 14.0884C1.27435 13.9833 1.18102 13.8365 1.1423 13.6717C1.11818 13.5589 1.1193 13.4422 1.14555 13.3299C1.17181 13.2176 1.22256 13.1124 1.29417 13.022C1.95587 12.1445 2.83382 11.4536 3.8423 11.0167C3.39954 10.613 3.05996 10.1091 2.85199 9.54721C2.64403 8.9853 2.57373 8.38173 2.647 7.78707C2.72026 7.1924 2.93495 6.62395 3.27308 6.12931C3.61122 5.63468 4.06295 5.22827 4.59045 4.94413C5.11795 4.65998 5.70585 4.50636 6.30493 4.49615C6.904 4.48594 7.4968 4.61942 8.03368 4.88542C8.57056 5.15142 9.03589 5.54219 9.39069 6.02501C9.74548 6.50783 9.97943 7.06863 10.0729 7.66046C10.085 7.74004 10.0707 7.82139 10.0323 7.89213C9.99391 7.96287 9.93343 8.01912 9.86011 8.05233C8.81985 8.53325 7.93886 9.30168 7.32108 10.267C6.70331 11.2322 6.37453 12.3541 6.37355 13.5001C6.37355 13.6201 6.37355 13.7383 6.3848 13.8564ZM23.4473 13.0211C22.7871 12.1446 21.9112 11.454 20.9048 11.0167C21.3475 10.613 21.6871 10.1091 21.8951 9.54721C22.1031 8.9853 22.1734 8.38173 22.1001 7.78707C22.0268 7.1924 21.8121 6.62395 21.474 6.12931C21.1359 5.63468 20.6841 5.22827 20.1566 4.94413C19.6291 4.65998 19.0412 4.50636 18.4422 4.49615C17.8431 4.48594 17.2503 4.61942 16.7134 4.88542C16.1765 5.15142 15.7112 5.54219 15.3564 6.02501C15.0016 6.50783 14.7677 7.06863 14.6742 7.66046C14.6621 7.74004 14.6764 7.82139 14.7148 7.89213C14.7532 7.96287 14.8137 8.01912 14.887 8.05233C15.9272 8.53325 16.8082 9.30168 17.426 10.267C18.0438 11.2322 18.3726 12.3541 18.3735 13.5001C18.3735 13.6201 18.3735 13.7383 18.3623 13.8564C18.3598 13.9072 18.3676 13.958 18.3853 14.0057C18.403 14.0533 18.4302 14.0969 18.4653 14.1338C18.5004 14.1706 18.5426 14.1999 18.5893 14.2199C18.6361 14.2399 18.6864 14.2502 18.7373 14.2501H22.8735C23.0428 14.2504 23.2072 14.1934 23.34 14.0884C23.4727 13.9833 23.5661 13.8365 23.6048 13.6717C23.6291 13.5587 23.6279 13.4417 23.6015 13.3292C23.5751 13.2167 23.524 13.1115 23.452 13.0211H23.4473ZM15.1035 17.0692C15.8503 16.4973 16.3991 15.7058 16.6728 14.8059C16.9464 13.9059 16.9312 12.9429 16.6293 12.0521C16.3274 11.1612 15.7539 10.3874 14.9895 9.83936C14.225 9.2913 13.3081 8.99656 12.3675 8.99656C11.4268 8.99656 10.5099 9.2913 9.74545 9.83936C8.98101 10.3874 8.40752 11.1612 8.10559 12.0521C7.80366 12.9429 7.78846 13.9059 8.06213 14.8059C8.33581 15.7058 8.88459 16.4973 9.63136 17.0692C8.30624 17.6434 7.19973 18.6267 6.47386 19.8751C6.40802 19.9892 6.37337 20.1185 6.37338 20.2502C6.37338 20.3819 6.40805 20.5112 6.4739 20.6252C6.53975 20.7392 6.63445 20.8339 6.74849 20.8997C6.86252 20.9655 6.99188 21.0002 7.12355 21.0001H17.6235C17.7552 21.0002 17.8846 20.9655 17.9986 20.8997C18.1126 20.8339 18.2073 20.7392 18.2732 20.6252C18.339 20.5112 18.3737 20.3819 18.3737 20.2502C18.3737 20.1185 18.3391 19.9892 18.2732 19.8751C17.5458 18.6258 16.4372 17.6425 15.1101 17.0692H15.1035Z" fill="white" fill-opacity="0.6"/>
      </svg>
    </div>
  </Link>
  
  <Link href="/search" className="flex p-[4px] items-center">
    <div className="w-[24px] h-[24px]">
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
        <path d="M21.9242 20.2042L17.472 15.7501C18.8069 14.0106 19.4302 11.8284 19.2153 9.64619C19.0005 7.46401 17.9636 5.44527 16.315 3.99948C14.6665 2.55369 12.5297 1.7891 10.3381 1.86083C8.14658 1.93255 6.06437 2.83521 4.51388 4.3857C2.96339 5.9362 2.06073 8.01841 1.989 10.21C1.91728 12.4015 2.68186 14.5383 4.12765 16.1868C5.57345 17.8354 7.59219 18.8723 9.77436 19.0871C11.9565 19.302 14.1387 18.6788 15.8783 17.3439L20.3342 21.8007C20.4389 21.9054 20.5631 21.9884 20.6998 22.045C20.8366 22.1017 20.9831 22.1308 21.1311 22.1308C21.2791 22.1308 21.4256 22.1017 21.5624 22.045C21.6991 21.9884 21.8233 21.9054 21.928 21.8007C22.0326 21.6961 22.1156 21.5719 22.1723 21.4351C22.2289 21.2984 22.2581 21.1519 22.2581 21.0039C22.2581 20.8559 22.2289 20.7093 22.1723 20.5726C22.1156 20.4359 22.0326 20.3116 21.928 20.207L21.9242 20.2042ZM4.25329 10.5001C4.25329 9.23926 4.62718 8.00672 5.32767 6.95836C6.02816 5.90999 7.0238 5.09289 8.18868 4.61038C9.35356 4.12788 10.6354 4.00163 11.872 4.24761C13.1086 4.49359 14.2445 5.10075 15.1361 5.99231C16.0277 6.88387 16.6348 8.01979 16.8808 9.25642C17.1268 10.493 17.0005 11.7748 16.518 12.9397C16.0355 14.1046 15.2184 15.1002 14.17 15.8007C13.1217 16.5012 11.8891 16.8751 10.6283 16.8751C8.93807 16.8734 7.31757 16.2012 6.1224 15.006C4.92723 13.8108 4.25503 12.1903 4.25329 10.5001Z" fill="white" fill-opacity="0.6"/>
      </svg>
    </div>
  </Link>
</div>

  {/* Индикатор */}
  <div className="w-[139px] h-[5px] bg-white rounded-[100px] mx-auto mb-[8px]" />
</div>
      </div>

      
    </div>
  );
};

export default Dashboard;