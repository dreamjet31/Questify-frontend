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

  return (
    <div className="w-[100%] pb-10 px-[2.5vw] font-[Outfit-Regular] text-white">
      <div className="mb-3 text-xl">Rewards Contents:</div>
      <Grid
        container
        spacing={2}
        columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 4 }}
      >
        {lootboxCard.map((item, index) => (
          <Grid item xl={2} lg={2} md={3} sm={4} xs={2}>
            <div
              key={index}
              className={`h-[300px]  bg-sky-600/5 border-2 border-sky-950 rounded-2xl bg-[#091017] text-center`}
            >
              <div>
                <div
                  className={`py-2 flex justify-between px-4 gap-2 rounded-t-2xl ${`bg-[#0f2031]`} bg-[#091017] `}
                >
                  <p>
                    {item.name}
                    <span className="ml-1">
                      (
                      {Number(rewards?.totalRewards?.[index]) -
                        Number(rewards?.claimedRewards?.[index]) || 0}{" "}
                      left)
                    </span>
                  </p>

                  <p>{item.percent}</p>
                </div>
                {item.name == "NFT" ? (
                  <div className="flex flex-col space-y-4 items-center my-2 px-5">
                    <div className="z-[20] flex justify-center">
                      <img src={item.img} alt="logo" className="w-[80%]" />
                    </div>
                    <div>
                      <p>{item.value}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-5 items-center my-10 px-5">
                    <div className="z-[20]">
                      <img src={item.img} alt="logo" width={120} height={120} />
                    </div>
                    <div>
                      <p>{item.value}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RewardsContent;
