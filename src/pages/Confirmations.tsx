import { Dispatch, SetStateAction, useState } from "react";

interface MessageHoleProps {
  message?: string;
  setMessage: Dispatch<SetStateAction<string>>;
}

export default function Confirmations({
  message,
  setMessage,
}: MessageHoleProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handlePaperClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setModalOpen(true);
  };

  const handlePaperClose = () => {
    setModalOpen(false);
    setMessage("");
  };

  return (
    <div className="message-hole-container">
      <div className="message-hole">
        {message && (
          <div className="paper" onClick={(e) => handlePaperClick(e)}></div>
        )}
      </div>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handlePaperClose}>
              &times;
            </span>
            <p>
              {message ||
                "Siała baba mak Siała baba mak Siała baba mak Siała baba mak"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
