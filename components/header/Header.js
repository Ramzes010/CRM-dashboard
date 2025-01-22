import  HeaderLogoPicheni from './HeaderLogoPicheni';


export default function Header() {
  return (
    <header className="main-container w-full bg-[#e6ebce]">
      <div className="w-[100vw] h-[5.56vw] relative overflow-hidden mx-auto my-0 flex items-center">
        <HeaderLogoPicheni/>
        <div className="flex w-[23.47vw] items-start flex-nowrap absolute top-0 bottom-0 left-1/2 translate-x-[-49.85%] translate-y-0">
          <div className="flex w-[6.88vw] pt-[0.56vw] pr-[1.39vw] pb-[0.56vw] pl-[1.39vw] justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[1]">
            <span className="h-[1.67vw] cursor-pointer shrink-0 basis-auto golos-text font-[500] text-[1.11vw] font-medium leading-[1.67vw] text-[#003c46] hover:text-[#858745] relative text-left whitespace-nowrap z-[2]">
              Заказы
            </span>
          </div>
          <div className="flex w-[7.85vw] pt-[0.56vw] pr-[1.39vw] pb-[0.56vw] pl-[1.39vw] justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[3]">
            <span className="h-[1.67vw] cursor-pointer shrink-0 basis-auto font-golos font-[500] text-[1.11vw] font-medium leading-[1.67vw] text-[#003c46] hover:text-[#858745] relative text-left whitespace-nowrap z-[4]">
              Дашборд
            </span>
          </div>
          <div className="flex w-[8.75vw] pt-[0.56vw] pr-[1.39vw] pb-[0.56vw] pl-[1.39vw] justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[5]">
            <span className="h-[1.67vw] cursor-pointer shrink-0 basis-auto font-golos font-[500] text-[1.11vw] font-medium leading-[1.67vw] text-[#003c46] hover:text-[#858745] relative text-left whitespace-nowrap z-[6]">
              Работники
            </span>
          </div>
        </div>
        <div className="flex w-[15.28vw] h-[3.06vw] p-0 gap-[1.11vw] items-center flex-nowrap absolute top-1/2 right-[3.06vw] translate-x-0 translate-y-[-50%] z-[7]" />
        <div className="flex w-[10.83vw] h-[2.08vw] gap-[2.22vw] items-center flex-nowrap absolute top-1/2 left-[3.06vw] translate-x-0 translate-y-[-50%] z-[8]">
          <div className="w-[7.08vw] h-[2.08vw] shrink-0 bg-cover bg-no-repeat relative z-[9]" />
          <div className="flex w-[1.53vw] flex-col justify-center items-center shrink-0 flex-nowrap relative overflow-hidden z-10">
            <div className="w-[1.53vw] h-[1.53vw] shrink-0 bg-cover bg-no-repeat relative overflow-hidden z-[11]" />
          </div>
        </div>
      </div>
      <div className="flex justify-between fixed top-[5.56vw] w-full">
        <img
          className="select-none drag-none w-[1.67vw] h-[1.67vw]"
          src="/images/icons/Subtract.svg"
          alt="#"
        />
        <img
          className="select-none drag-none w-[1.67vw] h-[1.67vw] sticky left-[100%]"
          src="/images/icons/Subtract2.svg"
          alt="#"
        />
      </div>
    </header>
  );
}
