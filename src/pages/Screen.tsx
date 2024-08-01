import { useDispatch, useSelector } from "react-redux";
import { Ban } from "lucide-react";

import ATMButton from "../components/ATMButton";
import { RootState } from "../state/store";
import { StagesNames } from "../types/main";
import availableStages from "../static/stages";
import { useEffect } from "react";
import { clearError } from "../state/balance/balanceSlice";

type ScreenProps = {
  stage: StagesNames;
  atmButtonHandler: (panel: string, index: number) => void;
};

export default function Screen({ stage, atmButtonHandler }: ScreenProps) {
  const keyboardValue = useSelector((state: RootState) => state.keyboard.value);
  const errorInBalance = useSelector((state: RootState) => state.balance.error);
  const canUseKeyboard = useSelector(
    (state: RootState) => state.permissions.canUseKeyboard
  );
  const windowIsLoading = useSelector(
    (state: RootState) => state.permissions.windowLoading
  );

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("errorInBalance", errorInBalance);

    if (errorInBalance) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 4500);

      return () => clearTimeout(timer);
    }
  }, [errorInBalance, dispatch]);

  const renderMiddlePanel = () => {
    if (canUseKeyboard) {
      return (
        <div className="screen__middle-panel__keyboardValue">
          <span>
            Type the value on the keyboard and confirm by pressing{" "}
            <span className="green">enter</span>
          </span>
          <span className="value">
            Value: <span className="value__inner">{keyboardValue}</span>
          </span>
        </div>
      );
    } else if (windowIsLoading) {
      return <span className="screen__middle-panel__loading"></span>;
    } else if (!windowIsLoading && errorInBalance !== "") {
      return (
        <div className="screen__middle-panel__error">
          <Ban size={48} color="#ff0000" /> <span>{errorInBalance}</span>
        </div>
      );
    } else {
      return availableStages[stage].map((elem, index) => (
        <div
          key={`atmButton-right-key-${index}`}
          className="screen__middle-panel__option flex-center"
        >
          <span className="screen__middle-panel__option__label flex-center">
            {elem.label}
          </span>
        </div>
      ));
    }
  };

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
      <div className="screen__middle-panel">{renderMiddlePanel()}</div>
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
