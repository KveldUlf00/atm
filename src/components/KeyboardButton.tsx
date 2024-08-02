import React from "react";
import { RootState } from "../state/store";
import { useSelector } from "react-redux";

interface KeyboardButtonProps {
  label: string;
  onClick: () => void;
  type?: "default" | "cancel" | "clear" | "enter";
}

export default function KeyboardButton({
  label,
  onClick,
  type = "default",
}: KeyboardButtonProps) {
  const canUseKeyboard = useSelector(
    (state: RootState) => state.permissions.canUseKeyboard
  );

  return (
    <button
      className={`key-button ${type} ${label === "" && "not-clickable"}`}
      onClick={onClick}
      disabled={!canUseKeyboard}
    >
      {label}
    </button>
  );
}
