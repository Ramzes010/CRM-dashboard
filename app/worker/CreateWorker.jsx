import React from "react";

export default function Main() {
  return (
    <div className="main-container flex w-[1440px] pt-[72px] pr-[44px] pb-0 pl-[44px] flex-col gap-[120px] items-center flex-nowrap bg-[#003c46] rounded-tl-[24px] rounded-tr-[24px] rounded-br-none rounded-bl-none relative mx-auto my-0">
      <div className="flex gap-[178px] items-start self-stretch shrink-0 flex-nowrap relative">
        <div className="flex w-[512px] gap-[96px] items-start shrink-0 flex-nowrap relative z-[1]">
          <div className="flex w-[44px] pt-[12px] pr-[12px] pb-[12px] pl-[12px] justify-center items-center shrink-0 flex-nowrap rounded-[8px] border-solid border border-[rgba(255,255,255,0.12)] relative overflow-hidden z-[2]">
            <div className="flex w-[20px] flex-col justify-center items-center shrink-0 flex-nowrap relative overflow-hidden z-[3]">
              <div className="w-[20px] h-[20px] shrink-0 bg-[url(/images/IconButton.svg)] bg-cover bg-no-repeat relative overflow-hidden z-[4]" />
            </div>
          </div>
          <span className="flex w-[372px] h-[120px] justify-start items-start shrink-0 font-['NAMU'] text-[56px] font-light leading-[60px] text-[#fff] relative text-left z-[5]">
            Создание работника
          </span>
        </div>
        <div className="flex w-[580px] flex-col gap-[40px] items-start shrink-0 flex-nowrap relative z-[6]">
          <div className="flex flex-col gap-[20px] items-start self-stretch shrink-0 flex-nowrap relative z-[7]">
            <span className="h-[28px] self-stretch shrink-0 basis-auto font-['Golos_Text'] text-[24px] font-medium leading-[28px] text-[#fff] relative text-left whitespace-nowrap z-[8]">
              Роль
            </span>
            <div className="flex gap-[12px] items-start self-stretch shrink-0 flex-wrap relative z-[9]">
              <button className="flex w-[125px] pt-[14px] pr-[24px] pb-[14px] pl-[24px] gap-[6px] justify-center items-center flex-nowrap bg-[#fff] rounded-full border-none relative z-10 pointer">
                <span className="h-[20px] shrink-0 basis-auto font-['Golos_Text'] text-[16px] font-medium leading-[20px] text-[#003c46] relative text-left whitespace-nowrap z-[11]">
                  Кондитер
                </span>
              </button>
              <button className="flex w-[106px] pt-[14px] pr-[24px] pb-[14px] pl-[24px] gap-[6px] justify-center items-center flex-nowrap rounded-full border-solid border border-[rgba(255,255,255,0.12)] relative z-[12] pointer">
                <span className="h-[20px] shrink-0 basis-auto font-['Golos_Text'] text-[16px] font-medium leading-[20px] text-[#fff] relative text-left whitespace-nowrap z-[13]">
                  Курьер
                </span>
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-[20px] items-start self-stretch shrink-0 flex-nowrap relative z-[14]">
            <span className="h-[28px] self-stretch shrink-0 basis-auto font-['Golos_Text'] text-[24px] font-medium leading-[28px] text-[#fff] relative text-left whitespace-nowrap z-[15]">
              Район работы
            </span>
            <div className="flex gap-[12px] items-start self-stretch shrink-0 flex-wrap relative z-[16]">
              <button className="flex w-[213px] pt-[14px] pr-[24px] pb-[14px] pl-[24px] gap-[6px] justify-center items-center flex-nowrap bg-[#fff] rounded-full border-none relative z-[17] pointer">
                <span className="h-[20px] shrink-0 basis-auto font-['Golos_Text'] text-[16px] font-medium leading-[20px] text-[#003c46] relative text-left whitespace-nowrap z-[18]">
                  Шейх Мансуровский
                </span>
              </button>
              <button className="flex w-[189px] pt-[14px] pr-[24px] pb-[14px] pl-[24px] gap-[6px] justify-center items-center flex-nowrap rounded-full border-solid border border-[rgba(255,255,255,0.12)] relative z-[19] pointer">
                <span className="h-[20px] shrink-0 basis-auto font-['Golos_Text'] text-[16px] font-medium leading-[20px] text-[#fff] relative text-left whitespace-nowrap z-20">
                  Басайнгуровский
                </span>
              </button>
              <button className="flex w-[153px] pt-[14px] pr-[24px] pb-[14px] pl-[24px] gap-[6px] justify-center items-center flex-nowrap rounded-full border-solid border border-[rgba(255,255,255,0.12)] relative z-[21] pointer">
                <span className="h-[20px] shrink-0 basis-auto font-['Golos_Text'] text-[16px] font-medium leading-[20px] text-[#fff] relative text-left whitespace-nowrap z-[22]">
                  Ахматовский
                </span>
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-[20px] items-start self-stretch shrink-0 flex-nowrap relative z-[23]">
            <span className="h-[28px] self-stretch shrink-0 basis-auto font-['Golos_Text'] text-[24px] font-medium leading-[28px] text-[#fff] relative text-left whitespace-nowrap z-[24]">
              Основная информация
            </span>
            <div className="flex flex-col gap-[-1px] items-start self-stretch shrink-0 flex-nowrap rounded-[12px] border-solid border border-[#1f535c] relative overflow-hidden z-[25]">
              <div className="flex pt-[16px] pr-[24px] pb-[20px] pl-[24px] gap-[12px] items-center self-stretch shrink-0 flex-nowrap border-solid border-t border-t-[#1f535c] relative overflow-hidden z-[26]">
                <div className="flex flex-col gap-[8px] items-start grow shrink-0 basis-0 flex-nowrap relative z-[27]">
                  <span className="h-[20px] shrink-0 basis-auto font-['Golos_Text'] text-[15px] font-[460] leading-[20px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[28]">
                    Имя работника
                  </span>
                  <div className="flex gap-[12px] items-center self-stretch shrink-0 flex-nowrap rounded-[4px] relative z-[29]">
                    <div className="flex w-[138px] items-center shrink-0 flex-nowrap relative z-30">
                      <span className="h-[24px] shrink-0 basis-auto font-['Golos_Text'] text-[22px] font-[450] leading-[24px] text-[rgba(255,255,255,0.6)] relative text-left whitespace-nowrap z-[31]">
                        Введите имя
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex w-[24px] h-[24px] p-0 gap-[12px] items-center shrink-0 flex-nowrap relative z-[32]" />
              </div>
              <div className="flex pt-[16px] pr-[24px] pb-[20px] pl-[24px] gap-[12px] items-center self-stretch shrink-0 flex-nowrap border-solid border-t border-t-[#1f535c] relative overflow-hidden z-[33]">
                <div className="flex flex-col gap-[8px] items-start grow shrink-0 basis-0 flex-nowrap relative z-[34]">
                  <span className="h-[20px] shrink-0 basis-auto font-['Golos_Text'] text-[15px] font-[460] leading-[20px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[35]">
                    Адрес
                  </span>
                  <div className="flex gap-[12px] items-center self-stretch shrink-0 flex-nowrap rounded-[4px] relative z-[36]">
                    <div className="flex w-[161px] items-center shrink-0 flex-nowrap relative z-[37]">
                      <span className="h-[24px] shrink-0 basis-auto font-['Golos_Text'] text-[22px] font-[450] leading-[24px] text-[rgba(255,255,255,0.6)] relative text-left whitespace-nowrap z-[38]">
                        Введите адрес
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex w-[24px] h-[24px] p-0 gap-[12px] items-center shrink-0 flex-nowrap relative z-[39]" />
              </div>
              <div className="flex pt-[16px] pr-[24px] pb-[20px] pl-[24px] gap-[12px] items-center self-stretch shrink-0 flex-nowrap border-solid border-t border-t-[#1f535c] relative overflow-hidden z-40">
                <div className="flex flex-col gap-[8px] items-start grow shrink-0 basis-0 flex-nowrap relative z-[41]">
                  <span className="h-[20px] shrink-0 basis-auto font-['Golos_Text'] text-[15px] font-[460] leading-[20px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[42]">
                    Номер
                  </span>
                  <div className="flex gap-[12px] items-center self-stretch shrink-0 flex-nowrap rounded-[4px] relative z-[43]">
                    <div className="flex w-[22px] flex-col justify-center items-center shrink-0 flex-nowrap relative overflow-hidden z-[44]">
                      <div className="w-[22px] h-[22px] shrink-0 bg-[url(/images/IconButton.svg)] bg-cover bg-no-repeat relative z-[45]" />
                    </div>
                    <div className="flex w-[166px] items-center shrink-0 flex-nowrap relative z-[46]">
                      <span className="h-[24px] shrink-0 basis-auto font-['Golos_Text'] text-[22px] font-[450] leading-[24px] text-[rgba(255,255,255,0.6)] relative text-left whitespace-nowrap z-[47]">
                        +337 77 77 77 77
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex w-[24px] h-[24px] p-0 gap-[12px] items-center shrink-0 flex-nowrap relative z-[48]" />
              </div>
              <div className="flex pt-[16px] pr-[24px] pb-[20px] pl-[24px] gap-[12px] items-center self-stretch shrink-0 flex-nowrap border-solid border-t border-t-[#1f535c] relative overflow-hidden z-[49]">
                <div className="flex flex-col gap-[8px] items-start grow shrink-0 basis-0 flex-nowrap relative z-50">
                  <span className="h-[20px] shrink-0 basis-auto font-['Golos_Text'] text-[15px] font-[460] leading-[20px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[51]">
                    Пароль
                  </span>
                  <div className="flex gap-[12px] items-center self-stretch shrink-0 flex-nowrap rounded-[4px] relative z-[52]">
                    <div className="flex w-[186px] items-center shrink-0 flex-nowrap relative z-[53]">
                      <span className="h-[24px] shrink-0 basis-auto font-['Golos_Text'] text-[22px] font-[450] leading-[24px] text-[rgba(255,255,255,0.6)] relative text-left whitespace-nowrap z-[54]">
                        Создайте пароль
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex w-[24px] gap-[12px] items-center shrink-0 flex-nowrap relative z-[55]">
                  <div className="flex w-[24px] flex-col justify-center items-center shrink-0 flex-nowrap relative overflow-hidden z-[56]">
                    <div className="w-[24px] h-[24px] shrink-0 bg-[url(/images/IconButton.svg)] bg-cover bg-no-repeat relative overflow-hidden z-[57]" />
                  </div>
                </div>
              </div>
              <div className="flex pt-[16px] pr-[24px] pb-[20px] pl-[24px] gap-[12px] items-center self-stretch shrink-0 flex-nowrap border-solid border-t border-t-[#1f535c] relative overflow-hidden z-[58]">
                <div className="flex flex-col gap-[8px] items-start grow shrink-0 basis-0 flex-nowrap relative z-[59]">
                  <span className="h-[20px] shrink-0 basis-auto font-['Golos_Text'] text-[15px] font-[460] leading-[20px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[60]">
                    Телеграм токен
                  </span>
                  <div className="flex gap-[12px] items-center self-stretch shrink-0 flex-nowrap rounded-[4px] relative z-[61]">
                    <div className="flex w-[113px] items-center shrink-0 flex-nowrap relative z-[62]">
                      <span className="h-[24px] shrink-0 basis-auto font-['Golos_Text'] text-[22px] font-[450] leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[63]">
                        d12n92172
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex w-[24px] gap-[12px] items-center shrink-0 flex-nowrap relative z-[64]">
                  <div className="flex w-[24px] flex-col justify-center items-center shrink-0 flex-nowrap relative overflow-hidden z-[65]">
                    <div className="w-[24px] h-[24px] shrink-0 bg-[url(/images/IconButton.svg)] bg-cover bg-no-repeat relative overflow-hidden z-[66]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="flex w-[121px] h-[56px] pt-[16px] pr-[24px] pb-[16px] pl-[24px] gap-[12px] justify-center items-center shrink-0 flex-nowrap bg-[#53cfba] rounded-[12px] border-none relative overflow-hidden z-[67] pointer">
            <span className="h-[24px] shrink-0 basis-auto font-['Golos_Text'] text-[18px] font-medium leading-[24px] text-[#003c46] relative text-left whitespace-nowrap z-[68]">
              Создать
            </span>
          </button>
        </div>
      </div>
      <div className="flex pt-[20px] pr-0 pb-[20px] pl-0 justify-between items-center self-stretch shrink-0 flex-nowrap rounded-tl-none rounded-tr-none rounded-br-[12px] rounded-bl-[12px] relative z-[69]">
        <div className="flex w-[316px] gap-[16px] items-center shrink-0 flex-nowrap relative z-[70]">
          <span className="h-[16px] shrink-0 basis-auto font-['Golos_Text'] text-[12px] font-[460] leading-[16px] text-[rgba(255,255,255,0.45)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[71]">
            Picheni © 2024
          </span>
          <div className="w-px self-stretch shrink-0bg-[url(/images/IconButton.svg)] bg-cover bg-no-repeat relative z-[72]" />
          <span className="h-[16px] shrink-0 basis-auto font-['Golos_Text'] text-[12px] font-[460] leading-[16px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[73]">
            terms
          </span>
          <span className="h-[16px] shrink-0 basis-auto font-['Golos_Text'] text-[12px] font-[460] leading-[16px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[74]">
            privacy
          </span>
          <span className="h-[16px] shrink-0 basis-auto font-['Golos_Text'] text-[12px] font-[460] leading-[16px] text-[rgba(255,255,255,0.6)] tracking-[0.2px] relative text-left uppercase whitespace-nowrap z-[75]">
            Помощь
          </span>
        </div>
        <div className="flex w-[76px] gap-[12px] items-start shrink-0 flex-nowrap relative z-[76]">
          <div className="flex w-[32px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] justify-center items-center shrink-0 flex-nowrap bg-[rgba(255,255,255,0.12)] rounded-[8px] relative overflow-hidden z-[77]">
            <div className="flex w-[16px] flex-col justify-center items-center shrink-0 flex-nowrap relative overflow-hidden z-[78]">
              <div className="w-[16px] h-[16px] shrink-0 bg-[url(/images/IconButton.svg)] bg-cover bg-no-repeat relative overflow-hidden z-[79]" />
            </div>
          </div>
          <div className="flex w-[32px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] justify-center items-center shrink-0 flex-nowrap bg-[rgba(255,255,255,0.12)] rounded-[8px] relative overflow-hidden z-[80]">
            <div className="flex w-[16px] flex-col justify-center items-center shrink-0 flex-nowrap relative overflow-hidden z-[81]">
              <div className="w-[16px] h-[16px] shrink-0 bg-[url(/images/IconButton.svg)] bg-cover bg-no-repeat relative overflow-hidden z-[82]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
