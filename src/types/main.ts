export type StagesNames =
  | "start"
  | "accountInfo"
  | "balance"
  | "withdrawal"
  | "deposit";

export type StageOption = {
  label: string;
  toStage?: string;
  action?: () => void;
};

export type Stages = {
  [key in StagesNames]: StageOption[];
};
