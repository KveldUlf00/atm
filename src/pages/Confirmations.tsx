import { useState } from "react";

interface MessageHoleProps {
  message?: string;
}

export default function Confirmations({ message }: MessageHoleProps) {
  const [showPaper, setShowPaper] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handlePaperVisibility = () => {
    setShowPaper(true);
  };

  const handlePaperClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setModalOpen(true);
    setShowPaper(false);
  };

  return (
    <div className="message-hole-container">
      <div className="message-hole" onClick={handlePaperVisibility}>
        {showPaper && (
          <div className="paper" onClick={(e) => handlePaperClick(e)}></div>
        )}
      </div>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalOpen(false)}>
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
