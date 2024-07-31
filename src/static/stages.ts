import { Stages } from "../types/main";
import { RootState } from "../state/store";
import { store } from "../state/store";
import { appendBalance } from "../state/balance/balanceSlice";

const getBalanceRaport = () => {
  const balanceValue = store.getState().balance.balance;
  return `Your current balance is ${Number(balanceValue)}.`;
};

const changeBalance = (operation: "add" | "subtract", value: number) => {
  if (operation === "add") {
    store.dispatch(appendBalance(value));
  }
};

const availableStages: Stages = {
  start: [
    { label: "Account information", toStage: "accountInfo" },
    { label: "Balance", toStage: "balance" },
    { label: "Withdrawal", toStage: "withdrawal" },
    { label: "Deposit", toStage: "deposit" },
  ],
  accountInfo: [
    {
      label: "Print data",
      toStage: "start",
      action: () => console.log("Your data"),
    },
    { label: "Back", toStage: "start" },
  ],
  balance: [
    {
      label: "Print data",
      toStage: "start",
      action: () => getBalanceRaport(),
    },
    { label: "Back", toStage: "start" },
  ],
  withdrawal: [
    { label: "Select the amount you wish to withdraw" },
    { label: "" },
    {
      label: "10",
      toStage: "start",
      action: () => changeBalance("subtract", 10),
    },
    {
      label: "25",
      toStage: "start",
      action: () => changeBalance("subtract", 25),
    },
    {
      label: "50",
      toStage: "start",
      action: () => changeBalance("subtract", 50),
    },
    {
      label: "100",
      toStage: "start",
      action: () => changeBalance("subtract", 100),
    },
    {
      label: "200",
      toStage: "start",
      action: () => changeBalance("subtract", 200),
    },
    { label: "Other", toStage: "start" },
  ],
  deposit: [
    { label: "Select the amount to be deposited" },
    { label: "" },
    { label: "10", toStage: "start", action: () => changeBalance("add", 10) },
    { label: "25", toStage: "start", action: () => changeBalance("add", 25) },
    { label: "50", toStage: "start", action: () => changeBalance("add", 50) },
    { label: "100", toStage: "start", action: () => changeBalance("add", 100) },
    { label: "200", toStage: "start", action: () => changeBalance("add", 200) },
    { label: "Other", toStage: "start" },
  ],
};

export default availableStages;
