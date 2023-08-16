import { RouteProps } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Betting from "../pages/Betting";
import SubBettingPage from "../pages/Betting/SubBettingPage";
import Quests from "../pages/Quests";
import Games from "../pages/Games";
import Lootbox from "../pages/Lootbox";
import SignIn from "../pages/Login/Signin";
import Signup from "../pages/Login/Signup";

import { GameContentType } from "../pages/Games";
import LootboxPlay from "../pages/Lootbox/Play";

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
    element: <Quests />,
    path: "/quests",
  },
  {
    element: <Games />,
    path: "/games",
  },
  {
    element: <Lootbox />,
    path: "/lootbox/",
  },
  {
    element: <LootboxPlay />,
    path: "/lootbox/play",
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
