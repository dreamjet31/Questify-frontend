import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BorderPanel, GeneralPanel } from "../../Common/Panels";
import CompassLogo from "../CompassLogo";
import { ProgressBar } from "react-toastify/dist/components";
import { COMPASS_BOX_FREE, COMPASS_BOX_COMPASS } from "../../../data";
import CheckIcon from "@mui/icons-material/Check";
import LockIcon from "@mui/icons-material/Lock";
import Grid from "@mui/material/Grid";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const CompassBannerMobile = () => {
  const levelNumbers: number[] = Array.from(
    { length: 10 },
    (_, index) => index + 1
  );

  const level = useSelector((state: any) => state.tetris.myInfo.level);

  return (
    <div className="w-full mt-12">
      <GeneralPanel>
        <BorderPanel>
          <div className="mt-[-50px] ml-[-5px]">
            <div className="">
              <CompassLogo />
            </div>

            <div className="flex flex-col mt-12 mb-10">
              <Grid container spacing={0} columns={{ md: 2, sm: 2, xs: 2 }}>
                <Grid item md={1} sm={1} xs={1}>
                  <div className="flex justify-center">Free</div>
                </Grid>
                <Grid item md={1} sm={1} xs={1}>
                  <div className="flex flex-row items-center justify-center">
                    <div className="w-8 rotate-90">
                      <img src="/images/quests/compass_box/compass_lock.png" />
                    </div>
                    <div className="ml-1">Compass</div>
                  </div>
                </Grid>
              </Grid>

              <Grid container spacing={0} columns={{ md: 9, sm: 9, xs: 9 }}>
                <Grid item md={4} sm={4} xs={4}>
                  <div className="flex flex-col mt-6">
                    {COMPASS_BOX_FREE.map((i, index) => (
                      <div className="flex justify-center ml-5">
                        <div
                          className={
                            index < level
                              ? `col2_item_mobile_opened`
                              : `col2_item_mobile`
                          }
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
                                className="self-center mx-auto"
                                width={"80px"}
                              />
                            </div>
                          </div>
                        </div>
                        {index < level ? (
                          <div className="z-5 ml-[-25px] mr-[-10px] mt-[-8px]">
                            <CheckBoxIcon color="success" fontSize="large" />
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    ))}
                  </div>
                </Grid>
                <Grid item md={1} sm={1} xs={1}>
                  <div className="flex flex-col mt-6  justify-center ml-[-5px]">
                    {levelNumbers.map((i, index) => (
                      <BorderPanel
                        className={`rotate-45 rounded-1 w-12 h-12 mt-[27px] mb-[27px] ${
                          index < level ? "glow-effect-green" : "glow-effect"
                        }`}
                      >
                        <div className="-rotate-45 flex justify-center mt-3">
                          {i}
                        </div>
                      </BorderPanel>
                    ))}
                  </div>
                </Grid>
                <Grid item md={4} sm={4} xs={4}>
                  <div className="flex flex-col mt-6">
                    {COMPASS_BOX_COMPASS.map((i, index) => (
                      <div className="flex justify-center mr-5">
                        <div
                          className={
                            !i.free
                              ? `col2_item_mobile_locked`
                              : !i.opened
                              ? `col2_item_mobile`
                              : `col2_item_mobile_opened`
                          }
                          key={index}
                        >
                          <div className="relative">
                            <div className="p-2">
                              <img
                                src={
                                  i.opened == true
                                    ? i.activeThumbnail
                                    : i.inactiveThumbnail
                                }
                                className="self-center mx-auto"
                                width={"80px"}
                              />
                            </div>
                          </div>
                        </div>
                        {!i.free ? (
                          <div className="z-5 ml-[-25px] mt-[-8px]">
                            <LockIcon fontSize="large" />
                          </div>
                        ) : (
                          <div></div>
                        )}
                        {i.opened ? (
                          <div className="z-5 ml-[-25px] mt-[-8px]">
                            <CheckBoxIcon color="success" fontSize="large" />
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    ))}
                  </div>
                </Grid>
              </Grid>

              <div className="flex justify-center">
                <div className="w-[95%] h-[220px] flex justify-center relative mt-4">
                  <div className="absolute w-full pb-[100%] items-center justify-center align-middle">
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
    </div>
  );
};

export default CompassBannerMobile;
