import { GameContentType } from "../../../pages/Games";
import DJSubBannerBox from "../DJSubBannerBox";

const isSmallDevice = window.matchMedia("(max-width: 600px)").matches;

const DJSubBettingBanner = (props: GameContentType) => {
  return (
    <div className="relative min-h-[300px] mt-4">
      {/* {!isSmallDevice ? (
        <img
          src="/images/betting/sub-bet.png"
          alt="bet"
          className="rounded-t-[16px] min-h-[300px]"
        />
      ) : ( */}
      <img
        src={props.thumbnailBig}
        alt="bet"
        className="rounded-t-[16px] min-h-[300px]"
      />
      {/* )} */}
      <DJSubBannerBox
        id={props.id}
        title={props.title}
        thumbnail={props.thumbnail}
        iframeUrl={props.iframeUrl}
      />
    </div>
  );
};

export default DJSubBettingBanner;
