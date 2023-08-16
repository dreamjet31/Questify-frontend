import LootboxCard from "../../../components/Lootbox/LootboxCard";
import LootBoxBar from "../../../components/Lootbox/LootboxBar";
import { useState, useEffect, useRef, useContext } from "react";
import { Button } from "../../../components/Common/Buttons";
import { LOOTBOX_CARD_BRONZE } from "../../../data";
import { LOOTBOX_CARD_SILVER } from "../../../data";
import { LOOTBOX_CARD_GOLD } from "../../../data";
import KeysContent from "../../../components/Lootbox/KeysContent";
import RewardsContent from "../../../components/Lootbox/RewardsContent";
import { useSelector } from "react-redux";
// import RewardsContent from "../../components/Lootbox/RewardsContent";
// import KeysContent from "../../components/Lootbox/KeysContent";
import { WalletWindowKey } from "@sei-js/core";
import { SeiWalletContext } from "@sei-js/react";
import { toast } from "react-toastify";

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

const LootboxPlay = () => {
  const { supportedWallets, connect, disconnect, installedWallets } =
    useContext(SeiWalletContext);
  const [connected, setConnected] = useState(false);

  const connected_wallet = localStorage.getItem(
    "connectedWallet"
  ) as WalletWindowKey;

  useEffect(() => {
    const connected = localStorage.getItem(
      "connectedWallet"
    ) as WalletWindowKey;
    if (connected) {
      connect(connected);
    }
  }, []);

  useEffect(() => {
    if (connected) {
      connect(connected_wallet);
    }
  }, []);

  const [key, setKey] = useState("gold");
  const keyNumber = useSelector((state: any) => ({
    keyNumber: state.tetris.keyNumber,
  }));

  const [lootboxCard, setLootboxCard] = useState(LOOTBOX_CARD_BRONZE);
  useEffect(() => {
    keyNumber.keyNumber == 0
      ? setLootboxCard(LOOTBOX_CARD_BRONZE)
      : keyNumber.keyNumber == 1
      ? setLootboxCard(LOOTBOX_CARD_SILVER)
      : setLootboxCard(LOOTBOX_CARD_GOLD);
  }, [keyNumber.keyNumber]);

  const wrapperRef = useRef(null);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [trybtnDisabled, setTryBtnDisabled] = useState(false);
  const [shuffledData, setShuffledData] = useState<Object[]>([]);
  const [translateXNum, setTranslateXNum] = useState<number>((0.5 * 100) / 90); //(8 * 100) / 90
  const [revealColor, setRevealColor] = useState<boolean>(false);
  const [resultArray, setResultArray] = useState<Object[]>([...lootboxCard]);
  const [isChecked, setIsChecked] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isReseted, setIsReseted] = useState(true);
  const [readyTry, setReadyTry] = useState(false);
  const [selected, setSelected] = useState(100);

  const mockBackend1 = () => {
    const randomCardNum = Math.floor(Math.random() * 100000);
    if (randomCardNum >= 0 && randomCardNum < 2) {
      return 0;
    } else if (randomCardNum >= 2 && randomCardNum <= 101) {
      return 1;
    } else if (randomCardNum >= 102 && randomCardNum < 902) {
      return 2;
    } else if (randomCardNum >= 902 && randomCardNum < 100000) {
      return 3;
    }
    return 3;
  };

  const mockBackend2 = () => {
    const randomCardNum = Math.floor(Math.random() * 100000);
    if (randomCardNum >= 0 && randomCardNum < 700) {
      return 0;
    } else if (randomCardNum >= 700 && randomCardNum <= 751) {
      return 1;
    } else if (randomCardNum >= 752 && randomCardNum < 852) {
      return 2;
    } else if (randomCardNum >= 852 && randomCardNum < 20852) {
      return 3;
    } else if (randomCardNum >= 20852 && randomCardNum < 100000) {
      return 4;
    }
    return 4;
  };

  const mockBackend3 = () => {
    const randomCardNum = Math.floor(Math.random() * 10000);
    if (randomCardNum >= 0 && randomCardNum < 1000) {
      return 0;
    } else if (randomCardNum >= 1000 && randomCardNum <= 1202) {
      return 1;
    } else if (randomCardNum >= 1103 && randomCardNum <= 1202) {
      return 2;
    } else if (randomCardNum >= 1203 && randomCardNum < 3056) {
      return 3;
    } else if (randomCardNum >= 3056 && randomCardNum < 3256) {
      return 4;
    } else if (randomCardNum >= 3256 && randomCardNum < 6639) {
      return 5;
    } else if (randomCardNum >= 6639 && randomCardNum < 6649) {
      return 6;
    } else if (randomCardNum >= 6649 && randomCardNum < 6699) {
      return 7;
    } else if (randomCardNum >= 6699 && randomCardNum < 6799) {
      return 8;
    } else if (randomCardNum >= 7000 && randomCardNum < 10000) {
      return 9;
    }
    return 9;
  };

  const ShuffleArray = () => {
    setSelected(
      keyNumber.keyNumber === 0
        ? mockBackend1()
        : keyNumber.keyNumber === 1
        ? mockBackend2()
        : mockBackend3()
    );
    let shuffledResultArray = [...lootboxCard];
    for (let index = 0; index < lootboxCard.length; index++) {
      shuffledResultArray = shuffle(
        [...lootboxCard].map((item, index) => {
          if (index === selected) {
            return { ...item, selected: true };
          }
          return { ...item, selected: false };
        })
      );
    }
    return shuffledResultArray;
  };
  // const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  useEffect(() => {
    setShuffledData(shuffle([...lootboxCard]));
  }, [keyNumber.keyNumber]);

  let delay = isChecked ? 2100 : 4100;
  const hadleClickTry = () => {
    const shuffledArray = ShuffleArray();
    setResultArray((prevState) => [
      ...prevState.map((arrayItem, index) => {
        return { ...arrayItem, ...shuffledArray[index] };
      }),
    ]);
    let selectedCardIndex = 0;
    for (let index = 0; index < shuffledArray.length; index++) {
      if (shuffledArray[index]["selected"]) {
        selectedCardIndex = index;
      }
    }
    setReadyTry(false);
    setIsSpinning(true);
    setIsReseted(true);
    setShuffledData(shuffle(lootboxCard));
    setTranslateXNum(
      window.innerWidth < 768
        ? -(
            (4 * 10) / 3.25 +
            (selectedCardIndex * 30) / 95 -
            (1 * 30 + 0.25) / 95
          ) * 100
        : window.innerWidth >= 768 && window.innerWidth < 1024
        ? -(
            (4 * 10) / 5.3 +
            (selectedCardIndex * 18) / 95 -
            (3 * 18 + 0.25) / 95
          ) * 100
        : -(
            (4 * 10) / 8.0 +
            (selectedCardIndex * 12) / 95 -
            (4 * 15 + 0.25) / 95
          ) * 100
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
    if (connected_wallet == null) {
      toast.warn("Connect the wallet first");
      console.log(connected_wallet);
    } else {
      setTranslateXNum(0);
      setBtnDisabled(true);
      setIsReseted(false);
      setTryBtnDisabled(true);
      console.log(selected);
    }
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
    <div className="mt-[90px]">
      <KeysContent />
      {/* <KeysContent /> */}
      <div
        className={`relative w-[100vw]  text-gray-200 flex flex-col items-center font-[Outfit-Regular]`}
      >
        <LootBoxBar />
        <div className="w-[95vw] overflow-hidden p-0 m-0">
          <div
            ref={wrapperRef}
            className={`flex justify-start gap-[0.5vw] items-center transition-transform ${
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
            <div className=" mx-8">
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
        {/* <RewardsContent /> */}
        {/* <div className="mt-[20px]">
          <div className="mt-[20px]">
            <Button caption="Gold" onClick={goldBtnClick} />
          </div>
          <div className="mt-[20px]">
            <Button caption="Silver" onClick={silverBtnClick} />
          </div>
          <div className="mt-[20px]">
            <Button caption="Planium" onClick={planiumBtnClick} />
          </div>
        </div> */}
        <RewardsContent />
      </div>
    </div>
  );
};
export default LootboxPlay;
