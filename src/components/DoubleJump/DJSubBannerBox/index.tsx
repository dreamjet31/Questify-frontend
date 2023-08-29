import { useEffect, useState } from "react";
import { apiCaller } from "../../../utils/fetcher";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { GameContentType } from "../../../pages/Games";
import { useNavigate } from "react-router-dom";

const DJSubBannerBox = (props: GameContentType) => {
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
    <div className="absolute bottom-[20px] text-[#DDDDDD] bg-[#030A13]  rounded-[10px] lg:w-[350px] px-4 py-5 font-500 text-center ml-3">
      <div className="flex justify-start font-[IBMPlexSans-Regular] font-semibold text-[16px]">
        {props.title}
      </div>
      <div className="flex flex-row justify-between font-[IBMPlexMono-Regular]">
        <div className="flex flex-col text-sm">
          <div className="flex justify-start text-[12px] mt-2 items-center">
            Minimum Bet:
            <span className="text-[20px] mx-2 flex flex-row items-center">
              0.01
              <span className="">
                <img src="/images/sei-icon.png" />
              </span>
            </span>
          </div>
          <div className="flex justify-start text-[12px] mt-2 flex-row items-center">
            <div>Play this game:</div>
            <div className="mx-2 flex items-center justify-center text-[#FE7807]">
              <div className="text-center">
                {totalUser.toLocaleString("en-US")}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div
            className="bg-[#FE7807] hover:bg-opacity-80 text-black w-[100px] h-[30px] cursor-pointer text-[12px] flex items-center justify-center "
            onClick={() => {
              // dispatch(setIframeMode({ iframeMode: true }));
              window.open(props.iframeUrl);
            }}
          >
            Play Now
          </div>
        </div>
      </div>
    </div>
  );
};

export default DJSubBannerBox;
