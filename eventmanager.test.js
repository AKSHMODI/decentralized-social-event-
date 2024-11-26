const EventManager = artifacts.require("EventManager");

contract("EventManager", accounts => {
  let eventManager;

  beforeEach(async () => {
    eventManager = await EventManager.new();
  });

  it("should create an event correctly", async () => {
    const title = "Blockchain Conference";
    const description = "A conference on Blockchain technology.";
    const currentTime = (await web3.eth.getBlock('latest')).timestamp;
    const futureTime = currentTime + 3600; // Event 1 hour ahead

    await eventManager.createEvent(title, description, futureTime);
    const event = await eventManager.getEvent(1); // Use the new function to fetch the event

    assert.equal(event[0], title, "Event title is incorrect");
    assert.equal(event[1], description, "Event description is incorrect");
    assert.equal(event[2].toString(), futureTime.toString(), "Event date is incorrect");
  });

  it("should allow users to RSVP", async () => {
    const title = "Blockchain Conference";
    const description = "A conference on Blockchain technology.";
    const currentTime = (await web3.eth.getBlock('latest')).timestamp;
    const futureTime = currentTime + 3600; // Event 1 hour ahead

    await eventManager.createEvent(title, description, futureTime);
    await eventManager.RSVP(1, { from: accounts[0] });

    const attendees = await eventManager.getAttendees(1);
    assert.equal(attendees.length, 1, "Attendee count is incorrect");
    assert.equal(attendees[0], accounts[0], "RSVP'd user is incorrect");
  });

  it("should prevent multiple RSVPs from the same user", async () => {
    const title = "Blockchain Conference";
    const description = "A conference on Blockchain technology.";
    const currentTime = (await web3.eth.getBlock('latest')).timestamp;
    const futureTime = currentTime + 3600; // Event 1 hour ahead

    await eventManager.createEvent(title, description, futureTime);
    await eventManager.RSVP(1, { from: accounts[0] });

    try {
      await eventManager.RSVP(1, { from: accounts[0] });
      assert.fail("The user was able to RSVP twice!");
    } catch (error) {
      assert(error.message.includes("Already RSVPed"), "The error message is incorrect");
    }
  });

  it("should throw an error when RSVPing to a non-existent event", async () => {
    try {
      await eventManager.RSVP(9999, { from: accounts[0] });
      assert.fail("The event ID does not exist, but the transaction went through.");
    } catch (error) {
      assert(error.message.includes("Event does not exist"), "The error message is incorrect");
    }
  });

  it("should prevent creating an event with a past date", async () => {
    const title = "Old Event";
    const description = "An event with a past date.";
    const pastDate = Math.floor(Date.now() / 1000) - 1000;

    try {
      await eventManager.createEvent(title, description, pastDate);
      assert.fail("The event was created with a past date, but it shouldn't be allowed.");
    } catch (error) {
      assert(error.message.includes("Event date must be in the future"), "The error message is incorrect");
    }
  });
});
