import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface MessageHoleProps {
  messages?: (number | string)[];
  setMessages: Dispatch<SetStateAction<(number | string)[]>>;
}

export default function Confirmations({
  messages,
  setMessages,
}: MessageHoleProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [paperVisible, setPaperVisible] = useState(false);

  const handlePaperClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setModalOpen(true);
    setPaperVisible(false);
  };

  const handlePaperClose = () => {
    setModalOpen(false);
    setMessages([]);
  };

  useEffect(() => {
    if (messages !== undefined && messages?.length > 0) {
      setPaperVisible(true);
    }
  }, [messages]);

  return (
    <div className="message-hole-container">
      <div className="message-hole">
        {paperVisible && (
          <div className="paper" onClick={(e) => handlePaperClick(e)}></div>
        )}
      </div>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handlePaperClose}>
              &times;
            </span>
            {messages?.map((message, index) => (
              <p
                key={`key-${index}-${message}`}
                className={`modal-content__message ${
                  messages.length === 1 && "alone"
                } ${typeof message === "string" && "preLine"}`}
              >
                {typeof message === "string"
                  ? message
                  : `Your current balance is ${message}.`}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
