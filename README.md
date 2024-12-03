This project is a decentralized application (dApp) that leverages blockchain technology for secure, transparent, and peer-to-peer event management. Users can create events, RSVP, and manage participation without relying on centralized authorities. The project ensures data immutability and transparency using Ethereum smart contracts.

Features:
Create Events: Users can create events with details like name, date, and time, stored immutably on the blockchain.
RSVP to Events: Participants can RSVP to events directly, ensuring transparency and user validation.
Validation: Prevents duplicate RSVPs, invalid event dates, and RSVP attempts for non-existent events.
Peer-to-Peer Interaction: Users interact directly with the blockchain through MetaMask, bypassing intermediaries.

Technologies Used
Blockchain: Ethereum.
Smart Contracts: Written in Solidity.
Development Frameworks: Truffle and Ganache.
Frontend: HTML, JavaScript, and Web3.js.
Wallet Integration: MetaMask for transaction signing.

Installation Guide
1. Prerequisites
Install Node.js.
Install MetaMask extension in your browser.
Install Truffle globally:
bash
Copy code
npm install -g truffle
Install Ganache for running a local blockchain.

2. Clone the Repository
bash
Copy code
git clone https://github.com/yourusername/DecentralizedEventPlanner.git
cd DecentralizedEventPlanner

3. Install Dependencies
bash
Copy code
npm install

4. Set Up Ganache
Open Ganache and start a new workspace.
Configure the workspace to use the truffle-config.js file in the project directory.

5. Compile and Deploy Smart Contracts
Compile the contracts:

bash
Copy code
truffle compile
Deploy the contracts to the local blockchain:

bash
Copy code
truffle migrate

6. Run the Frontend
Start an HTTP server to serve the frontend:

bash
Copy code
npm start

How to Use
1. Connect Wallet
Open the application in your browser.
Connect your MetaMask wallet to the local Ganache blockchain.
2. Create Events
Navigate to the Create Event section.
Enter event details (name, date, etc.) and submit.
The event will be stored on the blockchain.
3. RSVP to Events
Browse available events on the platform.
Click RSVP for any event and confirm the transaction via MetaMask.

Testing
To verify the functionality of smart contracts, run the following command:

bash
Copy code
truffle test

