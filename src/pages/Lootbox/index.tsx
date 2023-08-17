import { useState, useEffect } from "react";
import { GAME_CONTENTS, KEYS_CONTENT } from "../../data";
import { setKeyNumber } from "../../redux/slices/tetrisSlice";
import { BorderPanel } from "../../components/Common/Panels";
import { Button } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiCaller } from "../../utils/fetcher";

export type GameContentType = {
  id: number;
  title: string;
  thumbnail: string;
  thumbnailBig?: string;
  iframeUrl?: string;
  description?: string;
  link?: string;
};

const Lootbox = () => {
  // const [iframeMode, setIframeMode] = useState(false);
  const [iframeID, setIframeID] = useState("");
  const dispatch = useDispatch();
  // const { iframeMode } = useSelector((state: any) => ({
  //   iframeMode: state.tetris.iframeMode,
  // }));
  const navigate = useNavigate();
  const fetchLeaderboard = async () => {
    var result = await apiCaller.get("users/fetchLeaderboard");
    console.log(result.data.data.totalKeyInfo[0]);
  };

  useEffect(() => {
    fetchLeaderboard();
    // initSocket();
  }, []);

  const rewardKey = useSelector((state: any) => ({
    rewardKey: state.tetris.myInfo.rewardKey || [],
  }));

  return (
    <div
      className="lg:gap-[30px] gap-[5px] ml-[0px] lg:ml-[20px] xl:ml-[50px] 2xl:ml-[100px] lg:mr-[20px] lg:mt-[100px] md:mt-[100px] sm:mt-[100px]  mt-[80px] mr-[00px]
  text-gray-200 font-[Outfit-Regular]"
    >
      <div className="mx-2 mb-[100px]">
        <div className="text-white font-bold text-[25px] mt-5 mb-2">
          Lootboxes
        </div>

        <div className="grid gap-6 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 grid-cols-1 mb-6">
          {KEYS_CONTENT.map((key, index) => (
            <BorderPanel>
              <div
                className="col-span-1 flex flex-col p-[1px] cursor-pointer"
                key={index}
              >
                <div
                  className={`py-2 flex justify-around gap-2 rounded-t-2xl ${`bg-[#0C1620]`}`}
                >
                  <div className="flex flex-row gap-1">
                    <img src={key.img} alt="logo" width={24} height={24} />
                    <p>{key.name}</p>
                  </div>
                  <div>100/{key.totalAmount}</div>
                </div>
                <div
                  className="img-hover-zoom--brightness overflow-hidden w-full rounded-t-2xl"
                  onClick={() => {
                    navigate("/lootbox/play");
                    dispatch(setKeyNumber({ keyNumber: index }));

                    // navigate(string(GAME_CONTENTS[index].link));
                  }}
                >
                  <img src={key.thumbnail}></img>
                </div>
                <div className="flex md:flex-row xs:flex-col-reverse py-2">
                  <div className="text-[16px] text-center w-full flex flex-row justify-around">
                    {/* <div className="text-[#929298] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-b hover:from-green-500 hover:to-white">
                      {key.name}
                    </div> */}
                    <Button
                      color="success"
                      variant="contained"
                      style={{
                        marginTop: "10px",
                        textTransform: "none",
                        color: "white",
                        fontFamily: "Outfit-Regular",
                        backgroundColor: "#082f49",
                      }}
                    >
                      <div className="flex flex-row gap-1">
                        {rewardKey.rewardKey[index] || 0} owned keys
                      </div>
                    </Button>
                    <Button
                      color="success"
                      variant="contained"
                      style={{
                        marginTop: "10px",
                        textTransform: "none",
                        color: "white",
                        // fontWeight: "600",
                        fontFamily: "Outfit-Regular",
                        // backgroundColor: "#059669",
                      }}
                    >
                      <div className="flex flex-row gap-1">Buy key</div>
                    </Button>
                  </div>
                </div>
              </div>
            </BorderPanel>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lootbox;
