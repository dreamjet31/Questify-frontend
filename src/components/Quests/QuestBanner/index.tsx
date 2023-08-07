import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { QUESTIFY_QUESTS, CLAIM_BOX_ITEMS } from "../../../data";
import { BorderPanel } from "../../Common/Panels";
import QuestBox from "../QuestBox";
import ClaimBox from "../ClaimBox";
import { QuestBoxType } from "../QuestBox";
import { apiCaller } from "../../../utils/fetcher";
import { setMyInfo } from "../../../redux/slices/tetrisSlice";

export interface QuestBannerProps {
  title: string;
  id: number;
  reward?: string;
  icon?: string;
}

const isSmallDevice = window.matchMedia("(max-width: 600px)").matches;

const QuestBanner = (props: QuestBannerProps) => {
  const dispatch = useDispatch();

  const [questStatus, setQuestStatus] = useState(new Array(15).fill(0));

  const [questifyCount, setQuestifyCount] = useState(new Array(4).fill(0));
  const [communityCount, setCommunityCount] = useState(new Array(4).fill(0));
  const [tetrisCount, setTetrisCount] = useState(new Array(7).fill(0));

  // console.log(questifyCount);

  const countOfTwos = (arr: number[]): number =>
    arr.filter((num) => num === 2).length;
  const { myInfo } = useSelector((state: any) => ({
    myInfo: state.tetris?.myInfo,
  }));

  useEffect(() => {
    // console.log("🙌", myInfo);
  }, []);

  const wallet = localStorage.getItem("connectedAddress");

  const setInitial = async () => {
    try {
      if (wallet) {
        // console.log("😘", wallet);
        const result = await apiCaller.post("users/getMyInfo", {
          wallet,
        });
        // console.log("👌", result.data.data);
        await dispatch(setMyInfo({ myInfo: result.data.data }));
      } else {
        toast.warn("You should connect wallet first!");
        // console.log("😘 else", wallet);
        const result = await apiCaller.post("users/getMyInfo", {
          wallet: "template",
        });
        // console.log("👌", result.data.data);
        await dispatch(setMyInfo({ myInfo: result.data.data }));
      }
    } catch (error) {
      // toast.error("Cannot fetch Data!");
      console.log("Cannot fetch data");
    }
  };

  useEffect(() => {
    setInitial();
  }, []);

  useEffect(() => {
    if (myInfo.achievedQuests?.questify !== undefined) {
      setQuestifyCount(myInfo.achievedQuests?.questify);
      setTetrisCount(myInfo.achievedQuests?.tetris);
      setCommunityCount(myInfo.achievedQuests?.community);
    }
  }, [myInfo]);

  useEffect(() => {
    // console.log("💕", myInfo);
    try {
      let statusArray = new Array(15).fill(0);
      // let myArray: number[][] = [
      //   [...Array(4)].fill(0),
      //   [...Array(4)].fill(0),
      //   [...Array(7)].fill(0),
      // ];
      // console.log("💕1", myInfo.claimedQuests);
      console.log("💕2", myInfo.achievedQuests);
      for (let i = 0; i < 15; i++) {
        if (i < 4) {
          myInfo?.claimedQuests?.community[i] == 1
            ? (statusArray[i] = 2)
            : myInfo?.achievedQuests?.community[i] ==
              QUESTIFY_QUESTS[i].untilClaim
            ? (statusArray[i] = 1)
            : (statusArray[i] = 0);
        } else if (i < 8) {
          myInfo.claimedQuests?.questify[i - 4] == 1
            ? (statusArray[i] = 2)
            : myInfo.achievedQuests?.questify[i - 4] ==
              QUESTIFY_QUESTS[i].untilClaim
            ? (statusArray[i] = 1)
            : (statusArray[i] = 0);
        } else {
          myInfo.claimedQuests?.tetris[i - 8] == 1
            ? (statusArray[i] = 2)
            : myInfo.achievedQuests?.tetris[i - 8] ==
              QUESTIFY_QUESTS[i].untilClaim
            ? (statusArray[i] = 1)
            : (statusArray[i] = 0);
        }
      }

      // console.log(QUESTIFY_QUESTS);
      console.log("🥲", myInfo.claimedQuests.tetris);
      console.log("😊", myInfo.achievedQuests.questify);
      console.log(QUESTIFY_QUESTS[8].untilClaim);
      console.log("🤣", statusArray);

      setQuestStatus(statusArray);
    } catch (error) {}
  }, [myInfo]);

  console.log(questStatus);

  return (
    <div className="w-full">
      <BorderPanel>
        <div className="flex w-full px-6 py-2 bg-sky-600/5 border-[#132236] border-b justify-between">
          <div className="flex items-center font-[Outfit-Regular]">
            <div className="w-[30px] mr-3">
              <img src={props.icon}></img>
            </div>
            <div className="quest_banner_title mr-10">{props.title}</div>
            <div>
              {!isSmallDevice && <span>Completion:&nbsp;</span>}
              {props.id == 0 ? (
                <>{countOfTwos(questStatus.slice(0, 4))} / 4</>
              ) : props.id == 1 ? (
                <>{countOfTwos(questStatus.slice(4, 8))} / 4</>
              ) : (
                <>{countOfTwos(questStatus.slice(8))} / 7</>
              )}
            </div>
          </div>
          {!isSmallDevice && (
            <div className="flex items-center">
              <span className="text-[#8D8D8D] mr-1">Reward:</span>
              {props.reward}
              <img
                src="/images/quests/xp.png"
                className="h-[16px] rounded-full ml-1"
                alt="icon"
                width={16}
                height={16}
              />
            </div>
          )}
        </div>

        <div className="flex flex-row justify-center items-center content-center pt-4 mb-4">
          <div className={isSmallDevice ? "block" : "flex"}>
            <div
              className={
                isSmallDevice
                  ? "flex flex-col justify-center mb-8"
                  : "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 custom-2xl:grid-cols-4 2xl:gap-6 gap-1 mb-8 justify-between"
              }
            >
              {props.id == 0 &&
                QUESTIFY_QUESTS.slice(0, 4).map((quest, index) => (
                  <div>
                    <QuestBox
                      key={index}
                      {...quest}
                      index={index}
                      active={questStatus[index]}
                    />
                  </div>
                ))}
              {props.id == 1 &&
                QUESTIFY_QUESTS.slice(4, 8).map((quest, index) => (
                  <QuestBox
                    key={index}
                    {...quest}
                    index={index + 4}
                    active={questStatus[index + 4]}
                  />
                ))}
              {props.id == 2 &&
                QUESTIFY_QUESTS.slice(8).map((quest, index) => (
                  <QuestBox
                    key={index}
                    {...quest}
                    index={index + 8}
                    active={questStatus[index + 8]}
                  />
                ))}
            </div>
            <div
              className={
                isSmallDevice
                  ? "flex justify-center items-center"
                  : "xl:min-w-[210px] 2xl:min-w-[240px] flex justify-end items-center"
              }
            >
              {/* <div className="w-[100] flex">asdfasdf</div> */}
              <ClaimBox
                title="Compass!"
                description="You won a passport, claim it now!"
                amount={50}
                active={1}
                thumbnail="/images/logos/departLogo.png"
              ></ClaimBox>
            </div>
          </div>
        </div>
      </BorderPanel>
    </div>
  );
};

export default QuestBanner;
