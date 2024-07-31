import ATMButton from "../components/ATMButton";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useEffect, useState } from "react";

type ScreenProps = {
  atmButtonHandler: (panel: string, index: number) => void;
};

type StagesNames =
  | "start"
  | "accountInfo"
  | "balance"
  | "withdrawal"
  | "deposit";

type StageOption = {
  label: string;
  toStage: string;
};

type Stages = {
  [key in StagesNames]: StageOption[];
};

export default function Screen({ atmButtonHandler }: ScreenProps) {
  const [stage, setStage] = useState<StagesNames>("start");

  const keyboardValue = useSelector((state: RootState) => state.keyboard.value);

  const availableStages: Stages = {
    start: [
      { label: "Account information", toStage: "accountInfo" },
      { label: "Balance", toStage: "balance" },
      { label: "Withdrawal", toStage: "withdrawal" },
      { label: "Deposit", toStage: "deposit" },
    ],
    accountInfo: [
      { label: "Account information", toStage: "accountInfo" },
      { label: "Balance", toStage: "balance" },
      { label: "Withdrawal", toStage: "withdrawal" },
      { label: "Deposit", toStage: "deposit" },
    ],
    balance: [
      { label: "Account information", toStage: "accountInfo" },
      { label: "Balance", toStage: "balance" },
      { label: "Withdrawal", toStage: "withdrawal" },
      { label: "Deposit", toStage: "deposit" },
    ],
    withdrawal: [
      { label: "Account information", toStage: "accountInfo" },
      { label: "Balance", toStage: "balance" },
      { label: "Withdrawal", toStage: "withdrawal" },
      { label: "Deposit", toStage: "deposit" },
    ],
    deposit: [
      { label: "Account information", toStage: "accountInfo" },
      { label: "Balance", toStage: "balance" },
      { label: "Withdrawal", toStage: "withdrawal" },
      { label: "Deposit", toStage: "deposit" },
    ],
  };

  console.log("availableStages[stage]", availableStages[stage]);

  useEffect(() => {
    console.log("keyboardValue", keyboardValue);
  }, [keyboardValue]);

  return (
    <div className="screen">
      <div className="screen__left-panel">
        {Array.from({ length: 4 }).map((_, index) => (
          <ATMButton
            key={`atmButton-left-key-${index}`}
            onClick={() => atmButtonHandler("left", index)}
            arrowDirection="right"
          />
        ))}
      </div>
      <div className="screen__middle-panel"></div>
      <div className="screen__right-panel">
        {Array.from({ length: 4 }).map((_, index) => (
          <ATMButton
            key={`atmButton-right-key-${index}`}
            onClick={() => atmButtonHandler("right", index)}
            arrowDirection="left"
          />
        ))}
      </div>
    </div>
  );
}
