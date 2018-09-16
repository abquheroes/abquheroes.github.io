"use strict";

const Resources = Object.freeze({ORE:"ore",WOOD:"wood",LEATHER:"leather",HERB:"herb",BONE:"bone",FABRIC:"fabric",STEEL:"steel",SILVER:"silver",PAPER:"paper",MANA:"mana"});

class Material{
    constructor (props) {
        Object.assign(this, props);
        this.amt = 0;
        this.img = `<img src='/images/resources/${this.id}.png' alt='${this.name}'>`;
    }
}

const ResourceManager = {
    materials : [],
    addNewMaterial(material) {
        this.materials.push(material);
    },
    addMaterial(res,amt) {
        this.materials.find(mat => mat.id === res).amt += amt;
    },
    canAffordMaterial(item) {
        for (const [material, amt] of Object.entries(item.mcost)) {
            if (amt > this.materialAvailable(material)) return false;
        }
        return true;
    },
    deductMaterial(item) {
        for (const [resource, amt] of Object.entries(item.mcost)) {
            this.addMaterial(resource,-amt);
        }
    },
    materialIcon(type) {
        if (type[0] === "R") return recipeList.idToItem(type).itemPic();
        return `<img src="/images/resources/${type}.png" alt="${type}">`
    },
    formatCost(res,amt) {
        return this.materialIcon(res)+"&nbsp;"+amt;
    },
    sidebarMaterial(resID) {
        const res = this.materials.find(resource => resource.id == resID)
        return `${this.materialIcon(resID)}&nbsp;&nbsp${res.amt}`
    },
    available(res,amt) {
        const item = recipeList.idToItem(res);
        if (item === undefined) {
            return this.idToMaterial(res).amt >= amt;
        }
        return Inventory.itemCount(res,0) >= amt;
    },
    materialAvailable(matID) {
        return this.materials.find(mat => mat.id === matID).amt;
    },
    nameForWorkerSac(mat) {
        const item = recipeList.idToItem(mat);
        if (item === undefined) return this.idToMaterial(mat).name;
        return item.name;
    },
    deductUpgradeCosts(resArray) {
        $.each(resArray, (id,amt) => {
            const item = recipeList.idToItem(id);
            if (item === undefined) this.idToMaterial(id).amt -= amt;
            else Inventory.removeFromInventory(id,0,amt);
        })
    },
    idToMaterial(matID) {
        for (let i=0;i<this.materials.length;i++) {
            if (this.materials[i].id === matID) return this.materials[i];
        }
        return null;
    },
    addDungeonDrops(drops) {
        drops.forEach(d => {
            this.addMaterial(d.id,d.amt);
        })
    },
}