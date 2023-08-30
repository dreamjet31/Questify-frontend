import { BorderPanel, GeneralPanel } from "../../../components/Common/Panels";
import { BETTING_BANNER_ITEMS } from "../../../data";
import { BiPlus } from "react-icons/bi";
import WeeklyGames from "./WeeklyGames";

const WeeklyGiveWay = () => {
  return (
    <BorderPanel>
      <div className="flex w-full px-4 py-2 bg-sky-600/5 border-[#132236] border-b">
        <div className="font-bold text-sm  text-gray-200 ">Weekly Giveaway</div>
      </div>
      <div className="flex flex-row mx-4 overflow-x overflow-scroll gap-3">
        {BETTING_BANNER_ITEMS.map((item, index) => (
          <WeeklyGames icon={item.icon} link={item.link} />
        ))}
        <div className="mt-[18px] bg-green-400/5 mb-[18px] relative w-[230px] rounded-xl border border-dotted border-[#29B080] pb-[20px]  flex justify-center items-center">
          <div className="my-[20%] justify-center flex items-center flex-col mx-2">
            <div className="flex justify-center border-green-400 my-2 text-green-500 items-center  border rounded-full  h-12 w-12 bg-emerald-600/20 flex-col cursor-pointer">
              <BiPlus />
            </div>
            <div className="text-center lg:text-[16px] md:text-[14px] sm:text-[14px] text-[12px] ]">
              More Coming Soon
            </div>
          </div>
        </div>
      </div>
    </BorderPanel>
  );
};

export default WeeklyGiveWay;
