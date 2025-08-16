import React, { MouseEvent, useState } from "react";

interface CancellationData{
    user_id: string,
    monthlyPrice:number,
    downsell_variant:string,
    reason:string,
    accepted_downsell:string,
    cancelAtPeriodEnd: boolean,
  }

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  body?: string;
//   children?: string;
  children?: React.ReactNode;
  user_data: Object;
  subscription_data: Object;
  cancellation_data: CancellationData;
  updateCancellationData:(newCancellationData: Partial<CancellationData>) => void;
}

// reusable components
const Form: React.FC<any> = ({}) => {
    return (
        <form>
          {/* <label>Label Text Here: */}
            <input type="text" />
          {/* </label> */}
        </form>
      )
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}





const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    //   title,
    body,
    children,
    user_data,
    subscription_data,
    cancellation_data,
    updateCancellationData,

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
    const [selectedRadioValue, setSelectedRadioValue] = useState<string>("None");


    const handleContinueClick = (e) => {
        e.preventDefault();
        console.log("current title: ", titleCounter);
        console.log("current data: ", user_data, subscription_data, cancellation_data);
        
        // here is where I will manage the state tree 
        // there needs to be jumps in the iteration to progress the story path accurately
        
        if (titleCounter==0 && hasJob==false){
            // take user down no job found path
            console.log("title is at stage 0");
            let choice = getRandomInt(1,2);
            // there's a 50% chance the page is redirected to the discount page, page 11
            if (choice == 1){
                let currentTitleCount = 11;
                setTitleCounter(currentTitleCount);
            }
            // there's a 50% chance the page is redirected to the NON discount page, page 14
            if (choice == 2){
                // this is the non-discount path, we can set the downsell to false
                // bc it won't be available to this user
                updateCancellationData({downsell_variant: 'No', accepted_downsell:'No'});
                let currentTitleCount = 14;
                setTitleCounter(currentTitleCount);
            }
            console.log("updated title count: ", titleCounter);
        }else if (titleCounter==2 && !gotJobThruMM){
            // if job was acquired outside the MM Network
            let currentTitleCount = 7;
            setTitleCounter(currentTitleCount);
            console.log("updated title count: ", titleCounter);
        }else if (titleCounter==13){
            // take user from discount and no job path to ending page
            let currentTitleCount = 17;
            setTitleCounter(currentTitleCount);
            console.log("updated title count: ", titleCounter);
        }else if (titleCounter==5||titleCounter==9||titleCounter==18||titleCounter==19){ //i may need to change this to 17 and 18, theres an extra page in the no discount flow
            // if user tries to continue past dialogue, the modal closes
            // dialogue close points are at:
            // yes job and completed Imm Lawyer feedback (path 1 - Yes MM),
            // yes job and completed Imm Lawyer feedback (path 2 - No MM),
            // no job and no redeem discount, 
            // and no job plus selected discount 

            // at this point we can set their account status
            // if they selected a reason to leave, their subscription is NOT active
            if (selectedRadioValue!="None"){
                updateCancellationData({cancelAtPeriodEnd: true});
            }
            onClose();
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
    const DiscountOffer: React.FC<any> = ({}) => {
        return (
            <div>
                <button onClick={function handleClick() {
                            setTitleCounter(18);
                            console.log("discount set to true");
                            // cancellation_data.downsell_variant={true};
                            updateCancellationData({downsell_variant: 'Yes', accepted_downsell:'Yes'});
                            console.log('cancel data:', cancellation_data);
                          }}
                    className="discount-button-text">Get $10 off</button>
            </div>
        )
    }
    const RadioButtonSingle: React.FC<any> = ({
        label,
        // selected,
        onSelect,
         }) => {
        return (
            <li>
                <button
                    onClick={onSelect}
                >
                    {label}
                </button>
            </li>
        )
    }
    const RadioButtonSelection: React.FC<any> = ({}) => {
        return (
            <div>
                <ul>
                    <RadioButtonSingle
                        label="Too expensive"
                        selected={
                            selectedRadioValue ===
                            "Too expensive"
                        }
                        onSelect={() =>
                            
                            setSelectedRadioValue(
                                "Too expensive"
                            )
                        }
                    />
                    <RadioButtonSingle
                        label="Platform not helpful"
                        selected={
                            selectedRadioValue ===
                            "Platform not helpful"
                        }
                        onSelect={() =>
                            setSelectedRadioValue(
                                "Platform not helpful"
                            )
                        }
                    />
                    <RadioButtonSingle
                        label="Not enough relevant jobs"
                        selected={
                            selectedRadioValue ===
                            "Not enough relevant jobs"
                        }
                        onSelect={() =>
                            setSelectedRadioValue(
                                "Not enough relevant jobs"
                            )
                        }
                    />
                    <RadioButtonSingle
                        label="Decided not to move"
                        selected={
                            selectedRadioValue ===
                            "Decided not to move"
                        }
                        onSelect={() =>
                            setSelectedRadioValue(
                                "Decided not to move"
                            )
                        }
                    />
                    <RadioButtonSingle
                        label="Other"
                        selected={
                            selectedRadioValue ===
                            "Other"
                        }
                        onSelect={() =>
                            setSelectedRadioValue(
                                "Other"
                            )
                        }
                    />
                </ul>
            </div>
        )
    }
    const RadioButtonSelectionFollowUp: React.FC<any> = ({}) => {
        // change cancel subscription reason to reason provided on reason selection page
        if (selectedRadioValue!="None"){
            updateCancellationData({reason: selectedRadioValue});
        }
        return (
            <div>
                <h3>{selectedRadioValue}</h3>
                <Form></Form>
            </div>
        )
    }
    const JobQuestions: React.FC<any> = ({}) => {
        return (
            <div>
                <h3>How many roles did you apply for through Migrate Mate?</h3>
                <RadioButtonSingle
                    label="0"
                />
                <RadioButtonSingle
                    label="1-5"
                />
                <RadioButtonSingle
                    label="6-20"
                />
                <RadioButtonSingle
                    label="20+"
                />
                <h3>How many companies did you email directly?</h3>
                <RadioButtonSingle
                    label="0"
                />
                <RadioButtonSingle
                    label="1-5"
                />
                <RadioButtonSingle
                    label="6-20"
                />
                <RadioButtonSingle
                    label="20+"
                />
                <h3>How many different companies did you interview with?</h3>
                <RadioButtonSingle
                    label="0"
                />
                <RadioButtonSingle
                    label="1-2"
                />
                <RadioButtonSingle
                    label="3-5"
                />
                <RadioButtonSingle
                    label="5+"
                />
            </div>
            
        )
    }



    // titles pathway 
    const allTitles = [
        { name: "Hey Mate! Quick one before you go. Have you found a job yet?", value: [<FoundJob></FoundJob>], key:0 },
        // found a job pathway
        { name: "Congrats on the new role!", value: [<FoundThroughMM></FoundThroughMM>, <JobQuestions></JobQuestions>], key:1 },
        
        // job through MM
        { name: "What's one thing you wish we could've helped you with?", value: [<Form></Form>], key:2 },
        { name: "We helped you land the job, now let's help you secure your visa.", value: [<ImmigrationLawyer></ImmigrationLawyer>], key:3 },
        { name: "We helped you land the job, now let's help you secure your visa.", value: [<ImmigrationLawyerFollowUp></ImmigrationLawyerFollowUp>], key:4 },
        // { name: "We helped you land the job, NO immigration lawyer", value: ["input text field", "Continue"], key:5 },
        { name: "All done!", value: ["Close/Continue"], key:6 },
        // job outside MM
        { name: "What's one thing you wish we could've helped you with?", value: [<Form></Form>, "Continue"], key:7 },
        { name: "You landed the job! That's what we live for. Even if it wasn’t through Migrate Mate, let us help get your visa sorted.", value: [<ImmigrationLawyer></ImmigrationLawyer>], key:8 },
        { name: "You landed the job! That's what we live for. Even if it wasn’t through Migrate Mate, let us help get your visa sorted.", value: [<ImmigrationLawyerFollowUp></ImmigrationLawyerFollowUp>], key:9 },
        // { name: "You landed the job, NO immigration lawyer", value: ["input text field", "Continue"], key:10},
        { name: "Your cancellation is all sorted, mate, no more changes.", value: ["Close/Continue"], key:11 },

        // no job pathway
        // here will be the optional DISCOUNT page
        { key:12, name: "We built this to help you land the job, this makes it a little easier.", value: ["Here's 50% off until you find a job.", "Decline and Continue", <DiscountOffer></DiscountOffer>] },
        { key:13, name: "Help us understand how you were using Migrate Mate.", value: [<JobQuestions></JobQuestions>, <DiscountOffer></DiscountOffer>] },
        { key:14, name: "What's the main reason for cancelling?", value: [<RadioButtonSelection></RadioButtonSelection>, <DiscountOffer></DiscountOffer>] },
        { key:15, name: "What's the main reason for cancelling?", value: [<RadioButtonSelectionFollowUp></RadioButtonSelectionFollowUp>, <DiscountOffer></DiscountOffer>] },

        // version with NO discount
        { key:16, name: "Help us understand how you were using Migrate Mate.", value: [<JobQuestions></JobQuestions>] },
        { key:17, name: "What's the main reason for cancelling?", value: [<RadioButtonSelection></RadioButtonSelection>] },
        { key:18, name: "What's the main reason for cancelling?", value: [<RadioButtonSelectionFollowUp></RadioButtonSelectionFollowUp>] },


        { key:18, name: "Sorry to see you go", value: ["Close/Continue"] },
        { key:19, name: "Great choice, mate! You're still on the path to your dream role.", value: ["."] }
    ]

    

  return (
    <div
        id="outerModalContainer"
    //   className="modalContainer"
    //   "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleOverlayClick}
    >
      <div
        id="innerModalContainer"
        // className="p-6 rounded-xl shadow-lg w-96 transition-colors duration-300"
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
