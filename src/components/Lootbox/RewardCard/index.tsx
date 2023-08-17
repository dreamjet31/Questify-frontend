import { useState } from "react";

export interface RewardProps {
  data: any;
  revealColor?: boolean;
}

const RewardCard = ({ data }: RewardProps) => {
  return (
    <div
      className={`h-[22vw] lg:min-w-[16.8vw] min-w-[35vw] font-[Outfit-Regular] bg-sky-600/5 border
       rounded-2xl bg-[#091017] text-center`}
    >
      <div
        className={`py-2 flex justify-center gap-2 rounded-t-2xl ${`bg-[#0C1620]`}`}
      >
        <div className="z-[20]">
          <img src={data.img} alt="logo" width={24} height={24} />
        </div>
        <p>{data.name}</p>
      </div>
      <div className="flex flex-col space-y-[20%] items-center mt-[20%] px-5">
        <div className="z-[20]">
          <img src={data.img} alt="logo" width={120} height={120} />
        </div>
        <div>
          <p>{data.value}</p>
        </div>
      </div>
    </div>
  );
};

export default RewardCard;
