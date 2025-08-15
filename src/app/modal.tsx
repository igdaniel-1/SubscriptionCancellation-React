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
   let title_count = 0;
   const [title, setTitle] = useState(allTitles[0].value);

   // temp variable to hold onto title update testing value
   const [inputValue, setInputValue] = useState("");

  const handleContinueClick = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
        setTitle(inputValue.trim());
        setInputValue(""); // Clear input after submission
    }
    console.log("new title:",title);
    console.log(allTitles, "title here??", ", count:", title_count);
    // setTitle(allTitles[title_count+1].value);
    // console.log("count:", allTitles[title_count+1].value);
    
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
        {allTitles[title_count] && <h2 className="inner-modal-text">{allTitles[title_count].name}</h2>}
        <div className="inner-modal-text">{allTitles[title_count].value}</div>
        {/* start experimental inter modal updating here */}
        <form onSubmit={handleContinueClick}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {title}
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter new title..."
          />

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>


        {/* end experimental section */}
        {/* close the modal */}
            {/* <button
                onClick={onClose}
                className="modal-button-text"
                >
                Close
            </button> */}
        {/* continue on modal pathway */}
            {/* <button    
                onClick={handleContinueClick}
                className="modal-button-text"
                >
                Continue
            </button> */}
      </div>
    </div>
  );
};

export default Modal;
