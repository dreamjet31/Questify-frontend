import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOOTBOX_CARD_BRONZE } from "../../../data";
import { LOOTBOX_CARD_SILVER } from "../../../data";
import { LOOTBOX_CARD_GOLD } from "../../../data";
import { setRewards, setMyInfo } from "../../../redux/slices/tetrisSlice";
import { Grid } from "@mui/material";
import { Left } from "react-bootstrap/lib/Media";
import { apiCaller } from "../../../utils/fetcher";
export interface LootboxProps {
  data: any;
}
const isSmallDevice = window.matchMedia("(max-width: 600px)").matches;

const RewardsContent = () => {
  const dispatch = useDispatch();

  const keyNumber = Number(localStorage.getItem("keyNumber"));

  const myInfo = useSelector((state: any) => ({
    myInfo: state.tetris.myInfo,
  }));

  const fetchLeaderboard = async () => {
    var result = await apiCaller.get("users/fetchLeaderboard");
    dispatch(setRewards({ rewards: result.data.data.totalKeyInfo[0] }));
    console.log(result.data.data.totalKeyInfo[0]);
  };

  const { rewards } = useSelector((state: any) => ({
    rewards: state.tetris.rewards || {},
  }));

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  // console.log(rewards);

  const [lootboxCard, setLootboxCard] = useState(LOOTBOX_CARD_BRONZE);
  useEffect(() => {
    keyNumber == 0
      ? setLootboxCard(LOOTBOX_CARD_BRONZE)
      : keyNumber == 1
      ? setLootboxCard(LOOTBOX_CARD_SILVER)
      : setLootboxCard(LOOTBOX_CARD_GOLD);
  }, [keyNumber]);
  // const rewards_card =

  const xxx = 70;
  return (
    <div className="w-[100%] pb-10 px-[2.5vw] font-[Outfit-Regular] text-white">
      <div className="mb-3 text-xl">Rewards Contents:</div>
      <Grid
        container
        spacing={2}
        columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 4 }}
      >
        {lootboxCard.map((item, index) => (
          <Grid item xl={1.5} lg={2} md={3} sm={4} xs={2}>
            <div
              key={index}
              className={`h-[350px]  bg-sky-600/5 rounded-lg bg-[#091017] text-center`}
            >
              <div>
                <div
                  className={`py-2 flex justify-between px-4 rounded-t-lg ${`bg-[#0f2031]`} bg-[#091017] `}
                >
                  <p>
                    {item.name}
                    {/* <span className="ml-1">
                      (
                      {Number(rewards?.totalRewards?.[index]) -
                        Number(rewards?.claimedRewards?.[index]) || 0}{" "}
                      left)
                    </span> */}
                  </p>

                  <p>{item.percent}</p>
                </div>
                <div className="flex flex-col space-y-4 items-center my-10 px-5">
                  <div className="z-[20]">
                    {item.name === "NFT" ? (
                      <img src={item.img} alt="logo" className="w-[100%]" />
                    ) : (
                      <img
                        src={item.img}
                        alt="logo"
                        className="rounded-full w-[100%]"
                      />
                    )}
                  </div>
                  <div>
                    <p>{item.value}</p>
                  </div>
                  {/* <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-1.5 w-[100%] rounded-lg"></div> */}
                  <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 h-[5px]">
                    <div
                      className={`bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full 
                      h-[5px]`}
                      style={{
                        width: `${
                          ((Number(rewards?.totalRewards?.[index]) -
                            Number(rewards?.claimedRewards?.[index])) /
                            Number(rewards?.totalRewards?.[index])) *
                          100
                        }%`,
                      }}
                    ></div>
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
