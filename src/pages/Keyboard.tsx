import { useDispatch } from "react-redux";

import KeyboardButton from "../components/KeyboardButton";
import { appendValue, clearValue } from "../state/keyboard/keyboardSlice";

type ButtonConfig = {
  label: string;
  type?: "cancel" | "clear" | "enter" | "default";
};

export default function Keyboard() {
  const dispatch = useDispatch();

  // TODO: "cancel" and others out of magic strings
  const handleClick = (label: string) => {
    if (label === "cancel") {
      console.log("cancel");
    } else if (label === "clear") {
      dispatch(clearValue());
    } else if (label === "enter") {
      console.log("enter");
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
