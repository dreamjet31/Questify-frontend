import TokenBox from "./tokenBox";
import Bar from "./bar";
import { useState, useEffect } from 'react';
import { Button } from "../../components/Common/Buttons";

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
}

const mockBackend = (num: number) => {
  const randomIndex = Math.floor(Math.random() * num);
  return randomIndex;
}

const data:any = [
  {
    id: 1,
    img: "/images/logo2.png",
    name: "Questify Token",
    value: "10 $QST",
    selected: false
  },
  {
    id: 2,
    img: "/images/logo2.png",
    name: "Questify Token",
    value: "20 $QST",
    selected: false
  },
  {
    id: 3,
    img: "/images/logo2.png",
    name: "Questify Token",
    value: "30 $QST",
    selected: false
  },
  {
    id: 4,
    img: "/images/logo2.png",
    name: "Questify Token",
    value: "40 $QST",
    selected: false
  },
  {
    id: 5,
    img: "/images/logo2.png",
    name: "Questify Token",
    value: "50 $QST",
    selected: false
  },
  {
    id: 6,
    img: "/images/logo2.png",
    name: "Questify Token",
    value: "60 $QST",
    selected: false
  },
  {
    id: 7,
    img: "/images/logo2.png",
    name: "Questify Token",
    value: "70 $QST",
    selected: false
  },
  {
    id: 8,
    img: "/images/logo2.png",
    name: "Questify Token",
    value: "80 $QST",
    selected: false
  },
  {
    id: 9,
    img: "/images/logo2.png",
    name: "Questify Token",
    value: "90 $QST",
    selected: false
  },
  {
    id: 10,
    img: "/images/logo2.png",
    name: "Questify Token",
    value: "100 $QST",
    selected: false
  }
]

const Lootbox = () => {
  const [play, setPlay] = useState(true);
  const [shuffledData, setShuffledData] = useState<Object[]>([]);
  const [translateXNum, setTranslateXNum] = useState<number>(8.5 * 100 / 90);
  const [resultArray, setResultArray] = useState<Object[]>([]);
  const [revealColor, setRevealColor] = useState<boolean>(false);

  useEffect(() => {
    setShuffledData(shuffle(data));
  },[]);

  useEffect(() => {
    setResultArray([...shuffledData]);
  },[shuffledData]);

  const handleClick = () => {
    const selected = mockBackend(resultArray.length);
    for (let index = 0; index < resultArray.length; index++) {
        setResultArray(() => [...resultArray].map((item, index) => {
          if(index === selected) {
            return {...item, selected: true};
          }
          return item;
        }));
    }
    setTranslateXNum((4 * 10 / 4 + (selected - 2) * 22.5 / 90 + 8.5 / 90) * 100);
    setPlay(false);
  }

  useEffect(() => {
    if (!play) {
      const timeout = setTimeout(() => {
        setRevealColor(true);
      }, 4300)
      return () => {
        if(timeout) {
          clearTimeout(timeout);
        };
      }
    }
    return void 0;
  }, [play])

  return (
    <div
      className={`relative w-[100vw] mt-[170px] text-gray-200 flex flex-col items-center`}
    >
        <Bar />
        <div className="w-[90vw] overflow-hidden">
          <div
            id="card-list"
            className="flex justify-start gap-[10vw] lg:gap-[5.5vw] items-center lg:translate-x-[-8.5vw] translate-x-[-17.5vw] transition-transform duration-4000 ease-out"
            style={{ transform: `translateX(-${translateXNum}%)`}}
          >
            {shuffledData.map((item, index) => (
              <TokenBox key={index} data={item} />
            ))}
            {shuffledData.map((item, index) => (
              <TokenBox key={index + '_copied_1'} data={item} />
            ))}
            {shuffledData.map((item, index) => (
              <TokenBox key={index + '_copied_2'} data={item} />
            ))}
            {shuffledData.map((item, index) => (
              <TokenBox key={index + '_copied_3'} data={item} />
            ))}
            {resultArray.map((item, index) => (
              <TokenBox key={index + '_copied_4'} data={item} revealColor={revealColor} />
            ))}
          </div>
        </div>
        <div className="z-[30] m-8"><Button caption="Try it" onClick={handleClick} disabled={!play}/></div>
    </div>
  );
};
export default Lootbox;
