import { Stages } from "../types/main";
import { store } from "../state/store";
import { appendBalance, subtractBalance } from "../state/balance/balanceSlice";
import {
  disableATMButtons,
  enableKeyboard,
} from "../state/permissions/permissionsSlice";
import { changeValueType } from "../state/keyboard/keyboardSlice";

const getBalanceRaport = () => {
  const balanceValue = store.getState().balance.balance;
  return balanceValue;
};

const changeBalance = (operation: "add" | "subtract", value: number) => {
  if (operation === "add") {
    store.dispatch(appendBalance(value));
  } else {
    store.dispatch(subtractBalance(value));
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
      action: () => `Name: Kamil
      Surname: Tumulec
      Age: 38`,
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
    { label: "Back", toStage: "start" },
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
    {
      label: "Other",
      toStage: "start",
      emptyAction: () => {
        store.dispatch(changeValueType("subtract"));
        store.dispatch(enableKeyboard());
        store.dispatch(disableATMButtons());
      },
    },
  ],
  deposit: [
    { label: "Select the amount to be deposited" },
    { label: "Back", toStage: "start" },
    { label: "10", toStage: "start", action: () => changeBalance("add", 10) },
    { label: "25", toStage: "start", action: () => changeBalance("add", 25) },
    { label: "50", toStage: "start", action: () => changeBalance("add", 50) },
    { label: "100", toStage: "start", action: () => changeBalance("add", 100) },
    { label: "200", toStage: "start", action: () => changeBalance("add", 200) },
    {
      label: "Other",
      toStage: "start",
      emptyAction: () => {
        store.dispatch(changeValueType("append"));
        store.dispatch(enableKeyboard());
        store.dispatch(disableATMButtons());
      },
    },
  ],
};

export default availableStages;
