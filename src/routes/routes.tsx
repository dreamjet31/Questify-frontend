import { RouteProps } from "react-router-dom";
import Betting from "../pages/Betting";
import SubBettingPage from "../pages/Betting/SubBettingPage";
import Quests from "../pages/Quests";
import Games from "../pages/Games";
import Lootbox from "../pages/Lootbox";
import SignIn from "../pages/Login/Signin";
import Signup from "../pages/Login/Signup";

import { GameContentType } from "../pages/Games";

const routes: RouteProps[] = [
  {
    element: <Betting />,
    path: "/",
  },
  {
    element: <SubBettingPage id={1} title="" thumbnail="" iframeUrl="" />,
    path: "/tetrisk",
  },
  {
    element: <SubBettingPage id={2} title="" thumbnail="" iframeUrl="" />,
    path: "/subway",
  },
  {
    element: <SubBettingPage id={3} title="" thumbnail="" iframeUrl="" />,
    path: "/towerbuilding",
  },
  {
    element: <SubBettingPage id={4} title="" thumbnail="" iframeUrl="" />,
    path: "/2048",
  },
  {
    element: <SubBettingPage id={5} title="" thumbnail="" iframeUrl="" />,
    path: "/candycrush",
  },
  {
    element: <SubBettingPage id={6} title="" thumbnail="" iframeUrl="" />,
    path: "/flappybird",
  },
  {
    element: <SubBettingPage id={7} title="" thumbnail="" iframeUrl="" />,
    path: "/chess",
  },
  {
    element: <SubBettingPage id={8} title="" thumbnail="" iframeUrl="" />,
    path: "/aavegotchi",
  },
  {
    element: <SubBettingPage id={9} title="" thumbnail="" iframeUrl="" />,
    path: "/wwweb",
  },
  {
    element: <SubBettingPage id={10} title="" thumbnail="" iframeUrl="" />,
    path: "/doublejump",
  },
  {
    element: <SubBettingPage id={11} title="" thumbnail="" iframeUrl="" />,
    path: "/decentraland",
  },
  {
    element: <SubBettingPage id={12} title="" thumbnail="" iframeUrl="" />,
    path: "/halo",
  },
  {
    element: <SubBettingPage id={13} title="" thumbnail="" iframeUrl="" />,
    path: "/alr",
  },
  {
    element: <SubBettingPage id={14} title="" thumbnail="" iframeUrl="" />,
    path: "/mixmob",
  },
  {
    element: <SubBettingPage id={15} title="" thumbnail="" iframeUrl="" />,
    path: "/miniroyale",
  },
  {
    element: <SubBettingPage id={16} title="" thumbnail="" iframeUrl="" />,
    path: "/heros&empires",
  },
  {
    element: <Quests />,
    path: "/quests",
  },
  {
    element: <Games />,
    path: "/games",
  },
  {
    element: <Lootbox />,
    path: "/lootbox",
  },
  {
    element: <SignIn />,
    path: "/signin",
  },
  {
    element: <Signup />,
    path: "/signup",
  },
];

export default routes;
