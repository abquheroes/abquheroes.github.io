"use strict";
const FloorType = Object.freeze({"FIGHT":0, "TRAP":1, "CHALLENGE":2, "TREASURE":3,});
const Stat = Object.freeze({"MIGHT":0,"MIND":1,"MAGIC":2});

class Floor {
    constructor (type,difficulty,content) {
        this.type = type;
        this.difficulty = difficulty;
        this.content = content;
    }
    attempt(party) {
        if (this.type === FloorType.TRAP) {
            //this floor rolls a check for each hero in party, if they fail they take 10-30% danage
            const beat = Math.pow(1.1,this.difficulty);
            const pattempt = party.partyRoll(content);
            console.log("Attempted floor: " + pattempt + " vs " + beat);
            if (pattempt < beat) {
                party.damageParty(5);
                return false;
            }
            return true;
        }
    }
}

class Dungeon {
    constructor (name,floors) {
        this.name = name;
        this.floors = floors;
    }
}

const dungeon1 = new Dungeon("First Dungeon",[new Floor(FloorType.TRAP,20,Stat.MIGHT),new Floor(FloorType.TRAP,5,Stat.MIGHT),new Floor(FloorType.TRAP,5,Stat.MIGHT)]);
const dungeon2 = new Dungeon("Second Dungeon",[new Floor(FloorType.TRAP,5,Stat.MIGHT),new Floor(FloorType.TRAP,5,Stat.MIGHT),new Floor(FloorType.TRAP,5,Stat.MIGHT)]);
const dungeon3 = new Dungeon("Third Dungeon",[new Floor(FloorType.TRAP,5,Stat.MIGHT),new Floor(FloorType.TRAP,5,Stat.MIGHT),new Floor(FloorType.TRAP,5,Stat.MIGHT)]);
const dungeon4 = new Dungeon("Fourth Dungeon",[new Floor(FloorType.TRAP,5,Stat.MIGHT),new Floor(FloorType.TRAP,5,Stat.MIGHT),new Floor(FloorType.TRAP,5,Stat.MIGHT)]);
const dungeon5 = new Dungeon("Fifth Dungeon",[new Floor(FloorType.TRAP,5,Stat.MIGHT),new Floor(FloorType.TRAP,5,Stat.MIGHT),new Floor(FloorType.TRAP,5,Stat.MIGHT)]);
const dungeons = [dungeon1,dungeon2,dungeon3,dungeon4,dungeon5];

const dungeonImageReference = {
    "ticket1" : '<img src="Pixeltiers_16x16_RPG_Pack_V1.35/books/book_1.png">',
}