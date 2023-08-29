import { useState } from "react";
import { GAME_CONTENTS } from "../../data";
import { BorderPanel } from "../../components/Common/Panels";
import { Button } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIframeMode } from "../../redux/slices/tetrisSlice";
// import { setIframeMode } from "../../redux/slices/tetrisSlice";

export type GameContentType = {
  id?: number;
  title?: string;
  thumbnail?: string;
  thumbnailBig?: string;
  iframeUrl?: string;
  description?: string;
  link?: string;
};

const Games = () => {
  // const [iframeMode, setIframeMode] = useState(false);
  const [iframeID, setIframeID] = useState("");
  const dispatch = useDispatch();
  // const { iframeMode } = useSelector((state: any) => ({
  //   iframeMode: state.tetris.iframeMode,
  // }));
  const navigate = useNavigate();

  return (
    <div
      className="lg:gap-[30px] gap-[5px] ml-[0px] lg:ml-[20px] xl:ml-[50px] 2xl:ml-[100px] lg:mr-[20px] lg:mt-[100px] md:mt-[100px] sm:mt-[100px]  mt-[80px] mr-[00px]
  text-gray-200"
    >
      <div className="mx-2 mb-[100px]">
        <div className="text-white font-bold text-[25px] mt-5 mb-2">
          Library
        </div>

        <div className="grid gap-6 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 grid-cols-1 mb-6">
          {GAME_CONTENTS.map((game, index) => (
            <BorderPanel>
              <div
                className="col-span-1 flex flex-col p-[1px] cursor-pointer"
                key={index}
                onClick={() => {
                  localStorage.setItem("iframeID", String(index + 1));
                  dispatch(setIframeMode({ iframeMode: false }));
                  const linkAddr = String(GAME_CONTENTS[index].link);
                  navigate(linkAddr);
                  // navigate(string(GAME_CONTENTS[index].link));
                }}
              >
                <div className="img-hover-zoom--brightness overflow-hidden w-full rounded-t-2xl">
                  <img src={game.thumbnail}></img>
                </div>
                <div className="flex md:flex-row xs:flex-col-reverse py-2">
                  <div className="text-[16px] text-center w-full">
                    <div className="text-[#929298] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-b hover:from-green-500 hover:to-white">
                      {game.title}
                    </div>
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

export default Games;
