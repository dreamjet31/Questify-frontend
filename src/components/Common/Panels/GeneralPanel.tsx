import React from "react";

type GeneralPanelType = {
  children: any;
  style?: string;
};

const GeneralPanel = (props: GeneralPanelType) => {
  return (
    <div
      className={`w-full md:p-[20px] p-[5px] ${props.style ? props.style : ""}`}
    >
      {props.children}
    </div>
  );
};

export default GeneralPanel;
