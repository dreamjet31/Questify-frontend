import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TetrisState {
  winners: any[];
  balance: number;
  myInfo: object;
  myXP: number;
  modalOpen: boolean;
  clickedCardNum: number;
  depositModalOpen: boolean;
  iframeMode: boolean;
  percent: string;
  iframeID: number;
  keyNumber: number;
}

const initialState: TetrisState = {
  winners: [],
  balance: 0,
  myInfo: {},
  myXP: 0,
  modalOpen: false,
  clickedCardNum: 0,
  depositModalOpen: false,
  iframeMode: false,
  percent: "0%",
  iframeID: 0,
  keyNumber: 0,
};

export const tetrisSlice = createSlice({
  name: "chat",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setLeaderboard: (state, action: PayloadAction<any>) => {
      state.winners = action.payload.result;
    },
    setMyBalance: (state, action: PayloadAction<any>) => {
      state.balance = action.payload.balance;
    },
    setMyInfo: (state, action: PayloadAction<any>) => {
      state.myInfo = action.payload.myInfo;
    },
    setMyXP: (state, action: PayloadAction<any>) => {
      state.myXP = action.payload.myXP;
    },
    setModalOpen: (state, action: PayloadAction<any>) => {
      state.modalOpen = action.payload.modalOpen;
    },
    setClickedCardNum: (state, action: PayloadAction<any>) => {
      state.clickedCardNum = action.payload.clickedCardNum;
    },
    setDepositModalOpen: (state, action: PayloadAction<any>) => {
      state.depositModalOpen = action.payload.depositModalOpen;
    },
    setIframeMode: (state, action: PayloadAction<any>) => {
      state.iframeMode = action.payload.iframeMode;
    },
    setPercent: (state, action: PayloadAction<any>) => {
      state.percent = action.payload.percent;
    },
    setIframeID: (state, action: PayloadAction<any>) => {
      state.iframeID = action.payload.iframeID;
    },
    setKeyNumber: (state, action: PayloadAction<any>) => {
      state.keyNumber = action.payload.keyNumber;
    },
  },
});

export const {
  setLeaderboard,
  setMyBalance,
  setMyInfo,
  setMyXP,
  setModalOpen,
  setClickedCardNum,
  setDepositModalOpen,
  setIframeMode,
  setPercent,
  setIframeID,
  setKeyNumber,
} = tetrisSlice.actions;

export default tetrisSlice.reducer;
