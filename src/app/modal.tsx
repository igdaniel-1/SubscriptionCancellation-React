import React, { MouseEvent, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  body?: string;
//   children?: string;
  children?: React.ReactNode;
}

// reusable components
const Form: React.FC<any> = ({}) => {
    return (
        <form>
          <label>Label Text Here:
            <input type="text" />
          </label>
        </form>
      )
}
const JobQuestions: React.FC<any> = ({}) => {
    return (
        <div>
            <h3>How many roles did you apply for through Migrate Mate?</h3>
            <button className="modal-button-text">NUMBER INPUT BUTTON</button>
            <h3>How many companies did you email directly?</h3>
            <button className="modal-button-text">NUMBER INPUT BUTTON</button>
            <h3>How many different companies did you interview with?</h3>
            <button className="modal-button-text">NUMBER INPUT BUTTON</button>
        </div>
        
    )
}
const DiscountOffer: React.FC<any> = ({}) => {
    return (
        <div>
            <button className="discount-button-text">Get 50% off</button>
        </div>
    )
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
    //    iterates through all the story path titles
    const [titleCounter, setTitleCounter] = useState(0);

    //    state vars to control which stages are jumped to/skipped over
    const [hasJob, setHasJob] = useState<boolean>(false);
    const [gotJobThruMM, setGotJobThruMM] = useState<boolean>(false);
    const [hasImmigrationLawyer, setHasImmigrationLawyer] = useState<boolean>(false);


    const handleContinueClick = (e) => {
        e.preventDefault();
        console.log("current title: ", titleCounter);
        
        // here is where I will manage the state tree 
        // there needs to be jumps in the iteration to progress the story path accurately
        
        if (titleCounter==0 && hasJob==false){
            // take user down no job found path
            console.log("title is at stage 0");
            let currentTitleCount = 11;
            setTitleCounter(currentTitleCount);
            console.log("updated title count: ", titleCounter);
        }else if (titleCounter==14){
            // take user from discount no job path to ending page
            let currentTitleCount = 18;
            setTitleCounter(currentTitleCount);
            console.log("updated title count: ", titleCounter);
        }
        else{
            // set standard page progression logic
            let currentTitleCount = titleCounter;
            currentTitleCount++;
            setTitleCounter(currentTitleCount);
            console.log("updated title count: ", titleCounter);
        }

        

    
  };
    const ButtonList: React.FC<any> = ({}) => {
        console.log(allTitles[titleCounter].value);
        const listItems = allTitles[titleCounter].value.map(buttonValue =>
            <button>{buttonValue}</button> 
                // onClick={handleContinueClick}>{buttonValue}</button>         
        );
        return (
            <ul>{listItems}</ul>
        )
    }

    // single use components
    // this is a helper to store the "found job Y/N" state
    const FoundJob: React.FC<any> = ({}) => {
        return (
            <div>
                <h3>Whatever your answer, we just want to help you take the next step. With visa support, or by hearing how we can do better.</h3>
                <button 
                    onClick={function handleClick() {
                        setHasJob(true);
                        console.log("job set to true");
                      }}
                    className="modal-button-text">
                    Yes
                </button>
                <button 
                    onClick={function handleClick() {
                        setHasJob(false);
                        console.log("job set to false");
                      }}
                    className="modal-button-text">
                    No
                </button>
            </div>
        )
    }
    // this is a helper to set the "found job thru MM" state
    const FoundThroughMM: React.FC<any> = ({}) => {
        return (
            <div>
                <h3>Did you find this role through Migrate Mate?</h3>
                <button 
                    onClick={function handleClick() {
                        setGotJobThruMM(true);
                        console.log("MM set to true");
                      }}
                    className="modal-button-text">
                    Yes
                </button>
                <button 
                    onClick={function handleClick() {
                        setGotJobThruMM(false);
                        console.log("MM set to false");
                      }}
                    className="modal-button-text">
                    No
                </button>
            </div>
        )
    }
    // this is a helper to set the "has immigration lawyer" state
    const ImmigrationLawyer: React.FC<any> = ({}) => {
        return (
            <div>
                <h3>Is your company providing an immigration lawyer to help with your visa?</h3>
                <button 
                    onClick={function handleClick() {
                        setHasImmigrationLawyer(true);
                        console.log("immigration lawyer set to true");
                      }}
                    className="modal-button-text">
                    Yes
                </button>
                <button 
                    onClick={function handleClick() {
                        setHasImmigrationLawyer(false);
                        console.log("immigration lawyer set to false");
                      }}
                    className="modal-button-text">
                    No
                </button>
            </div>
        )
    }
    const ImmigrationLawyerFollowUp: React.FC<any> = ({}) => {
        if (hasImmigrationLawyer){
            console.log("has lawyer")
            return (
                <div>
                    <h3>What visa will you be applying for?</h3>
                    <Form></Form>
                </div>
                )
        }else{
            console.log("no lawyer")
            return (
                <div>
                    <h3>We can connect you with one of our trusted partners.</h3>
                    <h3>Which visa would you like to apply for?</h3>
                    <Form></Form>
                </div>
            )
        }
        
    }



    // titles pathway 
    const allTitles = [
        { name: "Hey Mate! Quick one before you go. Have you found a job yet?", value: [<FoundJob></FoundJob>], key:0 },
        // found a job pathway
        { name: "Congrats on the new role!", value: [<FoundThroughMM></FoundThroughMM>, <JobQuestions></JobQuestions>], key:1 },
        
        // job through MM
        { name: "What's one thing you wish we could've helped you with?", value: [<Form></Form>], key:2 },
        { name: "We helped you land the job, immigration lawyer?", value: [<ImmigrationLawyer></ImmigrationLawyer>], key:3 },
        { name: "We helped you land the job, now let’s help you secure your visa.", value: [<ImmigrationLawyerFollowUp></ImmigrationLawyerFollowUp>], key:4 },
        // { name: "We helped you land the job, NO immigration lawyer", value: ["input text field", "Continue"], key:5 },
        { name: "All done!", value: ["Close/Continue"], key:6 },
        // job outside MM
        { name: "What's one thing you wish we could've helped you with?", value: [<Form></Form>, "Continue"], key:7 },
        { name: "You landed the job, immigration lawyer?", value: [<ImmigrationLawyer></ImmigrationLawyer>], key:8 },
        { name: "You landed the job, YES immigration lawyer", value: ["input text field", "Continue"], key:9 },
        { name: "You landed the job, NO immigration lawyer", value: ["input text field", "Continue"], key:10},
        { name: "Your cancellation is all sorted, mate, no more changes.", value: ["Close/Continue"], key:11 },

        // no job pathway
        // here will be the optional DISCOUNT page
        { key:12, name: "We built this to help you land the job, this makes it a little easier.", value: ["Here's 50% off until you find a job.", "Decline and Continue", <DiscountOffer></DiscountOffer>] },
        { key:13, name: "Help us understand how you were using Migrate Mate.", value: [<JobQuestions></JobQuestions>, <DiscountOffer></DiscountOffer>, "Continue"] },
        { key:14, name: "What's the main reason for cancelling?", value: ["5 seperate reasons w radio buttons", <DiscountOffer></DiscountOffer>,"Continue"] },
        { key:15, name: "What's the main reason for cancelling?", value: ["input text field related to previous reason", <DiscountOffer></DiscountOffer>,"Continue"] },

        // version with NO discount
        { key:16, name: "Help us understand how you were using Migrate Mate.", value: [<JobQuestions></JobQuestions>, "Continue"] },
        { key:17, name: "What's the main reason for cancelling?", value: ["5 seperate reasons w radio buttons"] },
        { key:18, name: "What's the main reason for cancelling?", value: ["input text field related to previous reason", "Continue"] },


        { key:18, name: "Sorry to see you go", value: ["Close/Continue"] }
    ]

    

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

        {/* list of buttons relevant to each title page in the path */}
        <div className="inner-modal-text"><ButtonList></ButtonList></div>
            

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
