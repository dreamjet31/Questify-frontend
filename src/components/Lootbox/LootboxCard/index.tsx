// import { useState } from "react";
export interface LootboxProps {
  data: any;
  revealColor?: boolean;
}

const LootboxCard = ({ data, revealColor }: LootboxProps) => {
  return (
    <div
      className={`h-[300px] lg:min-w-[12vw] md:min-w-[17vw] min-w-[29vw] bg-sky-600/5 border ${
        data.selected && revealColor ? "border-[#006400]" : " border-[#324666]"
      } rounded-md bg-[#091017] text-center`}
    >
      {/* <div
        className={`py-2 flex justify-center gap-2 rounded-t-2xl ${`bg-[#0C1620]`}`}
      >
        <div>
          <img src={data.img} alt="logo" width={24} height={24} />
        </div>
        <p>{data.name}</p>
      </div> */}
      <div className="flex flex-col space-y-3 items-center my-12 justify-center">
        <div className="flex justify-center">
          {data.name == "NFT" ? (
            <img src={data.img} alt="logo" width={"90%"} />
          ) : (
            <img
              src={data.img}
              alt="logo"
              width={"90%"}
              className="rounded-full"
            />
          )}
        </div>
        <div>
          <p>{data.value}</p>
        </div>
      </div>
    </div>
  );
};

export default LootboxCard;
