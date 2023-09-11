import React, { useEffect, useState, useContext } from "react";
import { BorderPanel, GeneralPanel } from "../../Common/Panels";
import { useSelector } from "react-redux";
import { useWallet } from "@sei-js/react";
// import { WalletWindowKey } from "@sei-js/core";
import { SeiWalletContext } from "@sei-js/react";
import { WalletConnectButton } from "@sei-js/react";

const CompassLogo = () => {
  const level = useSelector((state: any) => state.tetris.myInfo?.level);
  const myXP = useSelector((state: any) => state.tetris.myXP);

  const { connectedWallet } = useWallet();

  const { myInfo } = useSelector((state: any) => ({
    myInfo: state.tetris.myInfo,
  }));

  const myAddress = myInfo?.wallet;

  return (
    <div className="w-[350px]">
      <div className="w-[360px] h-[70px] rounded-tl-[40px] rounded-tr-[20px] rounded-bl-[10px] bg-[#4D9B6C] flex flex-row">
        <div className=" z-[1]">
          <img
            src="/images/quests/Avatar.png"
            width={"100px"}
            height={"140px"}
          />
        </div>
        <div className="mt-2 ml-3">
          <div className="text-[24px] text-white font-[Outfit-Regular]">
            {connectedWallet ? (
              myAddress?.substring(0, 6) +
              "..." +
              myAddress?.substring(myAddress.length - 5)
            ) : (
              <div className="hover:opacity-80">
                <WalletConnectButton />
              </div>
            )}
          </div>

          <div className="text-[#FDFDFD] opacity-80 text-sm font-[Outfit-Regular]">
            Buy compass to unlock more rewards
          </div>
        </div>
      </div>
      <div className=" ml-[90px] mt-[-6px] mr-[-10px] flex flex-col font-[Outfit-Regular]">
        <div className="w-full ">
          <div className="parent_div w-full h-3 rounded-sm">
            <div
              className={`flex absolute child_div rounded-sm`}
              style={{
                width: `${
                  level == 5
                    ? 100
                    : level == 0
                    ? 0
                    : ((myXP - (level - 1) * 500) / 500) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          {level !== 0 && <div className="text-sm">Level {level}</div>}
          {level !== 0 && (
            <div className="text-xs opacity-50">
              {myXP}/{level === 5 ? 2000 : level * 500}
            </div>
          )}
          {level !== 0 && (
            <div className="text-sm opacity-50">
              Level {level === 5 ? 5 : level + 1}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompassLogo;
