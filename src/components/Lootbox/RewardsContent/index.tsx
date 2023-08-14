import { useState } from "react";
import { LOOTBOX_REWARD_CONTENT } from "../../../data";
import { Grid } from "@mui/material";
import { Left } from "react-bootstrap/lib/Media";

export interface LootboxProps {
  data: any;
}

const RewardsContent = () => {
  return (
    <div className="w-[100%] pb-10 px-12 font-[Outfit-Regular] text-white">
      <div className="mb-3">Lootbox Contents:</div>
      <Grid
        container
        spacing={2}
        columns={{ xl: 12, lg: 12, md: 12, sm: 4, xs: 4 }}
      >
        {LOOTBOX_REWARD_CONTENT.map((item, index) => (
          <Grid item xl={1.5} lg={2} md={3} sm={4} xs={4}>
            <div
              key={index}
              className={`h-[300px]  bg-sky-600/5 border border-sky-950 rounded-2xl bg-[#091017] text-center`}
            >
              <div>
                <div
                  className={`py-2 flex justify-around gap-2 rounded-t-2xl ${`bg-[#0C1620]`}`}
                >
                  <div className="flex flex-row">
                    <div className="z-[20]">
                      <img src={item.img} alt="logo" width={24} height={24} />
                    </div>
                    <p>{item.name}</p>
                  </div>
                  <p>{item.percent}</p>
                </div>
                <div className="flex flex-col space-y-5 items-center my-10 px-5">
                  <div className="z-[20]">
                    <img src={item.img} alt="logo" width={120} height={120} />
                  </div>
                  <div>
                    <p>{item.value}</p>
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

export default RewardsContent;
