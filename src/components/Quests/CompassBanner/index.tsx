import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BorderPanel, GeneralPanel } from "../../Common/Panels";
import CompassLogo from "../CompassLogo";
import { COMPASS_BOX_FREE, COMPASS_BOX_COMPASS } from "../../../data";
import CheckIcon from "@mui/icons-material/Check";
import LockIcon from "@mui/icons-material/Lock";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import { apiCaller } from "../../../utils/fetcher";
import { darkTheme } from "../../../pages/Lootbox";
import { modalStyle } from "../../../pages/Lootbox";
import { toast } from "react-toastify";
import { setMyInfo } from "../../../redux/slices/tetrisSlice";

const CompassBanner = () => {
  const dispatch = useDispatch();
  const level = useSelector((state: any) => state.tetris.myInfo?.level);
  const levelNumbers: number[] = Array.from(
    { length: 5 },
    (_, index) => index + 1
  );

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [loadingState, setLoadingState] = useState(false);
  const { compass } = useSelector((state: any) => ({
    compass: state.tetris?.myInfo?.compass,
  }));

  const { myInfo } = useSelector((state: any) => ({
    myInfo: state.tetris?.myInfo,
  }));

  const compassUnlock = async () => {
    if (myInfo.totalBalance < 20)
      toast.warn("Sorry, Your balance is not enough!");
    else {
      try {
        const result = await apiCaller.post("users/compassUnlock", {
          wallet: myInfo.wallet,
        });
        dispatch(setMyInfo({ myInfo: result.data.existingUser }));
      } catch (err: any) {
        throw new Error();
      }
    }
  };

  return (
    <div className="w-full">
      <GeneralPanel>
        <BorderPanel>
          <div className="mt-[-60px] ml-[-5px]">
            <CompassLogo />
            <div className="flex flex-col 2xl:mt-8">
              <div className="flex flex-row content-center h-100">
                <div className="w-40 flex flex-col justify-between items-center content-center">
                  <div className="-rotate-90 mt-24">Free</div>

                  {!compass ? (
                    <div
                      className="flex flex-col mb-12 cursor-pointer"
                      onClick={() => {
                        handleOpen();
                      }}
                    >
                      <div className="-rotate-90 ">Compass</div>
                      <div className="w-10 mt-8 ml-4">
                        <img src="/images/quests/compass_box/compass_lock.png" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col mb-20">
                      <div className="-rotate-90 ">Compass</div>
                    </div>
                  )}
                </div>
                <div className="col2">
                  <div className="flex flex-row justify-around">
                    {COMPASS_BOX_FREE.map((i, index) => (
                      <div
                        className={`col2_item${index < level ? "_opened" : ""}`}
                        key={index}
                      >
                        <div className="relative">
                          <div className="p-2">
                            <img
                              src={
                                index < level
                                  ? i.activeThumbnail
                                  : i.inactiveThumbnail
                              }
                              className={`self-center mx-auto ${
                                index == 1 ? "rounded-full" : ""
                              }`}
                              width={"70px"}
                            />

                            <div className="flex justify-center text-[14px]">
                              {i.title}
                            </div>
                            <div
                              className="flex justify-center text-[12px] text-[#51B09F]"
                              style={{
                                color: index < level ? "#51B09F" : "#18191C",
                              }}
                            >
                              <CheckIcon fontSize="small" />
                              Complete
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div className="relative bg-gray-800 flex items-center">
                      <div className="flex flex-row justify-between absolute z-[1] w-full mt-4">
                        {levelNumbers.map((i, index) => (
                          <div
                            key={index}
                            className="flex relative h-40 w-full justify-around items-center"
                          >
                            <div className="absolute z-[1]">
                              {i <= level ? (
                                <div>
                                  <img
                                    src="/images/quests/number-container.svg"
                                    width="30px"
                                    height="30px"
                                  />
                                </div>
                              ) : (
                                <div>
                                  <img
                                    src="/images/quests/number-container-inactive.svg"
                                    width="30px"
                                    height="30px"
                                  />
                                </div>
                              )}
                            </div>

                            <span className="absolute text-white text-center mt-1 z-[1]">
                              {i}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="parent_line h-3 rounded-sm">
                    <div
                      className={`flex absolute child_line rounded-sm`}
                      style={{ width: (level / 5) * 100 + "%" }}
                    ></div>
                  </div>

                  <div className="flex flex-row justify-around ">
                    {COMPASS_BOX_COMPASS.map((i, index) => (
                      <div
                        className={
                          !compass
                            ? `col2_item_locked`
                            : index < level
                            ? `col2_item_opened`
                            : `col2_item`
                        }
                        key={index}
                      >
                        <div>
                          <div className="p-2">
                            <img
                              src={
                                index < level && compass
                                  ? i.activeThumbnail
                                  : i.inactiveThumbnail
                              }
                              className="self-center mx-auto"
                              width={"70px"}
                            />
                            <div className="flex justify-center text-[14px]">
                              {i.title}
                            </div>
                            {compass ? (
                              <div
                                className="flex justify-center text-[12px] text-[#51B09F]"
                                style={{
                                  color: index < level ? "#51B09F" : "#18191C",
                                }}
                              >
                                <CheckIcon fontSize="small" />
                                Complete
                              </div>
                            ) : (
                              <div className="flex justify-center text-[black]">
                                <LockIcon />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-[450px] flex justify-center relative mr-5 my-8">
                  <div className="absolute top-[20%] w-full h-0 pb-[100%] items-center justify-center align-middle">
                    <img
                      src="/images/quests/compass_box/lock_back.png"
                      className="object-cover rounded-md items-center align-middle justify-center"
                    />
                  </div>
                  <div className="blure"></div>
                  <div className="rounded_lock cursor-pointer">
                    <img
                      src="/images/quests/compass_box/rounded-lock.svg"
                      width="100px"
                      height="100px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderPanel>
      </GeneralPanel>

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
                <div>Unlock Compass with 20 </div>
                <img
                  src="/images/logos/main-logo.png"
                  className="w-[30px] h-[30px]"
                />
              </div>
            </Typography>
            <div className="mt-5 flex flex-row justify-between mx-3">
              <LoadingButton
                color="success"
                sx={{ textTransform: "none" }}
                onClick={() => {
                  handleClose();
                }}
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                variant="contained"
                color="success"
                loading={loadingState}
                sx={{ textTransform: "none" }}
                onClick={() => {
                  setLoadingState(true);
                  compassUnlock();
                  setLoadingState(false);
                  handleClose();
                }}
              >
                Unlock
              </LoadingButton>
            </div>
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
};

export default CompassBanner;
