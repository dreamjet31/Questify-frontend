import React from "react";

type BorderPanelType = {
  children: any;
  style?: string;
  className?: string;
};

const DJBorderPanel = (props: BorderPanelType) => {
  return (
    <div
      className={`sm:w-full mt-4 border-[#4F5056] bg-[#071018] border-[2px]
      ${props.style ? props.style : ""}
      ${props.className ? props.className : ""}`}
    >
      {props.children}
    </div>
  );
};

export default DJBorderPanel;
