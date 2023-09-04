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
  const [djCount, setDjCount] = useState(new Array(4).fill(0));
  const [tetrisCount, setTetrisCount] = useState(new Array(7).fill(0));
  const [lootboxCount, setLootboxCount] = useState(new Array(4).fill(0));

  const countOfTwos = (arr: number[]): number =>
    arr.filter((num) => num === 2).length;
  const { myInfo } = useSelector((state: any) => ({
    myInfo: state.tetris?.myInfo,
  }));

  const wallet = localStorage.getItem("connectedAddress");

  const setInitial = async () => {
    try {
      if (wallet) {
        const result = await apiCaller.post("users/getMyInfo", {
          wallet,
        });
        await dispatch(setMyInfo({ myInfo: result.data.data }));
      } else {
        const result = await apiCaller.post("users/getMyInfo", {
          wallet: "template",
        });
        await dispatch(setMyInfo({ myInfo: result.data.data }));
      }
    } catch (error) {
      console.log("Cannot fetch data");
    }
  };

  useEffect(() => {
    setInitial();
  }, []);

  useEffect(() => {
    if (myInfo?.achievedQuests?.questify !== undefined) {
      setQuestifyCount(myInfo?.achievedQuests?.questify);
      setTetrisCount(myInfo?.achievedQuests?.tetris);
      setCommunityCount(myInfo?.achievedQuests?.community);
      setDjCount(myInfo?.achievedQuests?.doublejump);
      setLootboxCount(myInfo?.achievedQuests?.lootbox);
    }
  }, [myInfo]);

  useEffect(() => {
    // console.log("💕", myInfo);
    let statusArray = new Array(18).fill(0);
    try {
      for (let i = 0; i < 18; i++) {
        // console.log(i);
        if (i < 4) {
          myInfo?.claimedQuests?.questify[i] == 1
            ? (statusArray[i] = 2)
            : myInfo?.achievedQuests?.questify[i] ==
              QUESTIFY_QUESTS[i].untilClaim
            ? (statusArray[i] = 1)
            : (statusArray[i] = 0);
        } else if (i < 11) {
          myInfo?.claimedQuests?.tetris[i - 4] == 1
            ? (statusArray[i] = 2)
            : myInfo?.achievedQuests?.tetris[i - 4] ==
              QUESTIFY_QUESTS[i].untilClaim
            ? (statusArray[i] = 1)
            : (statusArray[i] = 0);
        } else if (i < 15) {
          myInfo?.claimedQuests?.doublejump[i - 11] == 1
            ? (statusArray[i] = 2)
            : myInfo?.achievedQuests?.doublejump[i - 11] ==
              QUESTIFY_QUESTS[i].untilClaim
            ? (statusArray[i] = 1)
            : (statusArray[i] = 0);
        } else {
          myInfo?.claimedQuests?.lootbox[i - 15] == 1
            ? (statusArray[i] = 2)
            : myInfo?.achievedQuests?.lootbox[i - 15] == 1
            ? (statusArray[i] = 1)
            : (statusArray[i] = 0);
        }
      }
      // console.log(statusArray);
      setQuestStatus(statusArray);
      // console.log(statusArray);
    } catch (error) {}
  }, [myInfo]);

  return (
    <div className="w-full">
      <BorderPanel>
        <div className="flex w-full px-6 py-2 bg-sky-600/5 border-[#132236] border-b justify-between">
          <div className="flex items-center font-[Outfit-Regular]">
            <div className="w-[30px] mr-3">
              <img src={props.icon} className="rounded-full"></img>
            </div>
            <div className="quest_banner_title mr-10">{props.title}</div>
            <div>
              {!isSmallDevice && <span>Completion:&nbsp;</span>}
              {props.id == 0 ? (
                <>{countOfTwos(questStatus.slice(0, 4))} / 4</>
              ) : props.id == 1 ? (
                <>{countOfTwos(questStatus.slice(4, 11))} / 7</>
              ) : (
                <>{countOfTwos(questStatus.slice(11, 15))} / 4</>
              )}
            </div>
          </div>
          {!isSmallDevice && (
            <div className="flex items-center">
              <span className="text-[#8D8D8D] mr-1">Reward:</span>
              {props.reward}
              {/* <img
                src="/images/quests/xp.png"
                className="h-[16px] rounded-full ml-1"
                alt="icon"
                width={16}
                height={16}
              /> */}
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
                QUESTIFY_QUESTS.slice(4, 11).map((quest, index) => (
                  <QuestBox
                    key={index}
                    {...quest}
                    index={index + 4}
                    active={questStatus[index + 4]}
                  />
                ))}
              {props.id == 2 &&
                QUESTIFY_QUESTS.slice(11).map((quest, index) => (
                  <QuestBox
                    key={index}
                    {...quest}
                    index={index + 11}
                    active={questStatus[index + 11]}
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
              <ClaimBox
                title="Lootbox key!"
                description="Win the All the Quests and Claim it now!"
                amount={1}
                active={questStatus.slice(15, 17)[props.id]}
                thumbnail="/images/Lootbox/big_compass_key.png"
                id={props.id}
              ></ClaimBox>
            </div>
          </div>
        </div>
      </BorderPanel>
    </div>
  );
};

export default QuestBanner;
