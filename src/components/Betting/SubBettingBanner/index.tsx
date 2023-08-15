import SubBettingBannerBox from "../SubBettingBannerBox";
import { GameContentType } from "../../../pages/Games";

const isSmallDevice = window.matchMedia("(max-width: 600px)").matches;

const SubBettingBanner = (props: GameContentType) => {
  return (
    <div className="relative min-h-[300px]">
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
      <SubBettingBannerBox
        id={props.id}
        title={props.title}
        thumbnail={props.thumbnail}
        iframeUrl={props.iframeUrl}
      />
    </div>
  );
};

export default SubBettingBanner;
