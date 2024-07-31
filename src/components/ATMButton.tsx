// src/components/ATMButton.tsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

interface ATMButtonProps {
  onClick: () => void;
  arrowDirection: "left" | "right";
}

export default function ATMButton({ onClick, arrowDirection }: ATMButtonProps) {
  const canUseATMButtons = useSelector(
    (state: RootState) => state.permissions.canUseATMButtons
  );

  return (
    <button
      className={`atm-button ${arrowDirection}`}
      onClick={onClick}
      disabled={!canUseATMButtons}
    >
      <span className="arrow">
        {arrowDirection === "left" ? <ChevronLeft /> : <ChevronRight />}
      </span>
    </button>
  );
}
