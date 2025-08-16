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

## Tech Stack (Preferred)

- **Next.js** with App Router
- **React** with TypeScript
- **Tailwind CSS** for styling
- **Supabase** (Postgres + Row-Level Security)

> **Alternative stacks allowed** if your solution:
> 1. Runs with `npm install && npm run dev`
> 2. Persists to a Postgres-compatible database
> 3. Enforces table-level security

## Must-Have Features

### 1. Progressive Flow (Figma Design)
- Implement the exact cancellation journey from provided Figma
- Ensure pixel-perfect fidelity on both mobile and desktop
- Handle all user interactions and state transitions

### 2. Deterministic A/B Testing (50/50 Split)
- **On first entry**: Assign variant via cryptographically secure RNG
- **Persist** variant to `cancellations.downsell_variant` field
- **Reuse** variant on repeat visits (never re-randomize)

**Variant A**: No downsell screen
**Variant B**: Show "$10 off" offer
- Price $25 → $15, Price $29 → $19
- **Accept** → Log action, take user back to profile page (NO ACTUAL PAYMENT PROCESSING REQUIRED)
- **Decline** → Continue to reason selection in flow

### 3. Data Persistence
- Mark subscription as `pending_cancellation` in database
- Create cancellation record with:
  - `user_id`
  - `downsell_variant` (A or B)
  - `reason` (from user selection)
  - `accepted_downsell` (boolean)
  - `created_at` (timestamp)

### 4. Security Requirements
- **Row-Level Security (RLS)** policies
- **Input validation** on all user inputs
- **CSRF/XSS protection**
- Secure handling of sensitive data

### 5. Reproducible Setup
- `npm run db:setup` creates schema and seed data (local development)
- Clear documentation for environment setup

## Out of Scope

- **Payment processing** - Stub with comments only
- **User authentication** - Use mock user data
- **Email notifications** - Not required
- **Analytics tracking** - Focus on core functionality

## Getting Started

1. **Clone this repository** `git clone [repo]`
2. **Install dependencies**: `npm install`
3. **Set up local database**: `npm run db:setup`
4. **Start development**: `npm run dev`

## Database Schema

The `seed.sql` file provides a **starting point** with:
- `users` table with sample users
- `subscriptions` table with $25 and $29 plans
- `cancellations` table (minimal structure - **you'll need to expand this**)
- Basic RLS policies (enhance as needed)

### Important: Schema Design Required

The current `cancellations` table is intentionally minimal. You'll need to:
- **Analyze the cancellation flow requirements** from the Figma design
- **Design appropriate table structure(s)** to capture all necessary data
- **Consider data validation, constraints, and relationships**
- **Ensure the schema supports the A/B testing requirements**

## Evaluation Criteria

- **Functionality (40%)**: Feature completeness and correctness
- **Code Quality (25%)**: Clean, maintainable, well-structured code
- **Pixel/UX Fidelity (15%)**: Accuracy to Figma design
- **Security (10%)**: Proper RLS, validation, and protection
- **Documentation (10%)**: Clear README and code comments

## Deliverables

1. **Working implementation** in this repository
2. **NEW One-page README.md (replace this)** (≤600 words) explaining:
   - Architecture decisions
   - Security implementation
   - A/B testing approach
3. **Clean commit history** with meaningful messages

## Timeline

Submit your solution within **72 hours** of receiving this repository.

## AI Tooling

Using Cursor, ChatGPT, Copilot, etc. is **encouraged**. Use whatever accelerates your development—just ensure you understand the code and it runs correctly.

## Questions?

Review the challenge requirements carefully. If you have questions about specific implementation details, make reasonable assumptions and document them in your README.

---

**Good luck!** We're excited to see your implementation.

## Issues Log

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