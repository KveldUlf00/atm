import React, { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";

import KeyboardButton from "../components/KeyboardButton";
import {
  BalanceChangeKind,
  ButtonConfig,
  KeyboardSpecialBtn,
  StageEnum,
  StagesNames,
} from "../types/main";
import { RootState } from "../state/store";
import { appendBalance, subtractBalance } from "../state/balance/balanceSlice";
import { appendValue, clearValue } from "../state/keyboard/keyboardSlice";
import {
  disableKeyboard,
  enableATMButtons,
  windowIsLoaded,
  windowIsLoading,
} from "../state/permissions/permissionsSlice";

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

  const handleClick = (label: string) => {
    if (label === KeyboardSpecialBtn.cancel) {
      dispatch(windowIsLoading());
      initConfiguration();
      setTimeout(() => {
        setStage(StageEnum.start);
        dispatch(windowIsLoaded());
      }, 2000);
    } else if (label === KeyboardSpecialBtn.clear) {
      dispatch(clearValue());
    } else if (label === KeyboardSpecialBtn.enter) {
      initConfiguration();

      if (valueType === BalanceChangeKind.append) {
        dispatch(appendBalance(Number(keyboardValue)));
      } else {
        dispatch(subtractBalance(Number(keyboardValue)));
      }

      setStage(StageEnum.start);
    } else if (Number(keyboardValue) <= 9999) {
      dispatch(appendValue(label));
    }
  };

  const buttons: ButtonConfig[][] = [
    [
      { label: "1" },
      { label: "2" },
      { label: "3" },
      { label: KeyboardSpecialBtn.cancel, type: KeyboardSpecialBtn.cancel },
    ],
    [
      { label: "4" },
      { label: "5" },
      { label: "6" },
      { label: KeyboardSpecialBtn.clear, type: KeyboardSpecialBtn.clear },
    ],
    [
      { label: "7" },
      { label: "8" },
      { label: "9" },
      { label: KeyboardSpecialBtn.enter, type: KeyboardSpecialBtn.enter },
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
