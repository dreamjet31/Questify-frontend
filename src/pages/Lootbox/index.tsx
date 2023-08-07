import LootboxCard from "../../components/Lootbox/LootboxCard";
import LootBoxBar from "../../components/Lootbox/LootboxBar";
import { useState, useEffect } from "react";
// import { Button } from "../../components/Common/Buttons";
// import { Button } from "@mui/material";
import Button from "@mui/material-next/Button";
import { LOOTBOX_CARD } from "../../data";
import { BorderPanel } from "../../components/Common/Panels";

const shuffle = (array: string[]) => {
  const shuffled = [...array].slice();
  let currentIndex = shuffled.length;
  let temporaryValue: string, randomIndex: number;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = shuffled[currentIndex];
    shuffled[currentIndex] = shuffled[randomIndex];
    shuffled[randomIndex] = temporaryValue;
  }
  return shuffled;
};

const mockBackend = (num: number) => {
  const randomIndex = Math.floor(Math.random() * num);
  return randomIndex;
};

const Lootbox = () => {
  const [play, setPlay] = useState(true);
  const [shuffledData, setShuffledData] = useState<Object[]>([]);
  const [translateXNum, setTranslateXNum] = useState<number>((0.5 * 100) / 90); //(8 * 100) / 90
  const [resultArray, setResultArray] = useState<Object[]>([]);
  const [revealColor, setRevealColor] = useState<boolean>(false);

  useEffect(() => {
    setShuffledData(shuffle(LOOTBOX_CARD));
  }, []);

  useEffect(() => {
    setResultArray([...shuffledData]);
  }, [shuffledData]);

  const handleClick = () => {
    const selected = mockBackend(resultArray.length);
    for (let index = 0; index < resultArray.length; index++) {
      setResultArray(() =>
        [...resultArray].map((item, index) => {
          if (index === selected) {
            return { ...item, selected: true };
          }
          return item;
        })
      );
    }
    setTranslateXNum(
      -((4 * 10) / 5 + (selected * 18) / 90 - (2 * 18 + 9) / 90) * 100
    );
    // 4 * 10 / 5   :   4 shuffledDatas, 10 cards per array, 5cards per screen
    // selected * 18 / 90  :  selected:index of selected card in resultArray , 18vw per card including gap-[1vw] , 90vw of screen is visible elsewhere is hidden
    //
    setPlay(false);
    console.log(selected);
  };
  console.log(resultArray);

  useEffect(() => {
    if (!play) {
      const timeout = setTimeout(() => {
        setRevealColor(true);
      }, 4300);
      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }
    return void 0;
  }, [play]);

  return (
    <div
      className={`relative w-[100vw] mt-[170px] text-gray-200 flex flex-col items-center`}
    >
      <LootBoxBar />
      <div className="w-[90vw] overflow-hidden p-0 m-0">
        <div
          className="flex justify-start gap-[1vw] items-center transition-transform duration-4000 ease-out"
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
      <div className="z-[30] m-8">
        {/* <Button caption="Try it" onClick={handleClick} disabled={!play} />s */}
        <Button
          variant="filled"
          size="large"
          style={{
            backgroundColor: "#006400",
            fontFamily: "Outfit-Regular",
          }}
          className="hover:opacity-90"
          onClick={handleClick}
        >
          <div className="mx-2">Try it</div>
        </Button>
      </div>
    </div>
  );
};
export default Lootbox;
