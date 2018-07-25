class Party {
    constructor (hero1,hero2,hero3,hero4) {
        this.heroes = [hero1,hero2,hero3,hero4]
        this.floor = 0;
    }
    hasMember(member) {
        for (let i=0;i<this.heroes.length;i++) {
            if (this.heroes[i] === member) return true;
        }
        return false;
    }
    addMember(member) {
        for (let i=0;i<this.heroes.length;i++) {
            if (this.heroes[i] === "H999") {
                this.heroes[i] = member;
                return;
            }
        }
    }
    removeMemberLocation(location) {
        this.heroes.splice(location, 1);
        this.heroes.push("H999");
    }
    damageParty(dmg) {
        this.heroList().forEach((hero) => {
            hero.takeDamage(dmg);
        })
    }
    heroList() {
        const hList = [];
        this.heroes.forEach((heroID) => {
            if (heroID !== "H999") hList.push(heroOwnedbyID(heroID));
        });
        return hList
    }
    validTeam() {
        return this.heroList().length > 0;
    }
    alive() {
        return this.heroList().some((hero) => !hero.dead());
    }
    advanceFloor() {
        if (this.partyAlive()) {
            this.floor += 1;
            DungeonAssist.initFloor();
            refreshDungeonGrid();
            refreshDungeonFloor();
        }
        else {
            this.damageParty(-10); //lol workaround
            this.heroes = ["H999","H999","H999"]
            this.floor = 0;
            refreshDungeonGrid();
            loadCorrectDungeonScreen();
        }
    }
}

const party = new Party("H999","H999","H999","H999");