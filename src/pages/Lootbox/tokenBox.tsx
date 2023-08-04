import { useState } from 'react';
export interface TokenBoxProps {
  data: any;
  revealColor?: boolean;
}

const TokenBox = ({data, revealColor}: TokenBoxProps) => {
  return(
    <div className={`h-[410px] lg:min-w-[17vw] min-w-[35vw] border ${data.selected && revealColor ? "border-[#ff2525]" : " border-[#162234]"} rounded-lg bg-[#091017] text-center`} >
      <div className={`py-2 flex justify-evenly ${data.selected && revealColor ? "bg-[#ff2525]" : `bg-[#0C1620]`}`} >
        <div className="z-[20]">
          <img src={data.img} alt="logo" width={24} height={24} />
        </div>
        <p>{data.name}</p>
      </div>
      <div className="flex flex-col space-y-9 items-center my-20 px-5">
        <div className="z-[20]">
          <img src={data.img} alt="logo" width={156} height={156}/>
        </div>
        <div><p>{data.value}</p></div>
      </div>

    </div>
  );
}

export default TokenBox;