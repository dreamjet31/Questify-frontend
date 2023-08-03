import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
// import { setIframeID, setIframeMode } from "../../../redux/slices/tetrisSlice";
import { useDispatch, useSelector } from "react-redux";

export type BettingBannerType = {
  index: number;
  title: string;
  backgroundImage: string;
  content: any;
  button?: string;
  path?: string;
  iframeUrl?: string;
  link?: string;
};

const isSmallDevice = window.matchMedia("(max-width: 600px)").matches;

const BettingBanner = (props: BettingBannerType) => {
  const navigate = useNavigate();

  // const iframeID = useSelector((state: any) => state.tetris.iframeID);
  // const iframeMode = useSelector((state: any) => state.tetris.iframeMode);

  // useEffect(() => {
  //   console.log("🤣Betting Banner", iframeID);
  // }, iframeID);

  return (
    <div
      className={
        !isSmallDevice
          ? "relative h-[400px] rounded-xl overflow-hidden bg-gradient-to-r from-gray-500 to-white"
          : "relative h-[400px] rounded-xl overflow-hidden bg-gradient-to-r from-black to-gray-500"
      }
    >
      <Grid
        container
        spacing={0}
        columns={{ xl: 12, lg: 12, md: 12, sm: 4, xs: 4 }}
      >
        <Grid item xl={3.5} lg={3.5} md={3.5} sm={4} xs={4}>
          <div className="mx-[20px] mt-[20px]">
            <div className="title-shadow-text xs:text-[20px]">
              {props.title}
            </div>
            <div className="paragraph-shadow-text">{props.content}</div>
            <div className="mt-[10px] flex flex-row items-center">
              +75
              <img
                src="/images/logos/xp.png"
                className="h-[20px] ml-1 mr-3"
              ></img>
              +100
              <img
                src="/images/logos/tetris-exp.png"
                className="h-[20px] ml-1"
              ></img>
            </div>
            <Button
              color="success"
              variant="contained"
              style={{
                marginTop: "10px",
                textTransform: "none",
                color: "black",
                backgroundColor: "cyan",
                fontWeight: "550",
              }}
              onClick={() => {
                // dispatch(setIframeID({ iframeID: props.index }));
                // dispatch(setIframeMode({ iframeMode: true }));
                localStorage.setItem("iframeID", String(props.index));
                navigate(String(props.link));
                // console.log(props.link, props.index);
              }}
            >
              {props.button}
            </Button>
          </div>
        </Grid>

        <Grid item xl={5} lg={5} md={5} sm={4} xs={4}>
          {!isSmallDevice && (
            <div className="flex justify-center align-middle items-center h-[350px]">
              <img
                src={props.backgroundImage}
                className=" rounded-lg w-[40%]"
                alt={props.title}
              />
            </div>
          )}
        </Grid>
      </Grid>
      <div className="absolute bg-black/40 bottom-0 left-0 w-full h-[00px] shadow-xl md:backdrop-blur flex md:flex-row flex-col"></div>
    </div>
  );
};

export default BettingBanner;
