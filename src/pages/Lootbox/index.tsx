import LootboxCard from "../../components/Lootbox/LootboxCard";
import LootBoxBar from "../../components/Lootbox/LootboxBar";
import { useState, useEffect, useRef } from "react";
import { Button } from "../../components/Common/Buttons";
// import { Button } from "@mui/material";
import { LOOTBOX_CARD_SILVER } from "../../data";
import RewardsContent from "../../components/Lootbox/RewardsContent";
import KeysContent from "../../components/Lootbox/KeysContent";

const shuffle = (array: Object[]) => {
  const shuffled = [...array].slice();
  let currentIndex = shuffled.length;
  let temporaryValue: Object, randomIndex: number;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = shuffled[currentIndex];
    shuffled[currentIndex] = shuffled[randomIndex];
    shuffled[randomIndex] = temporaryValue;
  }
  return shuffled;
};

//  0.1%, 10%, 1%, 88.9%

const mockBackend = () => {
  const randomCardNum = Math.floor(Math.random() * 1000);
  if (randomCardNum >= 0 && randomCardNum < 1) {
    return 0;
  } else if (randomCardNum >= 3 && randomCardNum <= 101) {
    return 1;
  } else if (randomCardNum >= 111 && randomCardNum < 1000) {
    return 3;
  }
  return 3;
};

const ShuffleArray = () => {
  const selected = mockBackend();
  let shuffledResultArray = [...LOOTBOX_CARD_SILVER];
  for (let index = 0; index < LOOTBOX_CARD_SILVER.length; index++) {
    shuffledResultArray = shuffle(
      [...LOOTBOX_CARD_SILVER].map((item, index) => {
        if (index === selected) {
          return { ...item, selected: true };
        }
        return { ...item, selected: false };
      })
    );
  }
  return shuffledResultArray;
};

