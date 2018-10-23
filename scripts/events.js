"use strict";

const EventManager = {
    events : [],
    eventDB : [],
    seenEvents : [],
    eventNum : 0,
    createSave() {
        const save = {};
        save.events = [];
        this.events.forEach(e => {
            save.events.push(e.createSave());
        })
        save.seenEvents = this.seenEvents;
        return save;
    },
    loadSave(save) {
        save.events.forEach(e => {
            const eventTemplate = this.idToEventDB(e.id);
            const event = new Event(eventTemplate);
            event.loadSave(e);
            event.eventNum = this.eventNum;
            this.eventNum += 1;
            this.events.push(event);
        });
        this.seenEvents = save.seenEvents;
    },
    loadEvent(props) {
        this.eventDB.push(new EventTemplate(props));
    },
    idToEventDB(eventID) {
        return this.eventDB.find(e => e.id === eventID);
    },
    eventNumToEvent(eventNum) {
        return this.events.find(event => event.eventNum === eventNum);
    },
    addEvent(eventID) {
        const eventTemplate = this.idToEventDB(eventID);
        const event = new Event(eventTemplate);
        event.eventNum = this.eventNum;
        this.eventNum += 1;
        if (event.id === "E001") event.reward = [{id:"M001",amt:miscLoadedValues.startingGold}];
        this.events.push(event);
        if (!this.seenEvents.includes(eventID)) this.seenEvents.push(eventID);
        refreshEvents();
    },
    addEventDungeon(reward,time,floor) {
        const eventTemplate = this.idToEventDB("E004");
        const event = new Event(eventTemplate);
        event.reward = reward;
        event.time = time;
        event.floor = floor;
        event.eventNum = this.eventNum;
        this.eventNum += 1;
        this.events.push(event);
        refreshEvents();
    },
    removeEvent(eventNum) {
        console.log(eventNum);
        const event = this.events.find(e => e.eventNum === eventNum);
        if (event.reward !== null) ResourceManager.addDungeonDrops(event.reward);
        this.seenEvents.push(event.id);
        this.events = this.events.filter(event => event.eventNum !== eventNum);
        refreshEvents();
    },
    hasEvents() {
        return this.events.length > 0;
    },
    hasSeen(eventID) {
        return this.seenEvents.includes(eventID);
    }
};

class EventTemplate {
    constructor (props) {
        Object.assign(this, props);
        this.image = '<img src="images/DungeonIcons/event.png" alt="Event">';
    }
}

class Event {
    constructor(props) {
        this.reward = null;
        this.time = null;
        this.floor = null;
        Object.assign(this, props);
    }
    createSave() {
        const save = {};
        save.id = this.id;
        save.reward = this.reward;
        save.time = this.time;
        save.floor = this.floor;
        return save;
    }
    loadSave(save) {
        console.log(save);
        this.reward = save.reward;
        this.time = save.time;
        this.floor = save.floor;
    }
};

const $eventList = $("#eventList");
const $eventContent = $("#eventContent");
const $eventTab = $("#eventTab");

function refreshEvents() {
    $eventList.empty();
    EventManager.events.forEach(event => {
        const d1 = $("<div/>").addClass("eventList").attr("eventNum",event.eventNum).html(`${event.image} ${event.title}`);
        $eventList.append(d1);
    });
    $eventContent.empty();
    if (EventManager.hasEvents()) $eventTab.addClass("hasEvent");
    else {
        $eventTab.removeClass("hasEvent");
        const d1 = $("<div/>").addClass("events-placeholder-details").html("You have no mail to collect at the moment."); 
        $eventList.append(d1);
    }
}

function dungeonDrops(event) {
    //returns a bunch of divs for the rewards
    const d = $("<div/>").addClass("rewardDiv");
    event.reward.forEach(reward => {
        const d1 = $("<div/>").addClass("rewardCard tooltip").attr("data-tooltip",ResourceManager.idToMaterial(reward.id).name);
        const d2 = $("<div/>").addClass("rewardImage").html(ResourceManager.idToMaterial(reward.id).img);
        const d3 = $("<div/>").addClass("rewardAmt").html(reward.amt);
        d.append(d1.append(d2,d3));
    });
    return d;
}

$(document).on('click', "div.eventList", (e) => {
    //display the text for a clicked event
    e.preventDefault();
    $("div.eventList").removeClass("highlight");
    $(e.currentTarget).addClass("highlight");
    const eventNum = parseInt($(e.currentTarget).attr("eventNum"));
    const event = EventManager.eventNumToEvent(eventNum);
    $eventContent.empty();
    const d = $("<div/>").addClass("eventBody");
    const d1 = $("<div/>").addClass("eventAuthor").html(`FROM: ${event.author}`);
    const d2 = $("<div/>").addClass("eventMessage").html(event.message);
    d.append(d1,d2);
    if (event.time !== null) {
        const d3 = $("<div/>").addClass("eventTimeHeading").html("Total Time:");
        const d4 = $("<div/>").addClass("eventTime").html(msToTime(event.time));
        d.append(d3,d4);
    }
    if (event.floor !== null) {
        const d5 = $("<div/>").addClass("eventFloorHeading").html("Floor Reached:");
        const d6 = $("<div/>").addClass("eventloor").html("Floor " + event.floor);
        d.append(d5,d6);
    }
    if (event.reward !== null ) {
        const d7 = $("<div/>").addClass("eventReward").html(dungeonDrops(event));
        d.append(d7);
    }
    const d8 = $("<div/>").addClass("eventConfirm").attr("eventID",eventNum).html("ACCEPT");
    d.append(d8);
    $eventContent.append(d);
});

$(document).on('click', "div.eventConfirm", (e) => {
    //gets rid of event, and adds to inventory if you need to
    e.preventDefault();
    const eventID = parseInt($(e.currentTarget).attr("eventID"));
    EventManager.removeEvent(eventID);
})

function eventChecker() {
    if (!EventManager.hasSeen("E002") && !WorkerManager.workers.some(w => w.type === "standard" && !w.owned)) EventManager.addEvent("E002");
    if (!EventManager.hasSeen("E003") && WorkerManager.workers.some(w => w.type === "advanced" && w.owned)) EventManager.addEvent("E003");
    if (!EventManager.hasSeen("E005") && achievementStats.totalItemsCrafted >= 10000) EventManager.addEvent("E005");
}