class Party {
    constructor (ct) {
        this.maxSize = ct;
        this.heroes = [];
    }
    createSave() {
        return this.heroes;
    }
    hasMember(member) {
        return this.heroes.includes(member);
    }
    addMember(member) {
        if (this.heroes.length >= this.maxSize) return false;
        this.heroes.push(member);
    }
    emptyPartySlots() {
        return this.maxSize-this.heroes.length;
    }
    //tf is this for?
    removeMemberLocation(location) {
        this.heroes.splice(location, 1);
    }
    heroList() {
        return this.heroes.map(id => HeroManager.idToHero(id))
    }
    validTeam() {
        return this.heroes.length > 0 && this.alive();
    }
    alive() {
        return this.heroList().some((hero) => !hero.dead());
    }
    isDead() {
        return this.heroList().every((hero) => hero.dead());
    }
    addXP(xp) {
        this.heroList().forEach(hero => {
            hero.addXP(xp);
        });
    }
    loadSave(save) {
        this.heroes = save;
    }
}

let party = new Party(1);