const Lootbox = () => {
  const wrapperRef = useRef(null);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [trybtnDisabled, setTryBtnDisabled] = useState(false);
  const [shuffledData, setShuffledData] = useState<Object[]>([]);
  const [translateXNum, setTranslateXNum] = useState<number>((0.5 * 100) / 90); //(8 * 100) / 90
  const [resultArray, setResultArray] = useState<Object[]>([
    ...LOOTBOX_CARD_SILVER,
  ]);
  const [revealColor, setRevealColor] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isReseted, setIsReseted] = useState(true);
  const [readyTry, setReadyTry] = useState(false);
  // const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  useEffect(() => {
    setShuffledData(shuffle([...LOOTBOX_CARD_SILVER]));
  }, []);

  let delay = isChecked ? 2100 : 4100;
  const hadleClickTry = () => {
    const shuffledArray = ShuffleArray();
    setResultArray(shuffledArray);
    let selectedCardIndex = 0;
    for (let index = 0; index < shuffledArray.length; index++) {
      if (shuffledArray[index]["selected"]) {
        selectedCardIndex = index;
      }
    }
    setReadyTry(false);
    setIsSpinning(true);
    setIsReseted(true);
    setShuffledData(shuffle(LOOTBOX_CARD_SILVER));
    console.log(resultArray);
    setTranslateXNum(
      -((4 * 10) / 5 + (selectedCardIndex * 18) / 90 - (2 * 39 + 0.5) / 90) *
        100
    );
    // 4 * 10 / 5   :   4 shuffledDatas, 10 cards per array, 5cards per screen
    // selected * 18 / 90  :  selected:index of selected card in resultArray , 18vw per card including gap-[1vw] , 90vw of screen is visible elsewhere is hidden
    //

    setTimeout(() => {
      setIsSpinning(false);
    }, delay);
    clearTimeout;
  };

  //toggle button

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const hadleClickBtn = () => {
    setTranslateXNum(0);
    setBtnDisabled(true);
    setIsReseted(false);
    setTryBtnDisabled(true);
  };

  const handleReset = () => {
    setTranslateXNum(0);
    setTryBtnDisabled(true);
    setIsReseted(false);
    console.log("trybtnDisabled", trybtnDisabled, "isReseted", isReseted);
  };

  const testReady = () => {
    setReadyTry(true);
  };

  useEffect(() => {
    !isReseted && translateXNum == 0 ? testReady() : null;
  }, [isReseted, translateXNum]);

  useEffect(() => {
    readyTry ? hadleClickTry() : null;
  }, [readyTry]);

  useEffect(() => {
    setRevealColor(false);
    if (!isSpinning) {
      setRevealColor(true);
      setTryBtnDisabled(false);
      // };
    }
    return void 0;
  }, [isSpinning]);

  return (
    <div className="mt-[80px]">
      <KeysContent />
      <div
        className={`relative w-[100vw]  text-gray-200 flex flex-col items-center font-[Outfit-Regular]`}
      >
        <LootBoxBar />
        <div className="w-[95%] overflow-hidden p-0 m-0">
          <div
            ref={wrapperRef}
            className={`flex justify-start gap-[1vw] items-center transition-transform ${
              isReseted
                ? isChecked
                  ? `duration-2000`
                  : `duration-4000`
                : `duration-0`
            } ease-out`}
            style={{ transform: `translateX(${translateXNum}%)` }}
          >
            {shuffledData.map((item, index) => (
              <LootboxCard key={index + "_mock-card-1"} data={item} /> //mockcards
            ))}
            {shuffledData.map((item, index) => (
              <LootboxCard key={index + "_mock-card-2"} data={item} /> //mockcards
            ))}
            {shuffledData.map((item, index) => (
              <LootboxCard key={index + "_mock-card-3"} data={item} /> //mockcards
            ))}
            {shuffledData.map((item, index) => (
              <LootboxCard key={index + "_mock-card-4"} data={item} /> //mockcards
            ))}
            {resultArray.map((item, index) => (
              <LootboxCard
                key={index + "_real-card"}
                data={item}
                revealColor={revealColor}
              /> //realCards
            ))}
            {shuffledData.map((item, index) => (
              <LootboxCard key={index + "_mock-card-5"} data={item} /> //mockcards
            ))}
          </div>
        </div>
        <div className="flex sm:flex-row flex-col">
          {/* Spin button */}
          <div className="z-[30] mx-8 sm:my-8 my-4">
            <Button
              caption={isSpinning ? "Spinning..." : "Spin"}
              onClick={hadleClickBtn}
              disabled={trybtnDisabled}
            />
          </div>
          <div className="flex flex-row sm:my-8 my-4">
            {/* toggle button */}
            <div className="inline-flex justify-center items-center ml-8">
              <label
                htmlFor="toggleButton"
                className="flex items-center cursor-pointer"
              >
                <div className="relative">
                  <input
                    id="toggleButton"
                    type="checkbox"
                    className="sr-only"
                    checked={isChecked}
                    onChange={handleToggle}
                  />
                  <div
                    className={`block bg-gray-600 w-14 h-8 rounded-full  ${
                      isChecked && "bg-green-400"
                    }`}
                  />
                  <div
                    className={`
                  "dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition",
                  ${isChecked && "transform translate-x-full"}`}
                  />
                </div>
                <div className="ml-3 font-medium text-white font-[Outfit-Regular]">
                  Fast Spin
                </div>
              </label>
            </div>

            {/* Try it button */}
            <div className="z-[30] mx-8">
              <button
                disabled={trybtnDisabled}
                onClick={handleReset}
                className="
              solarity-button 
              font-medium
              text-gray-200
              bg-gray-600
              hover:bg-gray-700
              p-[22px] rounded-[20px]
              w-[150px] h-[50px] sm:w-[100px]
              text-[18px]sm:text-[22px]
              text-center tracking-wider
              inline-flex
              items-center
              justify-center
              font-[Outfit-Regular]
            "
              >
                Try it
              </button>
            </div>
          </div>
        </div>
        <RewardsContent />
      </div>
    </div>
  );
};
export default Lootbox;
