import { useState } from "react";
import { KEYS_CONTENT } from "../../../data";
import { Grid } from "@mui/material";
import { Left } from "react-bootstrap/lib/Media";
import { setKeyNumber } from "../../../redux/slices/tetrisSlice";
import { useDispatch, useSelector } from "react-redux";
import { setMyInfo } from "../../../redux/slices/tetrisSlice";
export interface LootboxProps {
  data: any;
}

const KeysContent = () => {
  const dispatch = useDispatch();
  // const keyNumber = useSelector((state: any) => ({
  //   keyNumber: state.tetris.keyNumber,
  // }));

  const keyNumber = Number(localStorage.getItem("keyNumber"));

  // const rewardKey = useSelector((state: any) => ({
  //   rewardKey: state.tetris.myInfo.rewardKey,
  // }));

  const myInfo = useSelector((state: any) => ({
    myInfo: state.tetris.myInfo,
  }));

  return (
    <div className="w-[100%] pb-10 px-[2.5vw] font-[Outfit-Regular] text-white">
      <div className="mb-3 text-xl">Keys you owned:</div>
      <Grid
        container
        spacing={2}
        columns={{ xl: 12, lg: 12, md: 12, sm: 4, xs: 4 }}
      >
        {KEYS_CONTENT.map((item, index) => (
          <Grid item xl={1.5} lg={2} md={3} sm={4} xs={4}>
            <div
              key={index}
              className={`bg-sky-600/5 border  ${
                item.id === keyNumber ? "border-green-600" : "border-sky-950"
              } rounded-2xl bg-[#091017] text-center cursor-pointer`}
            >
              <div>
                <div
                  className={`py-2 flex justify-around gap-2 rounded-2xl  ${`bg-[#0C1620]`}`}
                >
                  <p>{item.name}</p>
                  <div className="flex flex-row gap-1">
                    <p>{Number(myInfo?.myInfo?.rewardKey?.[index]) || 0}</p>
                    <div className="z-[20]">
                      <img src={item.img} alt="logo" width={24} height={24} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default KeysContent;
