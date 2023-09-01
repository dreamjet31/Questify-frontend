import { useState, useEffect } from "react";
import { GAME_CONTENTS, KEYS_CONTENT } from "../../data";
import { setKeyNumber, setRewards } from "../../redux/slices/tetrisSlice";
import { BorderPanel } from "../../components/Common/Panels";
import { Button } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiCaller } from "../../utils/fetcher";
import { toast } from "react-toastify";
import { setMyInfo } from "../../redux/slices/tetrisSlice";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";

export type GameContentType = {
  id: number;
  title: string;
  thumbnail: string;
  thumbnailBig?: string;
  iframeUrl?: string;
  description?: string;
  link?: string;
};

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: "Inter-Regular",
  },
});

export const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  fontFamily: "IBMPlexMono-Regular",
  p: 4,
  border: 1,
  borderColor: "#6C9C6E",
  borderRadius: "20px",
  font: "IBMPlexMono-Regular",
  boxShadow: "0 0 10px 0 rgb(43, 100, 50)",
};

const Lootbox = () => {
  const [iframeID, setIframeID] = useState("");
  const dispatch = useDispatch();
  const [buyAmount, setBuyAmount] = useState(0);
  const [keyNum, setKeyNum] = useState(0);
  const [loadingState, setLoadingState] = useState(false);
  const navigate = useNavigate();

  const fetchLeaderboard = async () => {
    var result = await apiCaller.get("users/fetchLeaderboard");
    dispatch(setRewards({ rewards: result.data.data.totalKeyInfo[0] }));
    // console.log(result.data.data.totalKeyInfo[0]);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const { rewards } = useSelector((state: any) => ({
    rewards: state.tetris.rewards,
  }));

  const rewardKey = useSelector((state: any) => ({
    rewardKey: state.tetris.myInfo.rewardKey || {},
  }));

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const myInfo = useSelector((state: any) => ({
    myInfo: state.tetris.myInfo,
  }));

  const buyKey = async () => {
    try {
      const result = await apiCaller.post("users/buyKey", {
        wallet: myInfo.myInfo.wallet,
        keyID: Number(keyNum),
        buyAmount: Number(buyAmount),
      });
      dispatch(setMyInfo({ myInfo: result.data.user }));
      dispatch(setRewards({ rewards: result.data.totalKeyInfo }));
      setLoadingState(false);
      handleClose();
      toast.info(
        `Congrats! You have bought ${buyAmount} ${KEYS_CONTENT[keyNum].name}s`
      );
    } catch (err: any) {
      console.log(err);
    }
  };
  console.log(myInfo?.myInfo?.premiumKey);
  // console.log(rewardKey);
  // console.log(myInfo?.myInfo?.claimedQuests?.lootbox);
  return (
    <div
      className="lg:gap-[30px] gap-[5px] ml-[0px] lg:ml-[20px] xl:ml-[50px] 2xl:ml-[100px] lg:mr-[20px] lg:mt-[100px] md:mt-[100px] sm:mt-[100px]  mt-[80px] mr-[00px]
  text-gray-200 font-[Outfit-Regular]"
    >
      <div className="mx-2 mb-[100px]">
        <div className="text-white font-bold text-[25px] mt-5 mb-2">
          Lootboxe keys
        </div>

        <div className="grid gap-4 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 grid-cols-1 mb-6">
          {KEYS_CONTENT.map((key, index) => (
            <div
              className="col-span-1 flex flex-col cursor-pointer border-gradient-green"
              key={index}
            >
              <div
                className="img-hover-zoom--brightness overflow-hidden w-full p-2 "
                onClick={() => {
                  navigate("/lootbox/play");
                  dispatch(setKeyNumber({ keyNumber: index }));
                  localStorage.setItem("keyNumber", String(index));
                  localStorage.setItem("premium", "false");
                }}
                style={{
                  background:
                    "radial-gradient(circle,  #065f46 0%, #071018 100%)",
                }}
              >
                <img src={key.thumbnail}></img>
              </div>
              <div className="bg-neutral-400 h-1"></div>
              <div className="grid-cols-6 flex flex-row justify-between">
                <div className="col-span-4 flex flex-col justify-left p-2">
                  <div className="font-[SpaceGrotesk-Light] text-[11px] mb-2">
                    Questify Collection
                  </div>
                  <div className="font-[RussoOne-Regular] text-[14px]">
                    Season 1:{" "}
                  </div>
                  <div className="font-[RussoOne-Regular] text-[20px]">
                    {key.name}
                  </div>
                </div>
                <div className="col-span-2 flex flex-col pt-2 pr-1">
                  <div className="border-green-800 bg-green-950 border-[2px] rounded-[6px] flex flex-col pr-3 pl-2 mb-2">
                    <div className="text-[10px] opacity-60">You Own:</div>
                    <div className="text-[12px]">
                      {Number(rewardKey.rewardKey[index])} Keys
                    </div>
                  </div>
                  <div
                    className="border-green-800 bg-green-950 border-[2px] rounded-[6px] flex flex-col px-1 hover:opacity-80"
                    onClick={() => {
                      setKeyNum(index);
                      handleOpen();
                    }}
                  >
                    Buy Now
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {myInfo?.myInfo?.claimedQuests?.lootbox.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        ) !== 0 && (
          <div>
            <div className="text-white font-bold text-[25px] mt-5 mb-2">
              Premium keys
            </div>
            <div className="grid gap-4 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 grid-cols-1 mb-6">
              <div className="col-span-1 flex flex-col cursor-pointer border-gradient-green">
                <div
                  className="img-hover-zoom--brightness overflow-hidden w-full p-2 "
                  onClick={() => {
                    navigate("/lootbox/play");
                    dispatch(setKeyNumber({ keyNumber: 2 }));
                    localStorage.setItem("keyNumber", "2");
                    localStorage.setItem("premium", "true");
                  }}
                  style={{
                    background:
                      "radial-gradient(circle,  #065f46 0%, #071018 100%)",
                  }}
                >
                  <img src="/images/Lootbox/big_compass_key.png"></img>
                </div>
                <div className="bg-neutral-400 h-1"></div>
                <div className="grid-cols-6 flex flex-row justify-between">
                  <div className="col-span-4 flex flex-col justify-left p-2">
                    <div className="font-[SpaceGrotesk-Light] text-[11px] mb-2">
                      Questify Collection
                    </div>
                    <div className="font-[RussoOne-Regular] text-[14px]">
                      Season 1:
                    </div>
                    <div className="font-[RussoOne-Regular] text-[20px]">
                      Compass Key
                    </div>
                  </div>
                  <div className="col-span-2 flex flex-col pt-2 pr-1">
                    <div className="border-green-800 bg-green-950 border-[2px] rounded-[6px] flex flex-col pr-3 pl-2 mb-2">
                      <div className="text-[10px] opacity-60">You Own:</div>
                      <div className="text-[12px]">
                        {myInfo?.myInfo?.premiumKey} Keys
                      </div>
                    </div>
                    {/* <div
                  className="border-green-800 bg-green-950 border-[2px] rounded-[6px] flex flex-col px-1 hover:opacity-80"
                  onClick={() => {}}
                >
                  More
                </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <ThemeProvider theme={darkTheme}>
          <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ textAlign: "center" }}
                color="white"
              >
                <div className="flex flex-row justify-center gap-2">
                  <div>Buy{" ("}</div>
                  <img
                    src={KEYS_CONTENT[Number(keyNum)].img}
                    width={30}
                    height={30}
                  />
                  {"="}
                  {KEYS_CONTENT[Number(keyNum)].price}
                  {" X"}
                  <img src="/images/logo2.png" width={30} height={30} />
                  {")"}
                </div>
              </Typography>
              <div className="flex flex-row mt-3 justify-between">
                <TextField
                  id="outlined-number"
                  label="Deposit amount"
                  type="number"
                  className="w-[240px] color-white"
                  size="small"
                  color="success"
                  value={buyAmount}
                  onChange={(e) => {
                    try {
                      setBuyAmount(Number(e.target.value));
                    } catch (err) {
                      toast.warn("Input correct amount");
                      // setClaimLoading(false);
                    }
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <LoadingButton
                  variant="contained"
                  color="success"
                  loading={loadingState}
                  sx={{ textTransform: "none" }}
                  onClick={() => {
                    if (buyAmount <= 0 || buyAmount != Math.floor(buyAmount)) {
                      toast.warn("Input correct balance");
                      return;
                    } else if (
                      myInfo?.myInfo?.totalBalance <
                      buyAmount * KEYS_CONTENT[keyNum].price
                    ) {
                      handleClose();
                      toast.warn("Your balance is not enough ");
                    } else if (
                      rewards?.claimedKey?.[keyNum] + buyAmount >
                      rewards?.totalKey?.[keyNum]
                    ) {
                      toast.warn(
                        "Sorry, we don't have enough keys to give you"
                      );
                    } else {
                      setLoadingState(true);
                      buyKey();
                    }
                    console.log(buyAmount);
                  }}
                >
                  Buy
                </LoadingButton>
              </div>
            </Box>
          </Modal>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Lootbox;
