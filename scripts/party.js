class Party {
    constructor () {
        this.heroes = [];
    }
    createSave() {
        return this.heroes;
    }
    loadSave(save) {
        this.heroes = save;
    }
    hasMember(member) {
        return this.heroes.includes(member);
    }
    addMember(member) {
        if (this.heroes.length >= this.partySize()) return false;
        this.heroes.push(member);
    }
    emptyPartySlots() {
        return this.partySize()-this.heroes.length;
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
    partySize() {
        const heroesOwned = HeroManager.ownedHeroes().length;
        if (heroesOwned < 4) return 1;
        if (heroesOwned < 8) return 2;
        if (heroesOwned < 12) return 3;
        return 4;
    }
}

let party = new Party();