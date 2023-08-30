import { useNavigate } from "react-router-dom";

export interface weeklyGameProps {
  icon?: string;
  link?: string;
}

const WeeklyGames = (props: weeklyGameProps) => {
  const navigate = useNavigate();
  return (
    <div className="mt-[18px] w-[230px] mb-[18px] relative  rounded-lg border border-[#132236] justify-between">
      <div className="flex justify-center flex-col place-content-center">
        <div className="flex flex-col items-center justify-center h-[120px] top-[8px] bg-cyan-400/10 rounded-t-lg place-items-center">
          <div className="flex justify-center">
            <img src={props.icon} className="mt-[12px] w-[40%]" />
          </div>
          <div
            className="inline-block justify-center items-center rounded-full
                       cursor-pointer px-[13px] py-1.5 
                    border border-[#29B080]  text-emerald-300 bg-emerald-300/20 font-bold mx-2 my-1 
                    hover:border-primary hover:opacity-[90%]"
            onClick={() => {
              navigate(String(props.link));
            }}
          >
            <p className="text-[12px]">1000 SEI</p>
          </div>
        </div>

        <div className="border-[#132236] border-b-[1px] flex flex-row py-2 justify-between ">
          <div
            className="flex justify-center items-center rounded-[40px] border-[1.2px]
                      font-[500] text-[14px]  cursor-pointer px-[13px] py-[-5px]
                  border-[#29B080] text-[#29B080] bg-[#162724] mx-2
                    hover:border-primary"
          >
            <p className="text-[10px]">Opened</p>
          </div>
          <div className="mx-2 text-[10px]">25/25 slots</div>
        </div>
        <div className="border-[#132236] border-b-[1px] flex flex-row py-2 justify-between text-[10px]">
          <div className="mx-2">Min.Entry price</div>
          <div className="mx-2">0.5 SEI </div>
        </div>
        <div className="border-[#132236] flex flex-row py-2 justify-between text-[10px]">
          <div className="mx-2"> End in </div>
          <div className="mx-2"> 00:02:52 </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyGames;
