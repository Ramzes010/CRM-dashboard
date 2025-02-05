"use client";

import React from "react";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Header from "../../components/header/Header";



ChartJS.register(ArcElement, Tooltip, Legend);
const standardBoxes = 120; // Количество стандартных коробок
const miniBoxes = 90;
const dashboard = () => {

  const data = {
    labels: ['Standard boxes', 'Mini boxes'],
    datasets: [
      {
        data: [standardBoxes, miniBoxes],
        backgroundColor: ['#54CFBA', '#E6EBCE'],
        hoverBackgroundColor: ['#45B29D', '#D6DAB2'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '80%', // для толщины "пончика"
    plugins: {
      legend: {
        display: false, // отключаем легенду, можно включить по необходимости
      },
    },
  };

  const showAlert = () => {
    alert("The button is muted. The page is being developed!");
  };

    return (
      <div>
        <Header/>
      <div className="main-container flex w-[1440px] pt-[72px] pr-[44px] pb-0 pl-[44px] flex-col gap-[120px] items-center flex-nowrap bg-[#003c46] rounded-tl-[24px] rounded-tr-[24px] rounded-br-none rounded-bl-none relative mx-auto my-0">
      <div className="flex flex-col gap-[56px] items-start self-stretch shrink-0 flex-nowrap relative">
        <div className="flex flex-col gap-[44px] items-center self-stretch shrink-0 flex-nowrap relative z-[1]">
          <span className="h-[60px] self-stretch shrink-0 basis-auto text-[56px] font-light leading-[60px] text-[#fff] relative text-center whitespace-nowrap z-[2]">
          Dashboard
          </span>
          <div className="flex w-[757px] gap-[16px] items-start shrink-0 flex-nowrap relative z-[3]">
          <div className="flex w-[561px] gap-[12px] justify-center items-start shrink-0 flex-wrap relative z-[4]">
  <button  onClick={showAlert} className="flex w-[114px] pt-[14px] pr-[24px] pb-[14px] pl-[24px] gap-[6px] justify-center items-center flex-nowrap bg-[#fff] rounded-full border-none relative z-[5] pointer hover:bg-[#f0f0f0] active:bg-[#e0e0e0] transition-all duration-300">
    <span className="h-[20px] shrink-0 basis-auto text-[16px] font-medium leading-[20px] text-[#003c46] relative text-left whitespace-nowrap z-[6]">
      Today
    </span>
  </button>
  <button  onClick={showAlert} className="flex w-[100px] pt-[14px] pr-[24px] pb-[14px] pl-[24px] gap-[6px] justify-center items-center flex-nowrap rounded-full border-solid border border-[rgba(255,255,255,0.12)] relative z-[7] pointer hover:bg-[rgba(255,255,255,0.08)] active:bg-[rgba(255,255,255,0.16)] transition-all duration-300">
    <span className="h-[20px] shrink-0 basis-auto text-[16px] font-medium leading-[20px] text-[#fff] relative text-left whitespace-nowrap z-[8]">
      7 days
    </span>
  </button>
  <button  onClick={showAlert} className="flex w-[111px] pt-[14px] pr-[24px] pb-[14px] pl-[24px] gap-[6px] justify-center items-center flex-nowrap rounded-full border-solid border border-[rgba(255,255,255,0.12)] relative z-[9] pointer hover:bg-[rgba(255,255,255,0.08)] active:bg-[rgba(255,255,255,0.16)] transition-all duration-300">
    <span className="h-[20px] shrink-0 basis-auto text-[16px] font-medium leading-[20px] text-[#fff] relative text-left whitespace-nowrap z-10">
      30 days
    </span>
  </button>
  <button  onClick={showAlert} className="flex w-[200px] pt-[14px] pr-[24px] pb-[14px] pl-[24px] gap-[6px] justify-center items-center flex-nowrap rounded-full border-solid border border-[rgba(255,255,255,0.12)] relative z-[11] pointer hover:bg-[rgba(255,255,255,0.08)] active:bg-[rgba(255,255,255,0.16)] transition-all duration-300">
    <span className="h-[20px] shrink-0 basis-auto text-[16px] font-medium leading-[20px] text-[#fff] relative text-left whitespace-nowrap z-[12]">
    Select a period
    </span>
    <div className="flex w-[16px] flex-col justify-center items-center shrink-0 flex-nowrap relative overflow-hidden z-[13]">
      <div className="w-[16px] h-[16px] shrink-0 bg-cover bg-no-repeat relative top-[.1vw] overflow-hidden z-[14] bg-[url('/images/calendar-icon.svg')]" />
    </div>
  </button>
</div>

            <div className="w-px self-stretch shrink-0  bg-cover bg-no-repeat relative z-[15]" />
            <button className="flex w-[163px] gap-[12px] justify-center items-start shrink-0 flex-wrap border-none relative z-[16] pointer">
              <div className="flex w-[163px] pt-[14px] pr-[24px] pb-[14px] pl-[24px] gap-[6px] justify-center items-center flex-nowrap bg-[#fff] rounded-full relative z-[17]">
                <span  onClick={showAlert} className="h-[20px] shrink-0 basis-auto  text-[16px] font-medium leading-[20px] text-[#003c46] relative text-left whitespace-nowrap z-[18]">
                All districtsы
                </span>
                <div className="flex w-[16px] flex-col justify-center items-center shrink-0 flex-nowrap relative overflow-hidden z-[19]">
                  <div className="w-[16px] h-[16px] shrink-0  bg-cover bg-no-repeat relative top-[.1vw] overflow-hidden z-20 bg-[url('/images/calendar2-icon.svg')]" />
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-[24px] items-start self-stretch shrink-0 flex-nowrap relative z-[21]">
          <span className="h-[28px] self-stretch shrink-0 basis-auto  text-[24px] font-medium leading-[28px] text-[#fff] relative text-left whitespace-nowrap z-[22]">
          The overview
          </span>
          <div className="flex gap-[12px] items-start self-stretch shrink-0 flex-nowrap relative z-[23]">
            <div className="flex w-[962px] gap-[12px] items-center shrink-0 flex-wrap relative z-[24]">
              <div className="flex w-[312px] pt-[16px] pr-[24px] pb-[24px] pl-[24px] flex-col gap-[32px] items-start flex-nowrap bg-[rgba(255,255,255,0.08)] rounded-[12px] relative z-[25]">
                <span className="h-[20px] self-stretch shrink-0 basis-auto  text-[15px] font-[460] leading-[20px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[26]">
                number of orders
                </span>
                <div className="flex flex-col gap-[12px] items-start self-stretch shrink-0 flex-nowrap relative z-[27]">
                  <span className="h-[44px] self-stretch shrink-0 basis-auto font-['NAMU'] text-[40px] font-light leading-[44px] text-[#fff] relative text-left whitespace-nowrap z-[28]">
                    425
                  </span>
                  <div className="flex gap-[4px] content-center justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[29]">
                    <div className="flex w-[14px] flex-col  justify-center items-center shrink-0 flex-nowrap relative overflow-hidden z-30">
                      <img src="./images/Greenwrapper.svg" alt="3"  className="mt-[.2vw]"/>
                    </div>
                    <span className="h-[20px] grow shrink-0 basis-auto  text-[14px] font-[450] leading-[20px] text-[#fff] relative text-left whitespace-nowrap z-[32]">
                    17 more orders than yesterday
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex w-[312px] pt-[16px] pr-[24px] pb-[24px] pl-[24px] flex-col gap-[32px] items-start flex-nowrap bg-[rgba(255,255,255,0.08)] rounded-[12px] relative z-[49]">
                <span className="h-[20px] self-stretch shrink-0 basis-auto  text-[15px] font-[460] leading-[20px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-50">
                average order acceptance time
                </span>
                <div className="flex flex-col gap-[12px] items-start self-stretch shrink-0 flex-nowrap relative z-[51]">
                  <span className="h-[44px] self-stretch shrink-0 basis-auto font-['NAMU'] text-[40px] font-light leading-[44px] text-[#fff] relative text-left whitespace-nowrap z-[52]">
                    5м
                  </span>
                  <div className="flex gap-[4px] justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[53]">
                    <div className="flex w-[14px] flex-col justify-center items-center shrink-0 flex-nowrap relative overflow-hidden z-[54]">
                    <img src="./images/Greenwrapper.svg" alt="3"  className="mt-[.2vw]"/>
                    </div>
                    <span className="h-[20px] grow shrink-0 basis-auto  text-[14px] font-[450] leading-[20px] text-[#fff] relative text-left whitespace-nowrap z-[56]">
                    2 min faster than yesterday
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex w-[312px] pt-[16px] pr-[24px] pb-[24px] pl-[24px] flex-col gap-[32px] items-start flex-nowrap bg-[rgba(255,255,255,0.08)] rounded-[12px] relative z-[33]">
                <span className="h-[20px] self-stretch shrink-0 basis-auto  text-[15px] font-[460] leading-[20px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[34]">
                income
                </span>
                <div className="flex flex-col gap-[12px] items-start self-stretch shrink-0 flex-nowrap relative z-[35]">
                  <div className="w-[264px] self-stretch shrink-0 font-['NAMU'] text-[40px] font-light leading-[44px] relative text-left whitespace-nowrap z-[36]">
                    <span className=" text-[40px] font-light leading-[44px] text-[rgba(255,255,255,0.6)] relative text-left">
                      $
                    </span>
                    <span className="font-['NAMU'] text-[40px] font-light leading-[44px] text-[#fff] relative text-left">
                      {" "}
                      763
                    </span>
                  </div>
                  <div className="flex gap-[4px] justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[37]">
                    <div className="flex w-[14px] flex-col justify-center items-center shrink-0 flex-nowrap relative overflow-hidden z-[38]">
                    <img src="./images/Greenwrapper.svg" alt="3"  className="mt-[.2vw]"/>
                    </div>
                    <span className="h-[20px] grow shrink-0 basis-auto  text-[14px] font-[450] leading-[20px] text-[#fff] relative text-left whitespace-nowrap z-40">
                    540 $ more than yesterday
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex w-[312px] pt-[16px] pr-[24px] pb-[24px] pl-[24px] flex-col gap-[32px] items-start flex-nowrap bg-[rgba(255,255,255,0.08)] rounded-[12px] relative z-[57]">
                <span className="h-[20px] self-stretch shrink-0 basis-auto  text-[15px] font-[460] leading-[20px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[58]">
                Average crafting time
                </span>
                <div className="flex flex-col gap-[12px] items-start self-stretch shrink-0 flex-nowrap relative z-[59]">
                  <span className="h-[44px] shrink-0 basis-auto font-['NAMU'] text-[40px] font-light leading-[44px] text-[#fff] relative text-left whitespace-nowrap z-[60]">
                    14м
                  </span>
                  <div className="flex gap-[4px] justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[61]">
                    <div className="flex w-[14px] flex-col justify-center items-center shrink-0 flex-nowrap relative overflow-hidden z-[62]">
                    <img src="./images/Greenwrapper.svg" alt="3"  className="mt-[.2vw]"/>
                    </div>
                    <span className="h-[20px] grow shrink-0 basis-auto  text-[14px] font-[450] leading-[20px] text-[#fff] relative text-left whitespace-nowrap z-[64]">
                    2 min faster than yesterday
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex w-[312px] pt-[16px] pr-[24px] pb-[24px] pl-[24px] flex-col gap-[32px] items-start flex-nowrap bg-[rgba(255,255,255,0.08)] rounded-[12px] relative z-[41]">
                <span className="h-[20px] self-stretch shrink-0 basis-auto  text-[15px] font-[460] leading-[20px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[42]">
                Average receipt
                </span>
                <div className="flex flex-col gap-[12px] items-start self-stretch shrink-0 flex-nowrap relative z-[43]">
                  <div className="w-[264px] self-stretch shrink-0 font-['NAMU'] text-[40px] font-light leading-[44px] relative text-left whitespace-nowrap z-[44]">
                    <span className=" text-[40px] font-light leading-[44px] text-[rgba(255,255,255,0.6)] relative text-left">
                      $
                    </span>
                    <span className="font-['NAMU'] text-[40px] font-light leading-[44px] text-[#fff] relative text-left">
                      {" "}
                      25
                    </span>
                  </div>
                  <div className="flex gap-[4px] justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[45]">
                    <div className="flex w-[14px] flex-col justify-center items-center shrink-0 flex-nowrap relative overflow-hidden z-[46]">
                    <img src="./images/Redwrapper.svg" alt="3"  className="mt-[0vw]"/>
                    </div>
                    <span className="h-[20px] grow shrink-0 basis-auto text-[14px] font-[450] leading-[20px] text-[#fff] relative text-left whitespace-nowrap z-[48]">
                    $3.5 less than yesterday
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex w-[312px] pt-[16px] pr-[24px] pb-[24px] pl-[24px] flex-col gap-[32px] items-start flex-nowrap bg-[rgba(255,255,255,0.08)] rounded-[12px] relative z-[65]">
                <span className="h-[20px] self-stretch shrink-0 basis-auto text-[15px] font-[460] leading-[20px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[66]">
                average delivery time
                </span>
                <div className="flex flex-col gap-[12px] items-start self-stretch shrink-0 flex-nowrap relative z-[67]">
                  <span className="h-[44px] self-stretch shrink-0 basis-auto font-['NAMU'] text-[40px] font-light leading-[44px] text-[#fff] relative text-left whitespace-nowrap z-[68]">
                    26м
                  </span>
                  <div className="flex gap-[4px] justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[69]">
                    <div className="flex w-[14px] flex-col justify-center items-center shrink-0 flex-nowrap relative overflow-hidden z-[70]">
                    <img src="./images/Greenwrapper.svg" alt="3"  className="mt-[.2vw]"/>
                    </div>
                    <span className="h-[20px] grow shrink-0 basis-auto  text-[14px] font-[450] leading-[20px] text-[#fff] relative text-left whitespace-nowrap z-[72]">
                    4 min faster than yesterday
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-[375px] pt-[16px] pr-[24px] pb-[24px] pl-[24px] flex-col justify-between items-center self-stretch shrink-0 flex-nowrap bg-[rgba(255,255,255,0.08)] rounded-[12px] relative z-[73]">
              <span className="h-[20px] self-stretch shrink-0 basis-auto  text-[15px] font-[460] leading-[20px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[74]">
              Box Sales
              </span>
              <div className="h-[187px] self-stretch shrink-0 relative z-[75]">
                <div className="w-[187px] h-full absolute top-0 left-1/2 translate-x-[-50%] translate-y-0 z-[76]">
                  <div className="w-[99.52%] h-[99.31%] bg-[length:100%_100%] bg-no-repeat absolute top-[0.34%] left-[0.24%] z-[77]" />
                  <div className="w-[99.52%] h-[99.31%] bg-[length:100%_100%] bg-no-repeat absolute top-[0.34%] left-[0.24%] z-[78]" />
                  <div className="w-[99.52%] h-[99.31%] bg-[length:100%_100%] bg-no-repeat absolute top-[0.34%] left-[0.24%] z-[79]" />
                  <div className="w-[12.83%] h-[12.83%] absolute top-[25.94%] left-[3.21%] overflow-hidden z-[80]">
                    <div className="w-[14.396px] h-[15.309px]  bg-cover bg-no-repeat relative z-[81] mt-[4.387px] mr-0 mb-0 ml-[5.367px]" />
                  </div>
                </div>
                

                {/*  */}
                <div style={{ width: '225px', margin: '0 auto', cursor: 'pointer', position: 'relative', bottom: "10px", left: '0px', zIndex: '100'}}>
      <Doughnut data={data} options={options} />
      <div
        style={{
          position: 'relative',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#fff',
          fontSize: '1.5rem',
        }}
      >
       
      </div>
    </div>
                {/*  */}

                <span className="flex h-[28px] justify-start items-start  text-[24px] font-medium leading-[28px] text-[#fff] absolute top-[calc(50%-14px)] left-[calc(50%-21.5px)] text-left whitespace-nowrap z-[88]">
                {standardBoxes + miniBoxes}
                </span>
                <button className="flex w-[34.56%] h-[62px] pt-[8px] pr-[12px] pb-[12px] pl-[12px] gap-[2px] justify-center items-start flex-nowrap border-none absolute top-1/2 left-[7.34%] translate-x-0 translate-y-[-3.23%] z-[82] pointer">
                  <div className="shrink-0 bg-cover bg-no-repeat absolute top-0 bottom-0 left-0 right-0 z-[87]" />
                  <div className="flex flex-col gap-[8px] justify-center items-start grow shrink-0 basis-0 flex-nowrap relative z-[83]">
                    <div className="flex flex-col gap-[2px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[84]">
                      
                    </div>
                  </div>
                </button>
              </div>
              <div className="flex w-[293px] gap-[8px] justify-center items-start shrink-0 flex-nowrap relative overflow-hidden z-[89]">
                <div className="flex w-[83px] gap-[2px] items-center shrink-0 flex-nowrap relative overflow-hidden z-[90]">
                  <div className="w-[16px] h-[16px] shrink-0 relative z-[91]">
                    <div className="w-px h-px bg-cover bg-no-repeat relative z-[92] mt-[8px] mr-0 mb-0 ml-[8px]" />
                  </div>
                  <span className="h-[20px] shrink-0 basis-auto  text-[14px] font-[450] leading-[20px] text-[#fff] relative text-left whitespace-nowrap z-[93]">
                  Standard
                  </span>
                </div>
                <div className="flex w-[82px] gap-[2px] items-center shrink-0 flex-nowrap relative overflow-hidden z-[94]">
                  <div className="w-[16px] h-[16px] shrink-0 relative z-[95]">
                    <div className="w-px h-px bg-cover bg-no-repeat relative z-[96] mt-[8px] mr-0 mb-0 ml-[8px]" />
                  </div>
                  <span className="h-[20px] shrink-0 basis-auto  text-[14px] font-[450] leading-[20px] text-[#fff] relative text-left whitespace-nowrap z-[97]">
                  Premium
                  </span>
                </div>
                <div className="flex w-[112px] gap-[2px] items-center shrink-0 flex-nowrap relative overflow-hidden z-[98]">
                  <div className="w-[16px] h-[16px] shrink-0 relative z-[99]">
                    <div className="w-px h-px bg-cover bg-no-repeat relative z-[100] mt-[8px] mr-0 mb-0 ml-[8px]" />
                  </div>
                  <span className="h-[20px] shrink-0 basis-auto  text-[14px] font-[450] leading-[20px] text-[#fff] relative text-left whitespace-nowrap z-[101]">
                  Mini Picheny
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[24px] items-start self-stretch shrink-0 flex-nowrap relative z-[102]">
          <span className="h-[28px] self-stretch shrink-0 basis-auto  text-[24px] font-medium leading-[28px] text-[#fff] relative text-left whitespace-nowrap z-[103]">
          Popular tastes
          </span>
          <div className="flex w-[1352px] h-[560px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] flex-col items-start shrink-0 flex-nowrap relative z-[104]">
            <div className="flex flex-col gap-[-2px] items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[105]">
              <div className="flex items-center self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[106]">
                <div className="flex w-[30px] pt-0 pr-[4px] pb-0 pl-[4px] flex-col justify-between items-end self-stretch shrink-0 flex-nowrap relative z-[107]">
                  <span className="h-[16px] shrink-0 basis-auto  text-[12px] font-[460] leading-[16px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[108]">
                    100
                  </span>
                  <span className="h-[16px] shrink-0 basis-auto text-[12px] font-[460] leading-[16px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[109]">
                    90
                  </span>
                  <span className="h-[16px] shrink-0 basis-auto text-[12px] font-[460] leading-[16px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[110]">
                    80
                  </span>
                  <span className="h-[16px] shrink-0 basis-auto text-[12px] font-[460] leading-[16px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[111]">
                    70
                  </span>
                  <span className="h-[16px] shrink-0 basis-auto text-[12px] font-[460] leading-[16px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[112]">
                    60
                  </span>
                  <span className="h-[16px] shrink-0 basis-auto text-[12px] font-[460] leading-[16px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[113]">
                    50
                  </span>
                  <span className="h-[16px] shrink-0 basis-auto text-[12px] font-[460] leading-[16px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[114]">
                    40
                  </span>
                  <span className="h-[16px] shrink-0 basis-auto text-[12px] font-[460] leading-[16px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[115]">
                    30
                  </span>
                  <span className="h-[16px] shrink-0 basis-auto text-[12px] font-[460] leading-[16px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[116]">
                    20
                  </span>
                  <span className="h-[16px] shrink-0 basis-auto text-[12px] font-[460] leading-[16px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[117]">
                    10
                  </span>
                  <span className="h-[16px] shrink-0 basis-auto text-[12px] font-[460] leading-[16px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[118]">
                    0
                  </span>
                </div>
                <div className="self-stretch grow shrink-0 basis-0 relative z-[119]"
                 style={{
                    backgroundImage: `url('/images/dashboard_background.svg')`, // Путь к SVG-файлу
                    backgroundSize: 'cover', // Покрытие всего блока изображением
                    backgroundRepeat: 'no-repeat', // Запрет на повторение
                    backgroundPosition: 'center', // Центрирование изображения
                  }}>
                  <div className="flex w-[1306px] h-[509px] items-start flex-nowrap relative z-[142] mt-[6px] mr-0 mb-0 ml-0">
                    <div className="flex pt-0 pr-[33px] pb-0 pl-[33px] gap-[2px] items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[143]">
                      <div className="self-stretch grow shrink-0 basis-0 relative z-[144]">
                        <div className="w-[97px] h-[407.2px] relative z-[145] mt-[101.8px] mr-0 mb-0 ml-0">
                          <div className="w-[97px] h-[407px] bg-[#53cfba] opacity-80 relative z-[146] mt-0 mr-0 mb-0 ml-0" />
                        </div>
                      </div>
                    </div>
                    <div className="flex pt-0 pr-[33px] pb-0 pl-[33px] gap-[2px] items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[147]">
                      <div className="self-stretch grow shrink-0 basis-0 relative z-[148]">
                        <div className="w-[97px] h-[509px] relative z-[149] mt-0 mr-0 mb-0 ml-0">
                          <div className="bg-[#53cfba] opacity-80 absolute top-0 bottom-0 left-0 right-0 z-[150]" />
                        </div>
                      </div>
                    </div>
                    <div className="flex pt-0 pr-[33px] pb-0 pl-[33px] gap-[2px] items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[151]">
                      <div className="self-stretch grow shrink-0 basis-0 relative z-[152]">
                        <div className="w-[97px] h-[50.9px]  bg-cover bg-no-repeat relative z-[153] mt-[458.1px] mr-0 mb-0 ml-0" />
                      </div>
                    </div>
                    <div className="flex pt-0 pr-[33px] pb-0 pl-[33px] gap-[2px] items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[154]">
                      <div className="self-stretch grow shrink-0 basis-0 relative z-[155]">
                        <div className="w-[97px] h-[453.01px] relative z-[156] mt-[55.99px] mr-0 mb-0 ml-0">
                          <div className="bg-[#53cfba] opacity-80 absolute top-0 bottom-[-0.29px] left-0 right-0 z-[157]" />
                        </div>
                      </div>
                    </div>
                    <div className="flex pt-0 pr-[33px] pb-0 pl-[33px] gap-[2px] items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[158]">
                      <div className="self-stretch grow shrink-0 basis-0 relative z-[159]">
                        <div className="w-[97px] h-[509px] relative z-[160] mt-0 mr-0 mb-0 ml-0">
                          <div className="bg-[#53cfba] opacity-80 absolute top-0 bottom-0 left-0 right-0 z-[161]" />
                        </div>
                      </div>
                    </div>
                    <div className="flex pt-0 pr-[33px] pb-0 pl-[33px] gap-[2px] items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[162]">
                      <div className="self-stretch grow shrink-0 basis-0 relative z-[163]">
                        <div className="w-[97px] h-[96.71px]  bg-cover bg-no-repeat relative z-[164] mt-[412.29px] mr-0 mb-0 ml-0" />
                      </div>
                    </div>
                    <div className="flex pt-0 pr-[33px] pb-0 pl-[33px] gap-[2px] items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[165]">
                      <div className="self-stretch grow shrink-0 basis-0 relative z-[166]">
                        <div className="w-[97px] h-[50.9px]  bg-cover bg-no-repeat relative z-[167] mt-[458.1px] mr-0 mb-0 ml-0" />
                      </div>
                    </div>
                    <div className="flex pt-0 pr-[33px] pb-0 pl-[33px] gap-[2px] items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[168]">
                      <div className="self-stretch grow shrink-0 basis-0 relative z-[169]">
                        <div className="w-[97px] h-[493.73px] relative z-[170] mt-[15.27px] mr-0 mb-0 ml-0">
                          <div className="bg-[#53cfba] opacity-80 absolute top-0 bottom-[-0.17px] left-0 right-0 z-[171]" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex pt-[6px] pr-px pb-[6px] pl-px flex-col justify-between items-start flex-nowrap absolute top-0 bottom-0 left-0 right-0 z-[120]">
                    <div className="h-px self-stretch shrink-0 bg-cover bg-no-repeat relative z-[121]" />
                    <div className="h-px self-stretch shrink-0 bg-cover bg-no-repeat relative z-[122]" />
                    <div className="h-px self-stretch shrink-0 bg-cover bg-no-repeat relative z-[123]" />
                    <div className="h-px self-stretch shrink-0 bg-cover bg-no-repeat relative z-[124]" />
                    <div className="h-px self-stretch shrink-0 bg-cover bg-no-repeat relative z-[125]" />
                    <div className="h-px self-stretch shrink-0 bg-cover bg-no-repeat relative z-[126]" />
                    <div className="h-px self-stretch shrink-0 bg-cover bg-no-repeat relative z-[127]" />
                    <div className="h-px self-stretch shrink-0 bg-cover bg-no-repeat relative z-[128]" />
                    <div className="h-px self-stretch shrink-0 bg-cover bg-no-repeat relative z-[129]" />
                    <div className="h-px self-stretch shrink-0 bg-cover bg-no-repeat relative z-[130]" />
                    <div className="h-px self-stretch shrink-0 bg-cover bg-no-repeat relative z-[131]" />
                  </div>
                  <div className="flex pt-[6px] pr-px pb-[6px] pl-px justify-between items-start flex-nowrap absolute top-0 bottom-0 left-0 right-0 z-[132]">
                    <div className="w-px self-stretch shrink-0  bg-cover bg-no-repeat relative z-[133]" />
                    <div className="w-px self-stretch shrink-0  bg-cover bg-no-repeat relative z-[134]" />
                    <div className="w-px self-stretch shrink-0  bg-cover bg-no-repeat relative z-[135]" />
                    <div className="w-px self-stretch shrink-0  bg-cover bg-no-repeat relative z-[136]" />
                    <div className="w-px self-stretch shrink-0  bg-cover bg-no-repeat relative z-[137]" />
                    <div className="w-px self-stretch shrink-0  bg-cover bg-no-repeat relative z-[138]" />
                    <div className="w-px self-stretch shrink-0  bg-cover bg-no-repeat relative z-[139]" />
                    <div className="w-px self-stretch shrink-0  bg-cover bg-no-repeat relative z-[140]" />
                    <div className="w-px self-stretch shrink-0  bg-cover bg-no-repeat relative z-[141]" />
                  </div>
                </div>
              </div>
              <div className="flex pt-0 pr-0 pb-[8px] pl-[29px] items-start self-stretch shrink-0 flex-nowrap relative z-[172]">
                <div className="flex flex-col items-end grow shrink-0 basis-0 flex-nowrap relative z-[173]">
                  <span className="h-[16px] self-stretch shrink-0 basis-auto text-[12px] font-[460] leading-[16px] text-[#fff] tracking-[0.2px] relative text-center uppercase whitespace-nowrap z-[174]">
                  Edem
                  </span>
                </div>
                <div className="flex flex-col items-end grow shrink-0 basis-0 flex-nowrap relative z-[175]">
                  <span className="h-[16px] self-stretch shrink-0 basis-auto text-[12px] font-[460] leading-[16px] text-[#fff] tracking-[0.2px] relative text-center uppercase whitespace-nowrap z-[176]">
                  The Milky Way
                  </span>
                </div>
                <div className="flex flex-col items-end grow shrink-0 basis-0 flex-nowrap relative z-[177]">
                  <span className="h-[16px] self-stretch shrink-0 basis-auto text-[12px] font-[460] leading-[16px] text-[#fff] tracking-[0.2px] relative text-center uppercase whitespace-nowrap z-[178]">
                  Shock
                  </span>
                </div>
                <div className="flex flex-col items-end grow shrink-0 basis-0 flex-nowrap relative z-[179]">
                  <span className="h-[16px] self-stretch shrink-0 basis-auto text-[12px] font-[460] leading-[16px] text-[#fff] tracking-[0.2px] relative text-center uppercase whitespace-nowrap z-[180]">
                  Dinosaur
                  </span>
                </div>
                <div className="flex flex-col items-end grow shrink-0 basis-0 flex-nowrap relative z-[181]">
                  <span className="h-[16px] self-stretch shrink-0 basis-auto text-[12px] font-[460] leading-[16px] text-[#fff] tracking-[0.2px] relative text-center uppercase whitespace-nowrap z-[182]">
                  Dune
                  </span>
                </div>
                <div className="flex flex-col items-end grow shrink-0 basis-0 flex-nowrap relative z-[183]">
                  <span className="h-[16px] self-stretch shrink-0 basis-auto text-[12px] font-[460] leading-[16px] text-[#fff] tracking-[0.2px] relative text-center uppercase whitespace-nowrap z-[184]">
                  Red Sunset                  </span>
                </div>
                <div className="flex flex-col items-end grow shrink-0 basis-0 flex-nowrap relative z-[185]">
                  <span className="h-[16px] self-stretch shrink-0 basis-auto text-[12px] font-[460] leading-[16px] text-[#fff] tracking-[0.2px] relative text-center uppercase whitespace-nowrap z-[186]">
                  Strawberry Cloud
                  </span>
                </div>
                <div className="flex flex-col items-end grow shrink-0 basis-0 flex-nowrap relative z-[187]">
                  <span className="h-[16px] self-stretch shrink-0 basis-auto text-[12px] font-[460] leading-[16px] text-[#fff] tracking-[0.2px] relative text-center uppercase whitespace-nowrap z-[188]">
                    Picheni Signature
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button className="flex w-[135px] h-[62px] pt-[8px] pr-[12px] pb-[12px] pl-[12px] gap-[2px] justify-center items-start shrink-0 flex-nowrap border-none absolute top-[162px] left-[327px] z-[189] pointer">
            <div className="shrink-0  bg-cover bg-no-repeat absolute top-0 bottom-0 left-0 right-0 z-[194]" />
           
          </button>
          <div className="w-[24px] h-[24px] shrink-0 absolute top-[184px] left-[295px] overflow-hidden z-[195]">
            <div className="w-[14.396px] h-[15.309px] bg-cover bg-no-repeat relative z-[196] mt-[4.387px] mr-0 mb-0 ml-[5.367px]" />
          </div>
        </div>
        <div className="flex flex-col gap-[24px] items-start self-stretch shrink-0 flex-nowrap relative z-[197]">
          <div className="flex flex-col gap-[24px] items-start self-stretch shrink-0 flex-nowrap relative z-[198]">
            <div className="flex justify-between items-center self-stretch shrink-0 flex-nowrap relative z-[199]">
              <span className="h-[28px] grow shrink-0 basis-auto  text-[24px] font-medium leading-[28px] text-[#fff] relative text-left whitespace-nowrap z-[200]">
              Team performance
              </span>
            </div>
            <div className="flex gap-[8px] items-center self-stretch shrink-0 flex-wrap relative z-[201]">
              <button  className="flex w-[61px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[6px] justify-center items-center flex-nowrap bg-[#fff] rounded-full border-none relative z-[202] pointer">
                <span className="h-[20px] shrink-0 basis-auto  text-[16px] font-medium leading-[20px] text-[#003c46] relative text-left whitespace-nowrap z-[203]">
                  All
                </span>
              </button>
              <button  onClick={showAlert} className="flex w-[121px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[6px] justify-center items-center flex-nowrap rounded-full border-solid border border-[rgba(255,255,255,0.12)] relative z-[204] pointer">
                <span className="h-[20px]  shrink-0 basis-auto  text-[16px] font-medium leading-[20px] text-[#fff] relative text-left whitespace-nowrap z-[205]">
                Pastry chefs
                </span>
              </button>
              <button  onClick={showAlert} className="flex w-[102px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[6px] justify-center items-center flex-nowrap rounded-full border-solid border border-[rgba(255,255,255,0.12)] relative z-[206] pointer">
                <span  onClick={showAlert} className="h-[20px] shrink-0 basis-auto  text-[16px] font-medium leading-[20px] text-[#fff] relative text-left whitespace-nowrap z-[207]">
                Couriers
                </span>
              </button>
            </div>
          </div>
          <div className="main-container flex w-[1352px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] flex-col gap-[4px] items-start flex-nowrap bg-[rgba(255,255,255,0.08)] rounded-[12px] relative mx-auto my-0">
      <div className="flex pt-[4px] pr-[12px] pb-[4px] pl-[12px] gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative">
        <span className="h-[20px] grow shrink-0 basis-autoS text-[15px] font-[460] leading-[20px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[1]">
        District
        </span>
        <span className="h-[20px] grow shrink-0 basis-autoS text-[15px] font-[460] leading-[20px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[2]">
          Name
        </span>
        <span className="h-[20px] grow shrink-0 basis-autoS text-[15px] font-[460] leading-[20px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[3]">
          Role
        </span>
        <span className="h-[20px] grow shrink-0 basis-autoS text-[15px] font-[460] leading-[20px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase overflow-hidden whitespace-nowrap z-[4]">
        Number of orders
        </span>
        <span className="h-[20px]  shrink-0 basis-autoS text-[15px] font-[460] leading-[20px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[5]">
        Average lead time
        </span>
        <div className="w-[120px] h-[20px] shrink-0 relative overflow-hidden z-[6]" />
      </div>
      <div className="flex pt-[12px] pr-[12px] pb-[12px] pl-[12px] gap-[16px] items-center shrink-0 flex-nowrap relative z-[7]">
        <span className="h-[28px] mr-[40px] grow shrink-0 basis-autoS text-[19px] font-[450] leading-[28px] text-[#fff] relative text-left overflow-hidden whitespace-nowrap z-[8]">
        Baysangurovsky
        </span>
        <div className="flex gap-[12px] justify-center items-center grow shrink-0 basis-0 flex-nowrap relative z-[9]">
          <div className="w-[32px] h-[32px] shrink-0 rounded-[98.4px] relative overflow-hidden z-10">
            <div className="w-[32px] h-[32px] bg-[url(/images/Avatar.svg)] bg-[length:100%_100%] bg-no-repeat relative z-[11] mt-0 mr-0 mb-0 ml-0" />
          </div>
          <span className="h-[28px] mr-[50px] grow shrink-0 basis-autoS text-[19px] font-[450] leading-[28px] text-[#fff] relative text-left overflow-hidden whitespace-nowrap z-[12]">
          Madina R
          </span>
        </div>
        <span className="h-[28px] mr-[100px] grow shrink-0 basis-autoS text-[19px] font-[450] leading-[28px] text-[#fff] relative text-left overflow-hidden whitespace-nowrap z-[13]">
        Confectioner
        </span>
        <span className="h-[28px] mr-[270px] grow shrink-0 basis-autoS text-[19px] font-[450] leading-[28px] text-[#fff] relative text-left overflow-hidden whitespace-nowrap z-[14]">
          33
        </span>
        <span className="h-[28px] mr-[185px] grow shrink-0 basis-autoS text-[19px] font-[450] leading-[28px] text-[#fff] relative text-left overflow-hidden whitespace-nowrap z-[15]">
          24м
        </span>
        <div className="flex w-[120px] gap-[8px] justify-end items-center shrink-0 flex-nowrap relative z-[16]">
          <div className=" cursor-pointer flex w-[44px] pt-[12px] pr-[12px] pb-[12px] pl-[12px] justify-center items-center shrink-0 flex-nowrap rounded-[8px] border-solid border border-[rgba(255,255,255,0.12)] relative overflow-hidden z-[17]">
            <div className="flex w-[20px] flex-col justify-center items-center shrink-0 flex-nowrap relative overflow-hidden z-[18]">
              <div className="w-[20px] h-[20px] shrink-0 bg-[url(/images/IconWrapper3.svg)] bg-cover bg-no-repeat relative overflow-hidden z-[19]" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex pt-[12px] pr-[12px] pb-[12px] pl-[12px] gap-[16px] items-center  shrink-0 flex-nowrap relative z-20">
        <span className="h-[28px] mr-[40px] grow shrink-0 basis-autoS text-[19px] font-[450] leading-[28px] text-[#fff] relative text-left overflow-hidden whitespace-nowrap z-[21]">
        Baysangurovsky
        </span>
        <div className="flex gap-[12px] justify-center items-center grow shrink-0 basis-0 flex-nowrap relative z-[22]">
          <div className="w-[32px] h-[32px] shrink-0 rounded-[98.4px] relative overflow-hidden z-[23]">
            <div className="w-[32px] h-[32px] bg-[url(/images/Avatar.svg)] bg-[length:100%_100%] bg-no-repeat relative z-[24] mt-0 mr-0 mb-0 ml-0" />
          </div>
          <span className="h-[28px] mr-[50px] grow shrink-0 basis-autoS text-[19px] font-[450] leading-[28px] text-[#fff] relative text-left overflow-hidden whitespace-nowrap z-[25]">
          Madina R
          </span>
        </div>
        <span className="h-[28px] mr-[100px] grow shrink-0 basis-autoS text-[19px] font-[450] leading-[28px] text-[#fff] relative text-left overflow-hidden whitespace-nowrap z-[26]">
        Confectioner
        </span>
        <span className="h-[28px] mr-[270px] grow shrink-0 basis-autoS text-[19px] font-[450] leading-[28px] text-[#fff] relative text-left overflow-hidden whitespace-nowrap z-[27]">
          33
        </span>
        <span className="h-[28px] mr-[185px] grow shrink-0 basis-autoS text-[19px] font-[450] leading-[28px] text-[#fff] relative text-left overflow-hidden whitespace-nowrap z-[28]">
          24м
        </span>
        <div className="flex w-[120px] gap-[8px] justify-end items-center shrink-0 flex-nowrap relative z-[29]">
          <div className=" cursor-pointer flex w-[44px] pt-[12px] pr-[12px] pb-[12px] pl-[12px] justify-center items-center shrink-0 flex-nowrap rounded-[8px] border-solid border border-[rgba(255,255,255,0.12)] relative overflow-hidden z-30">
            <div className=" flex w-[20px] flex-col justify-center items-center shrink-0 flex-nowrap relative overflow-hidden z-[31]">
              <div className="w-[20px] h-[20px] shrink-0  bg-[url(/images/IconWrapper3.svg)] bg-cover bg-no-repeat relative overflow-hidden z-[32]" />
            </div>
          </div>
        </div>
      </div>
    </div>
          <div className="flex pt-[8px] pr-0 pb-[8px] pl-0 flex-col gap-[10px] items-start self-stretch shrink-0 flex-nowrap relative z-[346]">
            <div className="flex w-[192px] gap-[8px] items-center shrink-0 flex-nowrap relative z-[347]">
              <button  onClick={showAlert} className="flex w-[32px] h-[32px] pt-[8px] pr-[4px] pb-[8px] pl-[4px] flex-col justify-center items-center shrink-0 flex-nowrap bg-[#fff] rounded-full border-none relative z-[348] pointer">
                <span className="h-[20px] self-stretch shrink-0 basis-auto text-[16px] font-medium leading-[20px] text-[#003c46] relative text-center whitespace-nowrap z-[349]">
                  1
                </span>
              </button>
              <button  onClick={showAlert} className="flex w-[32px] h-[32px] pt-[8px] pr-[4px] pb-[8px] pl-[4px] flex-col gap-[10px] justify-center items-center shrink-0 flex-nowrap rounded-full border-solid border border-[rgba(255,255,255,0.12)] relative z-[350] pointer">
                <span className="h-[20px] self-stretch shrink-0 basis-auto text-[16px] font-medium leading-[20px] text-[#fff] relative text-center whitespace-nowrap z-[351]">
                  2
                </span>
              </button>
              <div  onClick={showAlert} className="flex w-[32px] h-[32px] pt-[8px] pr-[4px] pb-[8px] pl-[4px] flex-col gap-[10px] justify-center items-center shrink-0 flex-nowrap rounded-full border-solid border border-[rgba(255,255,255,0.12)] relative z-[352]">
                <span className="h-[20px] self-stretch shrink-0 basis-auto text-[16px] font-medium leading-[20px] text-[#fff] relative text-center whitespace-nowrap z-[353]">
                  3
                </span>
              </div>
              <div  onClick={showAlert} className="flex w-[32px] h-[32px] pt-[8px] pr-[4px] pb-[8px] pl-[4px] flex-col gap-[10px] justify-center items-center shrink-0 flex-nowrap rounded-full border-solid border border-[rgba(255,255,255,0.12)] relative z-[354]">
                <span className="h-[20px] self-stretch shrink-0 basis-auto text-[16px] font-medium leading-[20px] text-[#fff] relative text-center whitespace-nowrap z-[355]">
                  4
                </span>
              </div>
              <div  onClick={showAlert} className="flex w-[32px] h-[32px] pt-[8px] pr-[4px] pb-[8px] pl-[4px] flex-col gap-[10px] justify-center items-center shrink-0 flex-nowrap rounded-full border-solid border border-[rgba(255,255,255,0.12)] relative z-[356]">
                <span className="h-[20px] self-stretch shrink-0 basis-auto text-[16px] font-medium leading-[20px] text-[#fff] relative text-center whitespace-nowrap z-[357]">
                  5
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex pt-[20px] pr-0 pb-[20px] pl-0 justify-between items-center self-stretch shrink-0 flex-nowrap rounded-tl-none rounded-tr-none rounded-br-[12px] rounded-bl-[12px] relative z-[358]">
        <div className="flex w-[316px] gap-[16px] items-center shrink-0 flex-nowrap relative z-[359]">
          <span  onClick={showAlert} className="h-[16px] shrink-0 basis-auto text-[12px] font-[460] leading-[16px] text-[rgba(255,255,255,0.45)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[360]">
            Picheni © 2024
          </span>
          <div className="w-px self-stretch shrink-0 bg- bg-cover bg-no-repeat relative z-[361]" />
          <span  onClick={showAlert} className="h-[16px] shrink-0 basis-auto text-[12px] font-[460] leading-[16px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[362]">
            terms
          </span>
          <span  onClick={showAlert} className="h-[16px] shrink-0 basis-auto text-[12px] font-[460] leading-[16px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[363]">
            privacy
          </span>
          <span  onClick={showAlert} className="h-[16px] shrink-0 basis-auto text-[12px] font-[460] leading-[16px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[364]">
            help
          </span>
        </div>
        <div className="flex w-[76px] gap-[12px] items-start shrink-0 flex-nowrap relative z-[365]">
          <div className="flex w-[32px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] justify-center items-center shrink-0 flex-nowrap bg-[rgba(255,255,255,0.12)] rounded-[8px] relative overflow-hidden z-[366]">
            <div className="cursor-pointer flex w-[16px] flex-col justify-center items-center shrink-0 flex-nowrap relative overflow-hidden z-[367]">
              <div className="w-[16px] h-[16px] shrink-0 bg-[url(/images/IconInstaAB.svg)]  bg-cover bg-no-repeat relative overflow-hidden z-[368]" />
            </div>
          </div>
          <div className="flex w-[32px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] justify-center items-center shrink-0 flex-nowrap bg-[rgba(255,255,255,0.12)] rounded-[8px] relative overflow-hidden z-[369]">
            <div className=" cursor-pointer flex w-[16px] flex-col justify-center items-center shrink-0 flex-nowrap relative overflow-hidden z-[370]">
              <div className="w-[16px] h-[16px] shrink-0 bg-[url(/images/UnionTele.svg)]  bg-cover bg-no-repeat relative overflow-hidden z-[371]" />
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    );
  };


  export default dashboard;