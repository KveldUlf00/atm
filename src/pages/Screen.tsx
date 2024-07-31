import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

import ATMButton from "../components/ATMButton";
import availableStages from "../static/stages";
import { StagesNames } from "../types/main";

type ScreenProps = {
  stage: StagesNames;
  atmButtonHandler: (panel: string, index: number) => void;
};

export default function Screen({ stage, atmButtonHandler }: ScreenProps) {
  const keyboardValue = useSelector((state: RootState) => state.keyboard.value);

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
      <div className="screen__middle-panel">
        {availableStages[stage].map((elem, index) => (
          <div
            key={`atmButton-right-key-${index}`}
            className="screen__middle-panel__option flex-center"
          >
            <span className="screen__middle-panel__option__label flex-center">
              {elem.label}
            </span>
          </div>
        ))}
      </div>
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
