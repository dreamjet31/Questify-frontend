import { RouteProps } from "react-router-dom";
import Betting from "../pages/Betting";
import SubBettingPage from "../pages/Betting/SubBettingPage";
import Quests from "../pages/Quests";
import Games from "../pages/Games";
import Lootbox from "../pages/Lootbox";

import { GameContentType } from "../pages/Games";

const routes: RouteProps[] = [
  {
    element: <Betting />,
    path: "/",
  },
  {
    element: <SubBettingPage id={1} title="" thumbnail="" iframeUrl="" />,
    path: "/subbetting",
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
];

export default routes;
