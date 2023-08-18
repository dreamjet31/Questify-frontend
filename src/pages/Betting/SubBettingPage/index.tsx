import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { apiCaller } from "../../../utils/fetcher";
import { LEADERBOARD_SUB_MENUITEMS, GAME_CONTENTS } from "../../../data";
import { setLeaderboard, setIframeID } from "../../../redux/slices/tetrisSlice";
import { BorderPanel, GeneralPanel } from "../../../components/Common/Panels";
import SubBettingDescription from "../../../components/Betting/SubBettingDescription";
import BorderMenuItem from "../../../components/Common/Menus/BorderMenuItem";
import RecentScoreList from "../../../components/Betting/RecentScoreList";
import PointLeaderboard from "../../../components/Leaderboard/PointLeaderboard";
import SubBettingBanner from "../../../components/Betting/SubBettingBanner";
import Grid from "@mui/material/Grid";
import RewardPool from "../../../components/Betting/RewardPool";
import SeiLootBox from "../../../components/Betting/SeiLootBox";
import { GameContentType } from "../../Games";
import { Button } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import { setIframeMode } from "../../../redux/slices/tetrisSlice";

const SubBettingPage = (props: GameContentType) => {
  const [loading, setIsloading] = useState(true);
  const { winners } = useSelector((state: any) => ({
    winners: state.tetris.winners,
  }));

  const dispatch = useDispatch();

  const [sortedWinners, setSortedWinners] = useState<any>([]);
  const fetchLeaderboard = async () => {
    try {
      var result = await apiCaller.get("users/fetchLeaderboard");
      // console.log(result.data.data);
      dispatch(setLeaderboard({ result: result.data.data }));
    } catch (error) {
      // toast.error("Cannot fetch Data!");
      console.log("Cannot fetch data");
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    let tempWinners = Object.assign({ ...winners });
    if (
      Object.keys(tempWinners) &&
      Object.keys(tempWinners).indexOf("showInfo") > -1 &&
      tempWinners.showInfo.length > 0
    ) {
      tempWinners = [...tempWinners.showInfo].sort(
        (a, b) => b.totalScore - a.totalScore
      );

      const sorted = tempWinners.map((winner, idx) => {
        let rankRange = 0;
        if (idx / tempWinners.length < 0.1) {
          rankRange = 10;
        } else if (idx / tempWinners.length < 0.3) {
          rankRange = 30;
        } else if (idx / tempWinners.length < 0.5) {
          rankRange = 50;
        }
        return { ...winner, rank: idx + 1, rankRange };
      });
      setSortedWinners(sorted);
      setIsloading(false);
    }
  }, [winners]);

  const fetchGameDataById = (id: number): GameContentType => {
    const content = GAME_CONTENTS.find((game) => game.id === id);
    return (
      content || {
        id: 1,
        title: "string",
        thumbnail: "string",
        thumbnailBig: "string",
        iframeUrl: "string",
        description: "string",
      }
    );
  };

  // const iframeMode = localStorage.getItem("iframeMode");
  const iframeMode = useSelector((state: any) => state.tetris.iframeMode);

  const iframeID = Number(localStorage.getItem("iframeID"));

  return (
    <div className="lg:gap-[30px] gap-[5px] 2xl:ml-[100px] xl:ml-[50px] lg:ml-[20px] ml-[5px]  lg:mr-[20px] sm:mt-[100px] mr-[10px] mt-[80px] mb-[80px] text-gray-200">
      {!iframeMode ? (
        <Grid
          container
          spacing={0}
          columns={{ xl: 12, lg: 12, md: 12, sm: 4, xs: 4 }}
        >
          <Grid item xl={8} lg={8} md={8} sm={4} xs={4}>
            <GeneralPanel style="lg:col-span-12 md:col-span-12 col-span-1">
              <SubBettingBanner
                id={fetchGameDataById(iframeID).id}
                title={fetchGameDataById(iframeID).title}
                thumbnail={fetchGameDataById(iframeID).thumbnail}
                iframeUrl={fetchGameDataById(iframeID)?.iframeUrl}
                thumbnailBig={fetchGameDataById(iframeID).thumbnailBig}
              />
              <div className="custom-2xl:col-span-3 xl:col-span-3 lg:col-span-2 md:col-span-1 sm:col-span-1 xs:col-span-1 mt-6">
                <SubBettingDescription
                  title={fetchGameDataById(iframeID).title}
                  description={String(fetchGameDataById(iframeID).description)}
                />
              </div>

              <div className="flex gap-2">
                {LEADERBOARD_SUB_MENUITEMS.map((item, index) => (
                  <BorderMenuItem key={index} {...item} />
                ))}
              </div>

              <BorderPanel style="my-6 !p-0">
                <div className="w-full h-[40px] border-[#132236] border-b bg-cyan-500/5 rounded-t-lg">
                  <div className="flex gap-8 text-[14px] pt-[10px] pl-[20px]">
                    <div className="text-gray-200 text-sm font-bold">
                      All Competitions
                    </div>
                  </div>
                </div>
                <div className=" w-full">
                  {!loading && (
                    <ul className="w-full">
                      {winners.tetrisInfo.slice(0, 4).map((item, index) => (
                        <RecentScoreList key={index} {...item} />
                      ))}
                    </ul>
                  )}
                </div>
              </BorderPanel>
            </GeneralPanel>
          </Grid>

          <Grid item xl={3} lg={4} md={4} sm={4} xs={4}>
            <GeneralPanel>
              <PointLeaderboard />
              <SeiLootBox />
              <RewardPool />
            </GeneralPanel>
          </Grid>
        </Grid>
      ) : (
        <div>
          <div className="absolute bottom-12 md:bottom-10 right-0 z-10 mb-3 mt-3 ">
            <Button
              size="large"
              variant="contained"
              color="success"
              startIcon={<ReplyIcon />}
              onClick={() => {
                dispatch(setIframeMode({ iframeMode: false }));
              }}
            ></Button>
          </div>
          <iframe
            src={fetchGameDataById(iframeID).iframeUrl}
            className="w-full h-[764px]"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default SubBettingPage;
