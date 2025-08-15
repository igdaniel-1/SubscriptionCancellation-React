import React, { MouseEvent, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  body?: string;
//   children?: string;
  children?: React.ReactNode;
//   backgroundColor?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
//   title,
  body,
  children,
//   backgroundColor = "white",
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };



   // titles pathway 
   const allTitles = [
    { name: "hey", value: "Hey Mate!" },
    { name: "congrats", value: "Congrats!" },
    { name: "help", value: "What can we do to help?" },
    { name: "how", value: "How were you using?" },
    { name: "reason", value: "Reason for cancelling" },
    { name: "sorry", value: "Sorry to see you go" }
   ]

   const [titleCounter, setTitleCounter] = useState(0);

    const handleContinueClick = (e) => {
        e.preventDefault();
        console.log("current title: ", titleCounter);
        let currentTitleCount = titleCounter;
        currentTitleCount++;
        setTitleCounter(currentTitleCount);
        console.log("updated title count: ", titleCounter);

    
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleOverlayClick}
    >
      <div
        className="p-6 rounded-xl shadow-lg w-96 transition-colors duration-300"
        // style={{ backgroundColor }}
        onClick={handleModalClick}
      >
        {allTitles[titleCounter] && <h2 className="inner-modal-text">{allTitles[titleCounter].name}</h2>}
        <div className="inner-modal-text">{allTitles[titleCounter].value}</div>

            {/* continue on modal pathway */}
            <button    
                onClick={handleContinueClick}
                className="modal-button-text"
                >
                Continue, {titleCounter}
            </button>
            {/* close the modal */}
            <button
                onClick={onClose}
                className="modal-button-text"
                >
                Close
            </button>
        
        
      </div>
    </div>
  );
};

export default Modal;
