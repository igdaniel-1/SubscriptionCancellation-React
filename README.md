# Migrate Mate - Subscription Cancellation Flow Challenge

## Overview

Convert an existing Figma design into a fully-functional subscription-cancellation flow for Migrate Mate. This challenge tests your ability to implement pixel-perfect UI, handle complex business logic, and maintain security best practices.

## Objective

Implement the Figma-designed cancellation journey exactly on mobile + desktop, persist outcomes securely, and instrument the A/B downsell logic.

## What's Provided

This repository contains:
- ✅ Next.js + TypeScript + Tailwind scaffold
- ✅ `seed.sql` with users table (25/29 USD plans) and empty cancellations table
- ✅ Local Supabase configuration for development
- ✅ Basic Supabase client setup in `src/lib/supabase.ts`

## Getting Started

1. **Clone this repository** `git clone [repo]`
2. **Install dependencies**: `npm install`
3. **Set up local database**: `npm run db:setup`
4. **Start development**: `npm run dev`

## Deliverables

1. **Working implementation** in this repository
2. **NEW One-page README.md (replace this)** (≤600 words) explaining:
   - Architecture decisions
   - Security implementation
   - A/B testing approach
3. **Clean commit history** with meaningful messages

**Good luck!** We're excited to see your implementation.

## Hello !!!
## My name is India Daniel and this is my attempt at the Migrate Mate online assessment.
## Thank you for the opportunity to interview with your company!

## I am a proponent of bullet points. As such, my description for my progress is in a pseudo-journal format below.
## I hope the stylistic choice of presenting my work in this way makes my thought process visible and intuitive.

## Here is the link to the github repository I used where you can see my commits: (https://github.com/igdaniel-1/mm-cancel-flow-task-India)

## Working Progress Log START:

Supabase Install 
- Added as folder /supabase

Running DB Setup
- Error: Unable to find file supabase/seed.sql, resolved by moving seed.sql to /supabase folder
- Error: "failed to inspect service: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?", resolved with downloading Docker Application
- Error: "failed to send batch: ERROR: relation "users" does not exist (SQLSTATE 42P01)", attempted finding resolution by rerunning with '--debug' tag, no difference in error response
- solution #2: restarted computer, error has disappeared!!

Prepping Modal Path Options
- I think there may be a small error with "Offer Declined + How you were using", the sub-header text asks why the user is cancelling but the interactive element only lets them select numerical quantities for jobs. I will remove the red text for clarity of objective as their reason is inputted on following page.
- Implementation wise, I'm thinking of creating an array of all the path options, indexing them and hopping through them as the user progresses through the modal story path.
- There will be a dynamic 'continue' button that moves the content of the modal forward to the appropriate stage of the story path. I created this by adding a state variable to track which step of the story path the user was currently at. 

Modal Path Array Structure
- Now that I have an array full of all potential story path titles, I need to add data so I can have accurate buttons/features and text show up at each stage.
- For each title text, I have added a key. Additionally, I have added an array called "value" that stores the components that will be rendered when this phase of the story path is called.
- Some of the stages have reused components, such as the form text field, the number of jobs section, and the activate discount button.

Developing the structure for reusable components
- I created a simple Form with text input to be reused throughout the story path.
- I created a component with the "how many roles" 3 questions.
- Added component for discount offer button.
- Created a component that turns the array of options for each story step into a displayed list of buttons.

All buttons are continue buttons
- I have a helper function controlling my onClick to proceed to the next title in the story path. This is not always the case in the demo.
- I need to create more onClick helper functions to regulate the steps taken through the path.
- I also need this so users can click the multiple question buttons on some of the pages without the story moving forward preemptively. 
- Resolved this by using my state variables and some if statements in my Click handler to jump around the story depending on user's answers.

Adding the Offer Accepted page 
- I need to add a redirect to the accepted page if the user clicks the DiscountOffer button.
- Made this my modifying the DiscountOffer button code to index the page up to the new accepted page.

Create the 5 radio button structure on the "main reason for cancelling" page
- Depending on which button is clicked, that button's label is persisted to the next page as the label for the text input box.
- I need to create a state that will hold onto the problem, then pass that string to the next page.
- Resolved by building a radio button component. I build another component that housed 5 of those radio button components.
- When the radio buttons are clicked, the reason for quitting can be updated multiple times until "Continue" is pressed.
- The subsequent page displays the selected reason for leaving alongside a text input box. 

Break case for Discount Accepted.
- I added the Discount accepted page to the end of my page-titles array. To keep the modal form breaking if the user tried to continue at this point, I have continue set to execute the onClose function.
- Down the line, I will look to have the "Continue" button conditionally hidden on some pages.

Redirect to the dialogue path where Migrate Mate didn't help them find the job
- Jump from the second page to the correct index in my array for the proper dialogue.
- Reuse the Immigration Lawyer and Immigration Lawyer FollowUp components I developed for the "with help from MM" path.


Construct the UI for the reusable JobQuestions component
- Right now the buttons on this component do nothing when clicked.
- Changed values for the buttons to reflect the Figma example.

Editting user data from the front-end
- In order to modify the provided sample data, I need to pass that data into my child component AKA the unsubscribe modal.
- Once there, I can modify the data in my DiscountOffer helper function.
- This updates the downsell_variant and the accepted-downsell to "Yes".
- Likewise, I added the opposite value editting to the non-disocunt user path.
- For the 50% of user's who are not offered this deal, my continueClick helper function automatically sets their downsell_variant and the accepted-downsell to "No".
- I added the cancel.reason update to my radioButtonSelection helper. After the user selects the reason to cancel and then continues to the next page, the cancel interface is updated with the selected reason value.
- If the user completes the full story flow of the unsubscribe without using the deal to resubscribe, their cancelAtPeriodEnd status is updated to true. This is managed within my continueClick helper.

Styling
- The styling on this project is quite simple. On a personal note, I ran out of time and am unable to use the third day on this assessment. That is my reason for the half-cooked UI. My apologies, this is an explanation and not an attempt at an excuse. I take full responsibility for coming up short on the styling portion.
