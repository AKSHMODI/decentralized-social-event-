// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EventManager {
    struct Event {
        string title;
        string description;
        uint256 date;
        address[] attendees;
        mapping(address => bool) RSVPed;
    }

    mapping(uint256 => Event) public events;
    uint256 public eventCount;

    event EventCreated(uint256 eventId, string title, string description, uint256 date);
    event RSVPed(uint256 eventId, address attendee);

    constructor() {
        eventCount = 0;
    }

    function createEvent(string memory title, string memory description, uint256 date) public {
        require(date > block.timestamp, "Event date must be in the future");
        eventCount++;
        Event storage newEvent = events[eventCount];
        newEvent.title = title;
        newEvent.description = description;
        newEvent.date = date;
        emit EventCreated(eventCount, title, description, date);
    }

    function RSVP(uint256 eventId) public {
        require(eventId <= eventCount, "Event does not exist.");
        Event storage eventInstance = events[eventId];
        require(!eventInstance.RSVPed[msg.sender], "Already RSVPed.");
        
        eventInstance.RSVPed[msg.sender] = true;
        eventInstance.attendees.push(msg.sender);
        emit RSVPed(eventId, msg.sender);
    }

    function getAttendees(uint256 eventId) public view returns (address[] memory) {
        return events[eventId].attendees;
    }

    // New function to get an event by its ID
    function getEvent(uint256 eventId) public view returns (string memory, string memory, uint256) {
        Event storage e = events[eventId];
        return (e.title, e.description, e.date);
    }
}