import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BorderPanel, GeneralPanel } from "../../Common/Panels";
import CompassLogo from "../CompassLogo";
import { ProgressBar } from "react-toastify/dist/components";
import { COMPASS_BOX_FREE, COMPASS_BOX_COMPASS } from "../../../data";
import CheckIcon from "@mui/icons-material/Check";
import LockIcon from "@mui/icons-material/Lock";
import ArrowCircleRightTwoToneIcon from "@mui/icons-material/ArrowCircleRightTwoTone";
import ArrowCircleLeftTwoToneIcon from "@mui/icons-material/ArrowCircleLeftTwoTone";
import { LEVEL_PASS_NUMS } from "../../../data";

const CompassBanner = () => {
  const [state, setState] = useState(true);
  const startIndex = state ? 0 : 5;
  const endIndex = state ? 5 : 10;
  const level = useSelector((state: any) => state.tetris.myInfo.level);
  const levelNumbers: number[] = Array.from(
    { length: 10 },
    (_, index) => index + 1
  );

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

                  <div className="flex flex-col mb-12">
                    <div className="-rotate-90 ">Compass</div>
                    <div className="w-10 mt-8 ml-4">
                      <img src="/images/quests/compass_box/compass_lock.png" />
                    </div>
                  </div>
                </div>

                <div className="col2">
                  <div className="flex flex-row justify-around">
                    {COMPASS_BOX_FREE.slice(startIndex, endIndex).map(
                      (i, index) => (
                        <div
                          className={`col2_item${
                            state
                              ? index < level
                                ? "_opened"
                                : ""
                              : index + 5 < level
                              ? "_opened"
                              : ""
                          }`}
                          key={index}
                        >
                          <div className="relative">
                            <div className="p-2">
                              <img
                                src={
                                  state
                                    ? index < level || index + 5 < level
                                      ? i.activeThumbnail
                                      : i.inactiveThumbnail
                                    : i.inactiveThumbnail
                                }
                                className="self-center mx-auto"
                                width={"70px"}
                              />

                              <div className="flex justify-center text-[14px]">
                                {i.title}
                              </div>
                              <div
                                className="flex justify-center text-[12px] text-[#51B09F]"
                                style={{
                                  color: state
                                    ? index < level || index + 5 < level
                                      ? "#51B09F"
                                      : "#18191C"
                                    : "#18191C",
                                }}
                              >
                                <CheckIcon fontSize="small" />
                                Complete
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  <div>
                    <div className="relative bg-gray-800 flex items-center">
                      <div className="flex flex-row justify-between absolute z-20 w-full mt-4">
                        {levelNumbers
                          .slice(startIndex, endIndex)
                          .map((i, index) => (
                            <div
                              key={index}
                              className="flex relative h-40 w-full justify-around items-center"
                            >
                              <div className="absolute z-10">
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

                              <span className="absolute text-white text-center mt-1 z-10">
                                {i}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div className="parent_line h-3 rounded-sm">
                    {state ? (
                      <div
                        className={`flex absolute child_line rounded-sm`}
                        style={{ width: (level / 5) * 100 + "%" }}
                      ></div>
                    ) : (
                      level > 5 && (
                        <div
                          className={`flex absolute child_line rounded-sm`}
                          style={{ width: ((level - 5) / 5) * 100 + "%" }}
                        ></div>
                      )
                    )}
                  </div>

                  <div className="flex flex-row justify-around ">
                    {COMPASS_BOX_COMPASS.slice(startIndex, endIndex).map(
                      (i, index) => (
                        <div
                          className={
                            !i.free
                              ? `col2_item_locked`
                              : i < level
                              ? `col2_item`
                              : `col2_item_opened`
                          }
                          key={index}
                        >
                          <div>
                            <div className="p-2">
                              <img
                                src={
                                  i < level
                                    ? i.activeThumbnail
                                    : i.inactiveThumbnail
                                }
                                className="self-center mx-auto"
                                width={"70px"}
                              />
                              <div className="flex justify-center text-[14px]">
                                {i.title}
                              </div>
                              {i.free == true ? (
                                <div
                                  className="flex justify-center text-[12px] text-[#51B09F]"
                                  style={{
                                    color: i.opened ? "#51B09F" : "#18191C",
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
                      )
                    )}
                  </div>
                </div>

                <div className="mt-[194px] w-[50px] flex justify-center cursor-pointer">
                  <div
                    onClick={() => {
                      setState(!state);
                    }}
                  >
                    {state ? (
                      <ArrowCircleRightTwoToneIcon
                        color="success"
                        fontSize="large"
                      />
                    ) : (
                      <ArrowCircleLeftTwoToneIcon
                        color="success"
                        fontSize="large"
                      />
                    )}
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
    </div>
  );
};

export default CompassBanner;
