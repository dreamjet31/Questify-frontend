import { useEffect, useState } from "react";
import { apiCaller } from "../../../utils/fetcher";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { GameContentType } from "../../../pages/Games";
import { useNavigate } from "react-router-dom";

const SubBettingBannerBox = (props: GameContentType) => {
  const dispatch = useDispatch();
  const [totalUser, setTotalUser] = useState(0);

  const navigate = useNavigate();

  const fetchTotalUser = async () => {
    try {
      var result = await apiCaller.get("tetrises/fetchTotalUser");
      setTotalUser(result.data.data);
    } catch (err) {
      // toast.error("Cannot fetch Data!");
      // console.log("Cannot fetch data");
    }
  };

  const { iframeID, iframeMode } = useSelector((state: any) => ({
    iframeMode: state.tetris.iframeMode,
    iframeID: state.tetris.iframeID,
  }));

  useEffect(() => {
    fetchTotalUser();
  });

  return (
    <div className="absolute bottom-[20px] text-[#DDDDDD] bg-[#030A13]  rounded-[20px] lg:w-[300px] px-4 py-5 font-500 text-center ml-3">
      <div className="flex justify-start">{props.title}</div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col text-sm">
          <div className="flex justify-start text-[12px] mt-2 items-center">
            Minimum Bet:
            <span className="text-[20px] mx-2 flex flex-row items-center">
              0.1
              <span className="">
                <img src="/images/sei-icon.png" />
              </span>
            </span>
          </div>
          <div className="flex justify-start text-[12px] mt-2 flex-row items-center">
            <div>Play this game:</div>
            <div className="mx-2 flex items-center justify-center text-[#29B080]">
              <div className="text-center">
                {totalUser.toLocaleString("en-US")}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div
            className="bg-[#29B080] text-black rounded-[20px] w-[80px] h-[30px] cursor-pointer text-[16px] flex items-center justify-center"
            onClick={() => {
              // dispatch(setIframeMode({ iframeMode: true }));
              window.open(props.iframeUrl);
            }}
          >
            Play
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubBettingBannerBox;
