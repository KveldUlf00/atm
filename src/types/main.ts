export enum KeyboardSpecialBtn {
  cancel = "cancel",
  clear = "clear",
  enter = "enter",
}

export enum Stage {
  cancel = "cancel",
  clear = "clear",
  enter = "enter",
}

export enum StageEnum {
  start = "start",
  accountInfo = "accountInfo",
  balance = "balance",
  withdrawal = "withdrawal",
  deposit = "deposit",
}

export enum BalanceChangeKind {
  append = "append",
  subtract = "subtract",
}

export type StagesNames =
  | StageEnum.start
  | StageEnum.accountInfo
  | StageEnum.balance
  | StageEnum.withdrawal
  | StageEnum.deposit;

export type StageOption = {
  label: string;
  toStage?: string;
  action?: () => void;
  emptyAction?: () => void;
};

export type Stages = {
  [key in StagesNames]: StageOption[];
};

export type ButtonConfig = {
  label: string;
  type?: "cancel" | "clear" | "enter" | "default";
};

export type Callback = () => void;
