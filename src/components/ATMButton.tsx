import { ChevronLeft, ChevronRight } from "lucide-react";
import { RootState } from "../state/store";
import { useSelector } from "react-redux";

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
