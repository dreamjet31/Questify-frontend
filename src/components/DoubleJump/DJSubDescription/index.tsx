import { useState } from "react";

export interface DescriptionProps {
  title?: string;
  description?: string;
}

function DJSubDescription(props: DescriptionProps) {
  const [expandDescription, setExpandDescription] = useState(false);
  return (
    <div className="flex flex-col mb-[24px] gap-[16px]">
      <div
        className="flex lg:flex-row md:flex-row sm:flex-col xs:flex-col items-center
                      gap-[12px]"
      >
        <div className="text-[#F3F3F3] font-[500] font-[Selobae] text-[48px]">
          {props.title}
        </div>
        <div className="flex flex-row cursor-pointer">
          <div className="mx-1 glow_icon">
            <a href="https://discord.gg/x6JmdHb5" target={"_blank"}>
              <img src="/images/betting/Button2.png"></img>
            </a>
          </div>
          <div className="mx-1 glow_icon">
            <a href="https://twitter.com/tetriskszn" target={"_blank"}>
              <img src="/images/betting/Button3.png"></img>
            </a>
          </div>
        </div>
      </div>

      {props.description && (
        <div className="text-[18px] text-white font-[400] font-[DMMono-Regular]">
          {props.description.length > 200 && !expandDescription
            ? props.description.slice(0, 200) + "..."
            : props.description}
          &nbsp;
          {props.description.length > 200 && !expandDescription && (
            <span
              className="text-primary hover:cursor-pointer"
              onClick={() => setExpandDescription((expand) => !expand)}
            >
              Show more
            </span>
          )}
          {props.description.length > 200 && expandDescription && (
            <span
              className="text-primary hover:cursor-pointer"
              onClick={() => setExpandDescription((expand) => !expand)}
            >
              Show less
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default DJSubDescription;
