import React from "react";

export interface BorderMenuItemProps {
  name: string;
  active: boolean;
  type: string;
}

export default function DJBorderMenuItem(props: BorderMenuItemProps) {
  return (
    <div
      className={`flex justify-center items-center rounded-[40px] border-[2px] 
                          font-[500] text-[12px]
                          font-[IBMPlexSans-Regular] uppercase
                          cursor-pointer ${
                            props.type == "large" ? "h-[48px]" : "h-[32px]"
                          } px-[13px] ${
        props.active
          ? "border-[#FE7807] text-black bg-white"
          : "border-[#272829] text-[#929298] bg-[#131314] hover:border-[#FE7807]"
      } `}
    >
      <p className="whitespace-nowrap">{props.name}</p>
    </div>
  );
}
