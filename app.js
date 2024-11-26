// Ensure MetaMask is installed
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
  
    // Initialize Web3
    const web3 = new Web3(window.ethereum);
  
    let accounts;
  
    // Request access to accounts from MetaMask
    async function loadAccounts() {
      try {
        // Request access to MetaMask accounts
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Connected accounts:', accounts);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        alert('Please connect MetaMask to proceed.');
      }
    }
  
    loadAccounts();
  
    // Listen for account or network changes
    window.ethereum.on('accountsChanged', (accounts) => {
      console.log('Accounts changed:', accounts);
      // Update UI or reload as needed
    });
  
    window.ethereum.on('chainChanged', (chainId) => {
      console.log('Chain changed:', chainId);
      // Handle network changes
    });
  
    // Set up the contract ABI and address
    const contractABI = [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "eventId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "date",
            "type": "uint256"
          }
        ],
        "name": "EventCreated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "eventId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "attendee",
            "type": "address"
          }
        ],
        "name": "RSVPed",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "eventCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "events",
        "outputs": [
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "date",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "date",
            "type": "uint256"
          }
        ],
        "name": "createEvent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "eventId",
            "type": "uint256"
          }
        ],
        "name": "RSVP",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "eventId",
            "type": "uint256"
          }
        ],
        "name": "getAttendees",
        "outputs": [
          {
            "internalType": "address[]",
            "name": "",
            "type": "address[]"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "eventId",
            "type": "uint256"
          }
        ],
        "name": "getEvent",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      }
    ];
  
    const contractAddress = '0xF3d2D4b5caD53204171a6bF1d19CD5bb6445eb02'; // Replace with your contract address
    const eventManagerContract = new web3.eth.Contract(contractABI, contractAddress);
  
    // Handle event creation
    document.getElementById('createEventForm').addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const title = document.getElementById('eventTitle').value;
      const description = document.getElementById('eventDescription').value;
      const date = new Date(document.getElementById('eventDate').value).getTime() / 1000; // Convert to Unix timestamp
  
      try {
        const tx = await eventManagerContract.methods.createEvent(title, description, date).send({ from: accounts[0] });
        console.log('Event created:', tx);
      } catch (error) {
        console.error('Error creating event:', error);
      }
    });
  
    // Handle RSVP
    document.getElementById('rsvpForm').addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const eventId = document.getElementById('eventIdRSVP').value;
  
      try {
        const tx = await eventManagerContract.methods.RSVP(eventId).send({ from: accounts[0] });
        console.log('RSVP successful:', tx);
      } catch (error) {
        console.error('Error RSVPing:', error);
      }
    });
  
    // View attendees of an event
    document.getElementById('viewAttendeesForm').addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const eventId = document.getElementById('eventIdToView').value;
      try {
        const attendees = await eventManagerContract.methods.getAttendees(eventId).call();
        const attendeesList = document.getElementById('attendeesList');
        attendeesList.innerHTML = '';
        attendees.forEach(attendee => {
          const listItem = document.createElement('li');
          listItem.textContent = attendee;
          attendeesList.appendChild(listItem);
        });
      } catch (error) {
        console.error('Error fetching attendees:', error);
      }
    });
  
  } else {
    alert('Please install MetaMask to interact with this app!');
  }