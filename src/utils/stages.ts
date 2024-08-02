import { BalanceChangeKind, StageEnum, Stages } from "../types/main";
import { appendBalance, subtractBalance } from "../state/balance/balanceSlice";
import {
  disableATMButtons,
  enableKeyboard,
} from "../state/permissions/permissionsSlice";
import { changeValueType } from "../state/keyboard/keyboardSlice";
import { store } from "../state/store";

const getBalanceRaport = () => {
  const balanceValue = store.getState().balance.balance;
  return balanceValue;
};

const changeBalance = (
  operation: BalanceChangeKind.append | BalanceChangeKind.subtract,
  value: number
) => {
  if (operation === BalanceChangeKind.append) {
    store.dispatch(appendBalance(value));
  } else {
    store.dispatch(subtractBalance(value));
  }
};

const availableStages: Stages = {
  start: [
    { label: "Account information", toStage: StageEnum.accountInfo },
    { label: "Balance", toStage: StageEnum.balance },
    { label: "Withdrawal", toStage: StageEnum.withdrawal },
    { label: "Deposit", toStage: StageEnum.deposit },
  ],
  accountInfo: [
    {
      label: "Print data",
      toStage: StageEnum.start,
      action: () => `Name: Kamil
      Surname: Tumulec
      Age: 38`,
    },
    { label: "Back", toStage: StageEnum.start },
  ],
  balance: [
    {
      label: "Print balance",
      toStage: StageEnum.start,
      action: () => getBalanceRaport(),
    },
    { label: "Back", toStage: StageEnum.start },
  ],
  withdrawal: [
    { label: "Select the amount you wish to withdraw" },
    { label: "Back", toStage: StageEnum.start },
    {
      label: "10",
      toStage: StageEnum.start,
      action: () => changeBalance(BalanceChangeKind.subtract, 10),
    },
    {
      label: "25",
      toStage: StageEnum.start,
      action: () => changeBalance(BalanceChangeKind.subtract, 25),
    },
    {
      label: "50",
      toStage: StageEnum.start,
      action: () => changeBalance(BalanceChangeKind.subtract, 50),
    },
    {
      label: "100",
      toStage: StageEnum.start,
      action: () => changeBalance(BalanceChangeKind.subtract, 100),
    },
    {
      label: "200",
      toStage: StageEnum.start,
      action: () => changeBalance(BalanceChangeKind.subtract, 200),
    },
    {
      label: "Other",
      toStage: StageEnum.start,
      emptyAction: () => {
        store.dispatch(changeValueType(BalanceChangeKind.subtract));
        store.dispatch(enableKeyboard());
        store.dispatch(disableATMButtons());
      },
    },
  ],
  deposit: [
    { label: "Select the amount to be deposited" },
    { label: "Back", toStage: StageEnum.start },
    {
      label: "10",
      toStage: StageEnum.start,
      action: () => changeBalance(BalanceChangeKind.append, 10),
    },
    {
      label: "25",
      toStage: StageEnum.start,
      action: () => changeBalance(BalanceChangeKind.append, 25),
    },
    {
      label: "50",
      toStage: StageEnum.start,
      action: () => changeBalance(BalanceChangeKind.append, 50),
    },
    {
      label: "100",
      toStage: StageEnum.start,
      action: () => changeBalance(BalanceChangeKind.append, 100),
    },
    {
      label: "200",
      toStage: StageEnum.start,
      action: () => changeBalance(BalanceChangeKind.append, 200),
    },
    {
      label: "Other",
      toStage: StageEnum.start,
      emptyAction: () => {
        store.dispatch(changeValueType(BalanceChangeKind.append));
        store.dispatch(enableKeyboard());
        store.dispatch(disableATMButtons());
      },
    },
  ],
};

export default availableStages;
