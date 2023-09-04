import { useState, useEffect, useContext } from "react";
import { GeneralPanel } from "../../components/Common/Panels";
import QuestLeaderboard from "../../components/Leaderboard/QuestLeaderboard";
import QuestBanner from "../../components/Quests/QuestBanner";
import QuestProgress from "../../components/Quests/QuestProgress";
import { useSelector, useDispatch } from "react-redux";
import { WalletWindowKey } from "@sei-js/core";
import { SeiWalletContext } from "@sei-js/react";
import Grid from "@mui/material/Grid";
import CompassBanner from "../../components/Quests/CompassBanner";
import CompassBannerMobile from "../../components/Quests/CompassBannerMobile";

const isSmallDevice = window.matchMedia("(max-width: 600px)").matches;

const Quests = () => {
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

  const { myInfo } = useSelector((state: any) => ({
    myInfo: state.tetris.myInfo,
  }));

  const { myXP } = useSelector((state: any) => ({
    myXP: state.tetris.myXP,
  }));

  return (
    <div>
      <div
        className="lg:gap-[30px] gap-1 ml-[0px] lg:ml-[10px] xl:ml-[20px] 2xl:ml-[100px] 
          sm:mt-[100px] mt-[60px] lg:mr-[20px] mr-[0px] mb-[80px] text-gray-200"
      >
        <Grid
          container
          spacing={0}
          columns={{ xl: 12, lg: 12, md: 12, sm: 4, xs: 4 }}
        >
          <Grid item xl={12} lg={12} md={12} sm={4} xs={4}>
            <div className="mt-5">{!isSmallDevice && <CompassBanner />}</div>
          </Grid>
          <Grid item xl={9} lg={9} md={8} sm={4} xs={4}>
            <GeneralPanel>
              {/* <div className="sticky top-20 z-20 ml-2">
                {isSmallDevice && <QuestProgress />}
              </div> */}
              <div>{isSmallDevice && <CompassBannerMobile />}</div>
              <QuestBanner
                title="Questify Quests"
                id={0}
                icon="/images/logos/main-logo.png"
                reward="Compass Key"
              />
              <QuestBanner
                title="Tetrisk Quests"
                id={1}
                icon="/images/betting/week/game1.png"
                reward="Compass Key"
              />
              <QuestBanner
                title="Double Jump Quests (Coming Soon)"
                id={2}
                icon="/images/betting/week/game2.png"
                reward="Compass Key"
              />
            </GeneralPanel>
          </Grid>
          <Grid item xl={3} lg={3} md={4} sm={4} xs={4}>
            <GeneralPanel>
              {/* {!isSmallDevice && <QuestProgress />} */}

              <QuestLeaderboard />
            </GeneralPanel>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Quests;
