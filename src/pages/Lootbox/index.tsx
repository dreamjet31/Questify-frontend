import LootboxCard from "../../components/Lootbox/LootboxCard";
import LootBoxBar from "../../components/Lootbox/LootboxBar";
import { useState, useEffect } from "react";
// import { Button } from "../../components/Common/Buttons";
import { Button } from "@mui/material";
// import Button from "@mui/material-next/Button";
import { LOOTBOX_CARD } from "../../data";
import { BorderPanel } from "../../components/Common/Panels";
import * as React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

const options = [
  <div className="flex flex-row gap-1">
    <img src="/images/Lootbox/bronze_key.png" width={24} />
    Roll
  </div>,
  <div className="flex flex-row gap-1">
    <img src="/images/Lootbox/silver_key.png" width={24} />
    Roll
  </div>,
  <div className="flex flex-row gap-1">
    <img src="/images/Lootbox/gold_key.png" width={24} />
    Roll
  </div>,
];

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

interface MyObject {
  id?: number;
}

const Lootbox = () => {
  const [play, setPlay] = useState(true);
  const [shuffledData, setShuffledData] = useState<Object[]>([]);
  const [translateXNum, setTranslateXNum] = useState<number>((0.5 * 100) / 90); //(8 * 100) / 90
  const [resultArray, setResultArray] = useState<MyObject[]>([]);
  const [revealColor, setRevealColor] = useState<boolean>(false);
  const [keyNum, setKeyNum] = useState(0);

  useEffect(() => {
    setShuffledData(shuffle(LOOTBOX_CARD[keyNum]));
    console.log("🥲", keyNum);
  }, [keyNum]);

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

    setPlay(false);
    console.log("selected", resultArray[selected].id);
  };
  console.log(resultArray);

  useEffect(() => {
    if (!play) {
      const timeout = setTimeout(() => {
        // setRevealColor(false);
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

  // Button Group
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  // const handleClick = () => {
  //   console.info(`You clicked ${options[selectedIndex]}`);
  // };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <div
      className={`relative w-[100vw] mt-[120px] text-gray-200 flex flex-col items-center`}
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
      <div className="flex justify-start">
        <div className="z-[30] m-8 flex gap-2">
          {/* <Button caption="Try it" onClick={handleClick} disabled={!play} />s */}
          {/* <Button
          // variant="filled"
          size="large"
          style={{
            backgroundColor: "#006400",
            fontFamily: "Outfit-Regular",
          }}
          className="hover:opacity-90"
          onClick={handleClick}
        >
          <div className="mx-2 flex flex-row gap-1">
            <img src="/images/Lootbox/gold_key.png" width={30} height={15} />
            <div className="text-2xl">Roll</div>
          </div>
        </Button> */}
          <ButtonGroup
            variant="contained"
            color="success"
            ref={anchorRef}
            aria-label="split button"
          >
            <Button onClick={handleClick}>{options[selectedIndex]}</Button>
            <Button
              size="small"
              aria-controls={open ? "split-button-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
              onClick={handleToggle}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          <Button
            size="large"
            style={{
              fontFamily: "Outfit-Regular",
              color: "#8fbc8f",
            }}
            className="hover:opacity-90"
            onClick={handleClick}
          >
            <div className="mx-2">Try it</div>
          </Button>

          <Popper
            sx={{
              zIndex: 1,
            }}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper style={{ backgroundColor: "black", color: "white" }}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu" autoFocusItem>
                      {options.map((option, index) => (
                        <MenuItem
                          key={index.toString()}
                          // disabled={index === 2}
                          selected={index === selectedIndex}
                          onClick={(event) => {
                            handleMenuItemClick(event, index);
                            setKeyNum(index);
                            console.log(index);
                          }}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    </div>
  );
};
export default Lootbox;
