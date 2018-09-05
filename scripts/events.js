"use strict";

const EventTypes = Object.freeze({OREN:"W001",ERYN:"W002",HERBIE:"W003",LAKUR:"W004",HARMONY:"W005",FREDERIK:"W006",MAGNOLIA:"W007",SYLVESTER:"W008",PIPPA:"W009",MANNY:"W010",DUNGEON:"DUNGEON",});

const EventManager = {
    events : [],
    eventNum : 0,
    addEvent(event) {
        event.id = this.eventNum.toString();
        this.eventNum += 1;
        this.events.push(event);
        refreshEvents();
    },
    removeEvent(eventID) {
        const event = this.idToEvent(eventID);
        if (event.type === EventTypes.DUNGEON) ResourceManager.addDungeonDrops(event.reward);
        else WorkerManager.gainWorker(event.type)
        this.events = this.events.filter(event => !(event.id === eventID));
        refreshEvents();
    },
    idToEvent(eventID) {
        console.log(this.events);
        return this.events.find(event => event.id === eventID);
    },
    addEventDungeon(reward) {
        const event = new Event(EventTypes.DUNGEON);
        event.reward = reward;
        EventManager.addEvent(event)
    },
    addOnceEvent(eventID) {
        const event = new Event(eventID);
        EventManager.addEvent(event)
    },
    hasEvents() {
        return this.events.length > 0
    }
};

class Event {
    constructor(type) {
        this.type = type;
        this.text = this.getText(type);
        this.image = '<img src="/images/DungeonIcons/event.png" alt="Event">';
    }
    getText(type) {
        if (type === EventTypes.DUNGEON) {
            return "You completed a dungeon! Click ACCEPT to get your rewards.";
        }
        return "You found a worker in the dungeon! Click ACCEPT to add him to your entourage!"
    }
};

const $eventList = $("#eventList");
const $eventContent = $("#eventContent");
const $eventTab = $("#eventTab");

function refreshEvents() {
    $eventList.empty();
    EventManager.events.forEach(event => {
        const d1 = $("<div/>").addClass("eventList").attr("eventID",event.id).html(`${event.image} Event ${event.id}`);
        $eventList.append(d1);
    });
    $eventContent.empty();
    if (EventManager.hasEvents()) $eventTab.addClass("hasEvent");
    else $eventTab.removeClass("hasEvent");
}

function dungeonDrops(event) {
    //returns a bunch of divs for the rewards
    const d = $("<div/>").addClass("rewardDiv");
    event.reward.forEach(reward => {
        const d1 = $("<div/>").addClass("rewardCard");
        const d2 = $("<div/>").addClass("rewardImage tooltip").attr("data-tooltip",ResourceManager.idToMaterial(reward.id).name).html(ResourceManager.idToMaterial(reward.id).img);
        const d3 = $("<div/>").addClass("rewardAmt").html(reward.amt);
        d.append(d1.append(d2,d3));
    });
    return d;
}

$(document).on('click', "div.eventList", (e) => {
    //display the text for a clicked event
    e.preventDefault();
    const eventID = $(e.currentTarget).attr("eventID");
    const event = EventManager.idToEvent(eventID);
    $eventContent.empty();
    const d = $("<div/>").addClass("eventMessage").html(event.text);
    if (event.type === EventTypes.DUNGEON) {
        const d1 = $("<div/>").addClass("eventReward").html(dungeonDrops(event));
        d.append(d1);
    }
    const d2 = $("<div/>").addClass("eventConfirm").attr("eventID",eventID).html("ACCEPT");
    d.append(d2);
    $eventContent.append(d);
});

$(document).on('click', "div.eventConfirm", (e) => {
    //gets rid of event, and adds to inventory if you need to
    e.preventDefault();
    const eventID = $(e.currentTarget).attr("eventID");
    EventManager.removeEvent(eventID);
})