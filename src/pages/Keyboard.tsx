import { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";

import KeyboardButton from "../components/KeyboardButton";
import { appendValue, clearValue } from "../state/keyboard/keyboardSlice";
import { RootState } from "../state/store";
import { appendBalance, subtractBalance } from "../state/balance/balanceSlice";
import { StagesNames } from "../types/main";
import {
  disableKeyboard,
  enableATMButtons,
  windowIsLoaded,
  windowIsLoading,
} from "../state/permissions/permissionsSlice";

type ButtonConfig = {
  label: string;
  type?: "cancel" | "clear" | "enter" | "default";
};

interface KeyboardProps {
  setStage: Dispatch<SetStateAction<StagesNames>>;
}

export default function Keyboard({ setStage }: KeyboardProps) {
  const keyboardValue = useSelector((state: RootState) => state.keyboard.value);
  const valueType = useSelector((state: RootState) => state.keyboard.type);

  const dispatch = useDispatch();

  const initConfiguration = () => {
    dispatch(clearValue());
    dispatch(disableKeyboard());
    dispatch(enableATMButtons());
  };

  // TODO: "cancel" and others out of magic strings
  const handleClick = (label: string) => {
    if (label === "cancel") {
      dispatch(windowIsLoading());
      initConfiguration();
      setTimeout(() => {
        setStage("start");
        dispatch(windowIsLoaded());
      }, 2000);
    } else if (label === "clear") {
      dispatch(clearValue());
    } else if (label === "enter") {
      initConfiguration();

      if (valueType === "append") {
        dispatch(appendBalance(Number(keyboardValue)));
      } else {
        dispatch(subtractBalance(Number(keyboardValue)));
      }

      setStage("start");
    } else {
      dispatch(appendValue(label));
    }
  };

  const buttons: ButtonConfig[][] = [
    [
      { label: "1" },
      { label: "2" },
      { label: "3" },
      { label: "cancel", type: "cancel" },
    ],
    [
      { label: "4" },
      { label: "5" },
      { label: "6" },
      { label: "clear", type: "clear" },
    ],
    [
      { label: "7" },
      { label: "8" },
      { label: "9" },
      { label: "enter", type: "enter" },
    ],
    [{ label: "" }, { label: "0" }, { label: "" }, { label: "" }],
  ];

  return (
    <div className="keyboard-panel">
      {buttons.map((row, rowIndex) => (
        <div key={`rowIndex-${rowIndex}`} className="keyboard-row">
          {row.map((button, buttonIndex) => (
            <KeyboardButton
              key={`buttonIndex-${buttonIndex}`}
              label={button.label}
              onClick={() => handleClick(button.label)}
              type={button.type}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
