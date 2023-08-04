import LootboxCard from "../../components/Lootbox/LootboxCard";
import LootBoxBar from "../../components/Lootbox/LootboxBar";
import { useState, useEffect } from "react";
import { Button } from "../../components/Common/Buttons";
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
  const [translateXNum, setTranslateXNum] = useState<number>((8.5 * 100) / 90);
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
    setTranslateXNum(((3 * 7) / 6 + (selected * 14) / 90 + 8.5 / 90) * 100);
    setPlay(false);
  };

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
      <div className="w-[90vw] overflow-hidden">
        <div
          id="card-list"
          className="flex m-5 justify-center gap-[1vw] lg:gap-[1vw] items-center lg:translate-x-[-8vw] translate-x-[-17.5vw] transition-transform duration-4000 ease-out"
          style={{ transform: `translateX(-${translateXNum}%)` }}
        >
          {shuffledData.map((item, index) => (
            <LootboxCard key={index} data={item} />
          ))}
          {shuffledData.map((item, index) => (
            <LootboxCard key={index + "_copied_1"} data={item} />
          ))}
          {shuffledData.map((item, index) => (
            <LootboxCard key={index + "_copied_2"} data={item} />
          ))}
          {shuffledData.map((item, index) => (
            <LootboxCard key={index + "_copied_3"} data={item} />
          ))}
          {resultArray.map((item, index) => (
            <LootboxCard
              key={index + "_copied_4"}
              data={item}
              revealColor={revealColor}
            />
          ))}
        </div>
      </div>
      <div className="z-[30] m-8">
        <Button caption="Try it" onClick={handleClick} disabled={!play} />
      </div>
    </div>
  );
};
export default Lootbox;
