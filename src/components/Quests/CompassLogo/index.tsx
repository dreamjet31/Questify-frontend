import React, { useEffect, useState } from "react";
import { BorderPanel, GeneralPanel } from "../../Common/Panels";
import { useSelector } from "react-redux";

const CompassLogo = () => {
  const level = useSelector((state: any) => state.tetris.myInfo.level);
  const myXP = useSelector((state: any) => state.tetris.myXP);

  return (
    <div className="w-[350px]">
      <div className=" ml-[110px] flex flex-col font-[Outfit-Regular]">
        <div className="flex flex-row items-center justify-between">
          <div className="text-sm">Level {level}</div>

          <div className="text-xs opacity-50">
            {myXP}/{level === 5 ? 2000 : level * 500}
          </div>
          <div className="text-sm opacity-50">
            Level {level === 5 ? 5 : level + 1}
          </div>
        </div>
        <div className="w-full  mb-2 mt-[-10px]">
          <div className="parent_div w-full h-1 rounded-sm">
            <div
              className={`flex absolute child_div rounded-sm`}
              style={{
                width: `${
                  level == 5 ? 100 : ((myXP - (level - 1) * 500) / 500) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="w-[360px] h-[80px] rounded-[30px] bg-[#4D9B6C] flex flex-row">
        <div className="mt-[-32px]">
          <img
            src="/images/logos/departLogo.png"
            width={"100px"}
            height={"140px"}
          />
        </div>
        <div className="mt-5 ml-3">
          <div className="text-white text-xl font-[Outfit-Regular]">
            CLAIM YOUR COMPASS
          </div>
          <div className="text-[#FDFDFD] text-sm font-[Outfit-Light]">
            Finish these quests to claim it
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompassLogo;
