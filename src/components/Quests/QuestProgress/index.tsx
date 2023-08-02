import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import { WalletWindowKey } from "@sei-js/core";
import { SeiWalletContext } from "@sei-js/react";
import { LEVEL_PASS_NUMS } from "../../../data";
import {
  setMyInfo,
  setPercent,
  setMyXP,
} from "../../../redux/slices/tetrisSlice";

export type levelPassType = {
  number: number;
  passed?: boolean;
};

const widthFull = window.innerWidth;

const QuestProgress = () => {
  const dispatch = useDispatch();
  const myXP = useSelector((state: any) => state.tetris.myXP);
  const level = useSelector((state: any) => state.tetris.myInfo.level);
  const percent = useSelector((state: any) => state.tetris.percent);

  const { supportedWallets, connect, disconnect, installedWallets } =
    useContext(SeiWalletContext);
  const [connected, setConnected] = useState(false);

  const connected_wallet = localStorage.getItem(
    "connectedWallet"
  ) as WalletWindowKey;

  useEffect(() => {
    if (connected) {
      connect(connected_wallet);
    }
  }, []);

  console.log(connected_wallet);

  const { myInfo } = useSelector((state: any) => ({
    myInfo: state.tetris.myInfo,
  }));

  const walletAddress = myInfo.wallet;
  console.log(typeof walletAddress);

  return (
    <div className="flex flex-row justify-center mb-3 mt-5">
      <Grid
        container
        spacing={0}
        columns={{ xl: 3, lg: 3, md: 3, sm: 4, xs: 4 }}
      >
        <div className="pb-3 flex border-[#132236] bg-[#071018] rounded-2xl border-[2px] w-[100vw] h-[110px] mr-3">
          <div className="h-[90px] w-[90px] m-2 z-20">
            <img src="/images/quests/Avatar.png"></img>
          </div>
          <div>
            <div>
              <div className="flex justify-row mt-1">
                <div className="font-bold text-[20px]">
                  <div className="font-bold text-[20px]">
                    {/* {walletAddress} */}
                    {/* {walletAddress.substring(0, 6) +
                      "..." +
                      walletAddress.substring(walletAddress.length - 3)} */}
                  </div>
                </div>
                <div>
                  <div className="absolute mt-2 ml-[13px] text-black">
                    {level}
                  </div>
                  <img src="/images/quests/level_box.png"></img>
                </div>
              </div>
              <div className="text-[12px]">
                {myXP}/2000<span className="text-[green]">&nbsp;XP</span>
              </div>
            </div>
            <div>
              <div className="relative bg-gray-800 flex items-center">
                <div className="flex flex-row justify-around absolute z-20 w-[calc(100vw-120px)] mt-11">
                  {LEVEL_PASS_NUMS.map((i, index) => (
                    <div
                      key={index}
                      className="flex relative h-40 w-full ml-[-5px] justify-center items-center"
                    >
                      <div className="absolute z-10">
                        {i.number <= level ? (
                          <div>
                            <img
                              src="/images/quests/number-container.svg"
                              width="30px"
                              height="30px"
                            />
                          </div>
                        ) : (
                          <div>
                            <img
                              src="/images/quests/number-container-inactive.svg"
                              width="30px"
                              height="30px"
                            />
                          </div>
                        )}
                      </div>

                      <span className="absolute text-white text-center mt-1 z-10">
                        {i.number}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="parent_div w-[calc(100vw-130px)] ml-[-30px] h-[25px]">
              <div
                className={`flex absolute child_div`}
                style={{ width: percent }}
              ></div>
            </div>
          </div>
        </div>
        {/* <div className="pb-3 flex justify-center border-[#132236] bg-[#071018] rounded-2xl border-[2px] w-[120px] h-[100px]">
          <img src="/images/quests/award.png" width="200px"></img>
        </div> */}
      </Grid>
    </div>
  );
};

export default QuestProgress;

// [(calc(${myXP}/2000*100))%]
