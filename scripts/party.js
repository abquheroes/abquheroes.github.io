"use strict";

class Party {
    constructor (heroID) {
        this.heroID = heroID;
        this.heroes = this.createHeroList();
    }
    createSave() {
        const save = {};
        save.heroID = this.heroID;
        return save;
    }
    createHeroList() {
        return this.heroID.map(h => HeroManager.idToHero(h));
    }
    hasMember(member) {
        return this.heroes.includes(member);
    }
    alive() {
        return this.heroes.some(hero => !hero.dead());
    }
    isDead() {
        return this.heroes.every(hero => hero.dead());
    }
    addXP(xp) {
        this.heroes.forEach(hero => {
            hero.addXP(xp);
        });
    }
    addTime(t, dungeonID) {
        this.heroes.forEach(h=> {
            h.addTime(t, dungeonID);
        })
    }
}

const PartyCreator = {
    heroes : [],
    emptyPartySlots() {
        return this.partySize()-this.heroes.length;;
    },
    removeMember(slotNum) {
        this.heroes.splice(slotNum,1);
    },
    addMember(heroID) {
        if (this.emptyPartySlots() === 0) return false;
        this.heroes.push(heroID);
    },
    clearMembers() {
        this.heroes = [];
    },
    partySize() {
        const heroesOwned = HeroManager.ownedHeroes().length;
        if (heroesOwned < 4) return 1;
        if (heroesOwned < 8) return 2;
        if (heroesOwned < 12) return 3;
        return 4;
    },
    validTeam() {
        if (this.heroes.length === 0) return false;
        const heroesReal = this.heroes.map(hid => HeroManager.idToHero(hid));
        return heroesReal.some(h => h.alive());
    },
    lockParty() {
        this.heroes.map(hid => HeroManager.idToHero(hid)).forEach(h=>h.inDungeon = true);
        const party = new Party(this.heroes);

        this.heroes = [];
        return party;
    }
}