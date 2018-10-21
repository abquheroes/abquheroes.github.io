"use strict";

const CombatManager = {
    heroAttack(hero, dungeonID) {
        const dungeon = DungeonManager.dungeonByID(dungeonID);
        const enemies = dungeon.mobs;
        const target = getTarget(enemies, hero.target);
        if (target === undefined) return;
        const battleMessage = new BattleMessage(dungeonID, hero, target, true);
        this.executeAttack(hero,target,battleMessage);
    },
    mobAttack(mob, dungeonID) {
        const dungeon = DungeonManager.dungeonByID(dungeonID);
        const enemies = dungeon.party.heroes;
        const target = getTarget(enemies, mob.target);
        const battleMessage = new BattleMessage(dungeonID, mob, target, false);
        this.executeAttack(mob, target, battleMessage);
    },
    executeAttack(attacker, defender, battleMessage) {
        const critical = this.rollStat(attacker.crit);
        battleMessage.critical = critical;
        let damage = attacker.getPow();
        if (critical) damage = Math.round(damage*attacker.critdmg);
        if (attacker.ap === attacker.apmax) {
            battleMessage.apAttack = true;
            damage = Math.round(damage * 2);
            attacker.ap = 0;
        }
        attacker.ap += 1;
        refreshAPBar(attacker);
        battleMessage.damage = damage;
        this.takeDamage(damage, defender, battleMessage);
        BattleLog.addAttackLog(battleMessage);
    },
    takeDamage(damage,defender,battleMessage) {
        damage -= defender.armor;
        battleMessage.damage = damage;
        battleMessage.armor = defender.armor;
        const dodge = this.rollStat(defender.dodgeChance);
        battleMessage.dodge = dodge;
        if (!dodge) {
            defender.hp = Math.max(defender.hp - damage, 0);
        }
        battleMessage.defenderDead = defender.hp === 0;
        refreshHPBar(defender);
        BattleLog.addDefendLog(battleMessage);
    },
    rollStat(critChance) {
        return critChance > Math.floor(Math.random()*100) + 1
    },
}


function getTarget(party,type) {
    if (type === "first") {
        return party.filter(hero => hero.alive())[0]
    }
    else if (type === "reverse") {
        for (let i=party.length;i>0;i--) {
            if (party[i].alive()) return party[i];
        }
    }
    else if (type === "random") {
        return party[Math.floor(Math.random()*party.length)];
    }
    else if (type === "highhp") {
        return party.sort((a,b) => {return b.hp - a.hp})[0];
    }
    else if (type === "lowhp") {
        return party.sort((a,b) => {return a.hp - b.hp})[0];
    }
}

const $drLogHero = $("#drLogHero");
const $drLogMob = $("#drLogMob");

const BattleLog = {
    heroLog : [],
    enemyLog : [],
    addHeroLog(m) {
        if (this.heroLog.length == 15) {
            this.heroLog.shift();
        }
        this.heroLog.push(m);
        $drLogHero.empty();
        this.heroLog.forEach(m=> {
            const d = $("<div/>").addClass("heroBattleLog").html(m);
            $drLogHero.append(d);
        });
    },
    addEnemyLog(m) {
        if (this.enemyLog.length == 15) {
            this.enemyLog.shift();
        }
        this.enemyLog.push(m);
        $drLogMob.empty();
        this.enemyLog.forEach(m=> {
            const d = $("<div/>").addClass("enemyBattleLog").html(m);
            $drLogMob.append(d);
        });
    },
    clear() {
        this.heroLog = [];
        this.enemyLog = [];
        $drLogHero.empty();
        $drLogMob.empty();
    },
    addAttackLog(battleMessage) {
        if (battleMessage.dungeonID !== DungeonManager.dungeonView) return;
        let m = `${battleMessage.attacker.name} attacks for ${battleMessage.damage} damage`
        if (battleMessage.critical && battleMessage.apAttack) m = `${battleMessage.attacker.name} crits for an enhanced ${battleMessage.damage} damage!`
        if (!battleMessage.critical && battleMessage.apAttack) m = `${battleMessage.attacker.name} attacks for an enhanced ${battleMessage.damage} damage!`
        if (battleMessage.critical && !battleMessage.apAttack) m = `${battleMessage.attacker.name} crits for ${battleMessage.damage} damage!`
        if (battleMessage.isHero) this.addHeroLog(m);
        else this.addEnemyLog(m);
    },
    addDefendLog(battleMessage) {
        if (battleMessage.dungeonID !== DungeonManager.dungeonView) return;
        let m = `${battleMessage.defender.name} takes ${battleMessage.damage} damage`
        if (battleMessage.armor > 0) m += ` (${battleMessage.armor} absorbed)`;
        if (battleMessage.dodge) m = `${battleMessage.defender.name} dodged the attack!`;
        if (battleMessage.defenderDead) m = `${battleMessage.defender.name} died!`;
        if (battleMessage.isHero) this.addEnemyLog(m);
        else this.addHeroLog(m)
    }
}

class BattleMessage {
    constructor (dungeonID, attacker, defender, isHero) {
        this.dungeonID = dungeonID;
        this.isHero = isHero;
        this.attacker = attacker;
        this.defender = defender;
        this.critical = false;
        this.apAttack = false;
        this.damage = 0;
    }
}