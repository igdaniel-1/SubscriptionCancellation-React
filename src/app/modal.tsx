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
    { name: "Hey Mate! Quick one before you go.", value: ["Yes", "No"] },
    // found a job pathway
    { name: "Congrats on the new role!", value: ["find thru MM", "PKGA", "Continue"] },
    { name: "What's one thing you wish we could've helped you with?", value: ["input text field", "Continue"] },
    // job through MM
    { name: "We helped you land the job, immigration lawyer?", value: ["Yes", "No"] },
    { name: "We helped you land the job, YES immigration lawyer", value: ["input text field", "Continue"] },
    { name: "We helped you land the job, NO immigration lawyer", value: ["input text field", "Continue"] },
    { name: "All done!", value: ["Close/Continue"] },
    // job outside MM
    { name: "You landed the job, immigration lawyer?", value: ["Yes", "No"] },
    { name: "You landed the job, YES immigration lawyer", value: ["input text field", "Continue"] },
    { name: "You landed the job, NO immigration lawyer", value: ["input text field", "Continue"] },
    { name: "Your cancellation is all sorted, mate, no more changes.", value: ["Close/Continue"] },

    // no job pathway
    // here will be the optional DISCOUNT page
    { name: "We built this to help you land the job, this makes it a little easier.", value: ["Accept and Continue", "Decline and Continue"] },
    { name: "Help us understand how you were using Migrate Mate.", value: ["PKGA", "Continue"] },
    { name: "What's the main reason for cancelling?", value: ["5 seperate reasons w radio buttons"] },
    { name: "What's the main reason for cancelling?", value: ["input text field related to previous reason", "Continue"] },
    { name: "Sorry to see you go", value: ["Close/Continue"] }
   ]

   const [titleCounter, setTitleCounter] = useState(0);

    const handleContinueClick = (e) => {
        e.preventDefault();
        console.log("current title: ", titleCounter);
        let currentTitleCount = titleCounter;
        // here is where I will manage the state tree 
        // there need to be jumps in the iteration to progress the story path accurately


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
