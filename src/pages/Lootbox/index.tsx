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

  // console.log("😰", rewards);

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

  // console.log("🤩🤩🤩", myInfo);

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

  return (
    <div
      className="lg:gap-[30px] gap-[5px] ml-[0px] lg:ml-[20px] xl:ml-[50px] 2xl:ml-[100px] lg:mr-[20px] lg:mt-[100px] md:mt-[100px] sm:mt-[100px]  mt-[80px] mr-[00px]
  text-gray-200 font-[Outfit-Regular]"
    >
      <div className="mx-2 mb-[100px]">
        <div className="text-white font-bold text-[25px] mt-5 mb-2">
          Lootboxes
        </div>

        <div className="grid gap-6 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 grid-cols-1 mb-6">
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
                  <div>
                    {rewards?.claimedKey?.[index]} /{" "}
                    {rewards?.totalKey?.[index]}
                  </div>
                </div>
                <div
                  className="img-hover-zoom--brightness overflow-hidden w-full rounded-t-2xl"
                  onClick={() => {
                    navigate("/lootbox/play");
                    dispatch(setKeyNumber({ keyNumber: index }));
                    localStorage.setItem("keyNumber", String(index));
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
                      <div
                        className="flex flex-row gap-1"
                        onClick={() => {
                          setKeyNum(index);
                          handleOpen();
                        }}
                      >
                        Buy key
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </BorderPanel>
          ))}
        </div>

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
