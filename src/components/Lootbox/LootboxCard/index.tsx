// import { useState } from "react";
export interface LootboxProps {
  data: any;
  revealColor?: boolean;
}

const LootboxCard = ({ data, revealColor }: LootboxProps) => {
  return (
    <div
      className={`h-[250px] lg:min-w-[11vw] md:min-w-[17vw] min-w-[29vw] bg-sky-600/5 border ${
        data.selected && revealColor ? "border-[#006400]" : " border-[#162234]"
      } rounded-2xl bg-[#091017] text-center`}
    >
      <div
        className={`py-2 flex justify-center gap-2 rounded-t-2xl ${`bg-[#0C1620]`}`}
      >
        <div>
          <img src={data.img} alt="logo" width={24} height={24} />
        </div>
        <p>{data.name}</p>
      </div>
      <div className="flex flex-col space-y-3 items-center my-8 px-5">
        <div>
          <img src={data.img} alt="logo" width={100} height={100} />
        </div>
        <div>
          <p>{data.value}</p>
        </div>
      </div>
    </div>
  );
};

export default LootboxCard;
