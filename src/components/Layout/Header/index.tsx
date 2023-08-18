import React, { useContext, useEffect, useState } from "react";
import { HeaderMenuTitles } from "../../../data";
import { WalletWindowKey } from "@sei-js/core";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setMyBalance,
  setMyInfo,
  setMyXP,
  setPercent,
} from "../../../redux/slices/tetrisSlice";
import {
  SeiWalletContext,
  useWallet,
  useSigningClient,
  useQueryClient,
} from "@sei-js/react";
import { calculateFee, GasPrice } from "@cosmjs/stargate";
import { apiCaller } from "../../../utils/fetcher";
import LogoComp from "../LogoComp";
import HeaderMenuItem from "./HeaderMenuItem";
import { QUESTIFY_QUESTS } from "../../../data";
import firebase from "../../../firebase";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingButton from "@mui/lab/LoadingButton";
import { CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";

const Header = () => {
  const isSmallDevice = window.matchMedia("(max-width: 600px)").matches;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { supportedWallets, connect, disconnect, installedWallets } =
    useContext(SeiWalletContext);
  const { connectedWallet, offlineSigner, accounts } = useWallet();
  const [active, setActive] = useState(0);

  const [connected, setConnected] = useState(false);
  const [betAmount, setBetAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [sending, setSending] = useState(false);
  const { signingClient } = useSigningClient();
  const { queryClient } = useQueryClient();
  const [myAddress, setMyAddress] = useState("");
  const [depositLoading, setDepositLoading] = React.useState(false);
  const [claimLoading, setClaimLoading] = React.useState(false);
  const timer = React.useRef<number>();

  const myStar = useSelector((state: any) => ({
    myStar: state.tetris.myInfo.totalStar,
  }));

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    const connected = localStorage.getItem(
      "connectedWallet"
    ) as WalletWindowKey;
    if (connected) {
      connect(connected);
    }
  }, []);

  const { balance } = useSelector((state: any) => ({
    balance: state.tetris.balance,
  }));

  const { myXP } = useSelector((state: any) => ({
    myXP: state.tetris.myXP,
  }));

  useEffect(() => {
    localStorage.setItem("betAmount", betAmount);
  }, [betAmount]);

  const getBalance = async () => {
    if (accounts.length > 0 && !!queryClient) {
      setConnected(true);
      const { balances } = await queryClient.cosmos.bank.v1beta1.allBalances({
        address: accounts[0].address,
      });
      const amount = balances.find((balance) => {
        return balance.denom === "usei";
      });
      if (amount) setCurrentAmount(Number(amount.amount) / 1e6);
    } else {
      setConnected(false);
    }
  };

  // Modal
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      fontFamily: "Inter-Regular",
    },
  });
  // const { depositModalOpen } = useSelector((state: any) => ({
  //   depositModalOpen: state.tetris.depositModalOpen,
  // }));

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    fontFamily: "IBMPlexMono-Regular",
    p: 4,
    border: 1,
    borderColor: "#6C9C6E",
    borderRadius: "20px",
    font: "IBMPlexMono-Regular",
    boxShadow: "0 0 10px 0 rgb(43, 100, 50)",
  };

  const sendToken = async (amount: number) => {
    if (!signingClient || !accounts) {
      // console.log("Wallet is not connected");
      return;
    }
    if (sending) {
      toast.warn("Wait");
      return;
    }
    setSending(true);
    const fee = calculateFee(1500000, GasPrice.fromString("3750usei"));
    const transferAmount = { amount: (amount * 1e6).toString(), denom: "usei" };

    try {
      const sendResponse = await signingClient.sendTokens(
        accounts[0].address,
        "sei10cs7ddu93ge6kwfllm24cm20h4j4vx00sfaqh7",
        [transferAmount],
        fee
      );

      if (sendResponse.transactionHash) {
        localStorage.setItem("txHash", sendResponse.transactionHash);

        try {
          const result = await apiCaller.post("tokens/deposit", {
            wallet: accounts[0].address,
            txHash: sendResponse.transactionHash,
          });

          // if result.data.

          dispatch(
            setMyBalance({ balance: result.data.existingUser.totalBalance })
          );
          // console.log("myInfoDispatch:", result.data.existingUser);
          dispatch(setMyInfo({ myInfo: result.data.existingUser }));

          // dispatch(setDepositModalOpen({ depositModalOpen: false }));
          setOpen(false);
          toast.info("Deposit Succeed!");
          setDepositLoading(false);
          setClaimLoading(false);

          handleClose();
          setDepositAmount(0);
        } catch (err: any) {
          throw new Error();
        }
      } else {
        throw new Error();
      }
      getBalance();
      setSending(false);
      return true;
    } catch (err) {
      localStorage.removeItem("txHash");
      setSending(false);
      setClaimLoading(false);
      setDepositLoading(false);
      toast.error("Backend Error!");
      console.log("💣 Backend Error");
      return false;
    }
  };

  const getMyInfo = async (wallet: string) => {
    if (accounts && accounts.length) {
      try {
        var result = await apiCaller.post("users/getMyInfo", {
          wallet,
          email: firebase.auth().currentUser?.email,
        });
        dispatch(setMyBalance({ balance: result.data.data.totalBalance }));
        dispatch(setMyInfo({ myInfo: result.data.data }));
        dispatch(setMyXP({ myXP: result.data.data.totalXP }));
        dispatch(
          setPercent({
            percent: String((result.data.data.totalXP * 100) / 2000) + "%",
          })
        );
      } catch (error) {
        toast.error("Cannot fetch Data!");
      }
    }
  };

  useEffect(() => {
    if (connectedWallet) {
      localStorage.setItem("connectedWallet", connectedWallet);
      localStorage.setItem("connectedAddress", accounts[0].address);
    } else {
      localStorage.removeItem("connectedWallet");
      localStorage.removeItem("connectedAddress");
    }
  }, [connectedWallet]);

  useEffect(() => {
    getBalance();
    if (accounts && accounts.length) {
      getMyInfo(accounts[0].address);
    }
  }, [queryClient, accounts]);

  useEffect(() => {
    if (accounts && accounts.length) {
      setMyAddress(accounts[0].address);
    }
  }, [accounts]);

  const { myInfo } = useSelector((state: any) => ({
    myInfo: state.tetris.myInfo,
  }));

  return (
    <div className="fixed top-0 left-0 right-0 bg-[#030A13] z-[100] ">
      <ToastContainer
        style={{ fontSize: "14px", zIndex: "1000" }}
        autoClose={2000}
        hideProgressBar={true}
      />
      <div
        className="flex 
              custom-2xl:flex-row xl:flex-row lg:flex-row md:flex-row sm:flex-row xs:flex-row
              justify-between
              border-b-[1px] border-semiSplitter
              custom-2xl:h-[80px] xl:h-[80px] lg:h-[80px] md:h-[80px] sm:h-[80px] xs:h-[80px]
              w-full flex-row
            "
      >
        <div className="flex flex-row">
          <div
            className="flex w-20 h-20 justify-center border border-1 border-[#272829]"
            onClick={() => navigate("/")}
          >
            <LogoComp />
          </div>
          {!isSmallDevice && (
            <div className="flex justify-start">
              <div
                className="flex flex-row h-full
                      lg:justify-between md:justify-around sm:justify-between xs:justify-between
                       ml-[10px] 
                    "
              >
                {HeaderMenuTitles.map((menu: any, index) => (
                  <HeaderMenuItem
                    key={index}
                    title={menu.name}
                    link={menu.link}
                    active={active === menu.link}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div
          className="flex
                            custom-2xl:flex-row xl:flex-row lg:flex-row md:flex-row sm:flex-row xs:flex-row
                            h-full self-center justify-between items-center
                            custom-2xl:w-fit xl:w-fit lg:w-fit md:w-fit sm:w-fit"
        >
          <div className="flex flex-row items-center md:justify-end sm:justify-end">
            {connected && (
              <div className="flex flex-row">
                <div
                  className="pr-2 h-[35px] rounded-lg flex justify-center items-center 
		            text-[#929298] text-lg cursor-pointer mt-4 mr-2 border border-[#14B8A6] hover:text-white "
                  onClick={handleOpen}
                >
                  <img
                    src="/images/logo2.png"
                    className="mx-[6px] w-[20px] h-[20px]"
                  />
                  <p className="sm:text-[12px] text-[10px] flex items-center">
                    {Math.floor(Number(myInfo?.totalBalance) * 10000) / 10000}
                  </p>
                </div>
                <div
                  className="pr-2 h-[35px] rounded-lg flex justify-center items-center 
		            text-[#929298] text-lg cursor-pointer my-4 mr-2 border border-[#14B8A6] hover:text-white "
                >
                  <img
                    src="/images/logos/xp.png"
                    className="mx-[6px] w-[20px] h-[20px]"
                  />
                  <p className="sm:text-[12px] text-[10px] flex items-center">
                    {Math.floor(Number(myStar.myStar || 0))}
                  </p>
                </div>
              </div>
            )}

            {
              connectedWallet != ("keplr" as WalletWindowKey) && (
                <div className="flex wallet-adapter-button justify-end items-center mr-2">
                  <div className="flex items-center justify-center ">
                    <div
                      className="flex flex-row justify-center items-center"
                      onClick={async () => {
                        if (!window.keplr) {
                          toast.warn("Please install keplr extension");
                        } else {
                          connect("keplr");
                        }
                      }}
                    >
                      <img src="/images/SEI.svg"></img>
                      <p className="sm:text-[12px] text-[10px] flex items-center justify-center">
                        &nbsp;Connect Wallet
                      </p>
                    </div>
                  </div>
                </div>
              )
              // : (
              // <div
              //   className="flex flex-row"
              //   onClick={() => {
              //     disconnect();
              //   }}
              // >
              //   <img src="/images/SEI.svg"></img>
              //   <p className="sm:text-[12px] text-[10px] flex items-center">
              //     &nbsp;{" "}
              //     {myAddress.substring(0, 6) +
              //       "..." +
              //       myAddress.substring(myAddress.length - 3)}
              //   </p>
              // </div>
              // )
            }
            <ThemeProvider theme={darkTheme}>
              <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ textAlign: "center" }}
                    color="white"
                  >
                    Deposit / Withdraw
                  </Typography>
                  <div className="flex flex-row mt-3 justify-between">
                    <TextField
                      id="outlined-number"
                      label="Deposit amount"
                      type="number"
                      className="w-[240px] color-white"
                      size="small"
                      color="success"
                      value={depositAmount}
                      onChange={(e) => {
                        try {
                          setDepositAmount(Number(e.target.value));
                        } catch (err) {
                          toast.warn("Input correct amount");
                          setClaimLoading(false);
                          setDepositLoading(false);
                        }
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <div className="flex justify-end ml-3 text-[16px] h-10 cursor-pointer text-white font-mono w-30">
                      <LoadingButton
                        variant="contained"
                        color="success"
                        loading={depositLoading}
                        sx={{ textTransform: "none" }}
                        loadingIndicator={
                          <CircularProgress color="success" size={16} />
                        }
                        onClick={() => {
                          setDepositLoading(true);
                          if (depositAmount <= 0) {
                            toast.warn("Input correct balance");
                            setDepositLoading(false);
                            return;
                          }
                          sendToken(depositAmount);
                        }}
                      >
                        Deposit
                      </LoadingButton>
                    </div>
                  </div>
                  <div className="flex flex-row mt-3 font-['Outfit-Regular']">
                    <TextField
                      id="outlined-number"
                      label="Withdraw amount"
                      type="number"
                      className="w-[240px]"
                      size="small"
                      value={withdrawAmount}
                      color="success"
                      sx={{ fontFamily: "Outfit-Regular" }}
                      onChange={(e) => {
                        try {
                          setWithdrawAmount(Number(e.target.value));
                        } catch (err) {
                          toast.warn("Input correct amount");
                          setClaimLoading(false);
                        }
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <div className="flex justify-end ml-3 text-[16px] h-10 cursor-pointer text-white font-mono w-30">
                      <LoadingButton
                        variant="contained"
                        color="success"
                        loading={claimLoading}
                        sx={{ textTransform: "none" }}
                        loadingIndicator={
                          <CircularProgress color="success" size={16} />
                        }
                        className="justify-end h-10 cursor-pointer bg-[#14B8A6] rounded-[10px] p-2 ml-4 font-mono text-white w-30"
                        onClick={async () => {
                          setClaimLoading(true);
                          if (sending) {
                            toast.warn("Wait");
                            return;
                          }
                          if (withdrawAmount <= 0) {
                            toast.warn("Input correct balance");
                            setClaimLoading(false);
                            return;
                          }
                          setSending(true);
                          if (!signingClient || !accounts) {
                            toast.warn("Wallet is not connected");
                            return;
                          }

                          try {
                            const result = await apiCaller.post(
                              "tokens/withdraw",
                              {
                                wallet: accounts[0].address,
                                amount: withdrawAmount,
                              }
                            );
                            // console.log(result.data);
                            await getMyInfo(accounts[0].address);
                            setSending(false);
                            handleClose();
                            toast.info("Withdraw succeed");
                            setClaimLoading(false);
                          } catch (err) {
                            // console.log(err);
                            setSending(false);
                            setClaimLoading(false);
                            setDepositLoading(false);
                            toast.warn("Backend Error!");
                            console.log("💣 Backend Error");

                            return;
                          }
                        }}
                      >
                        Withdraw
                      </LoadingButton>
                    </div>
                  </div>
                </Box>
              </Modal>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
