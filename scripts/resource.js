"use strict";

const Resources = Object.freeze({ORE:"ore",WOOD:"wood",LEATHER:"leather",HERB:"herb",BONE:"bone",FABRIC:"fabric",STEEL:"steel",SILVER:"silver",PAPER:"paper",MANA:"mana"});

class Material{
    constructor (props) {
        Object.assign(this, props);
        this.amt = 0;
        this.img = "<img src='/images/resources/"+this.id+".png' alt='"+this.name+"'>";
    }
}


const ResourceManager = {
    materials : [],
    addNewMaterial(material) {
        this.materials.push(material);
    },
    addMaterial(res,amt) {
        console.log(res,amt);
        this.materials.find(mat => mat.id === res).amt += amt;
        refreshResources();
    },
    canAffordResources(itemID) {
        const item = recipeList.idToItem(itemID);
        for (const [resource, amt] of Object.entries(item.rcost)) {
            if (amt > this.resourceAvailable(resource)) return false;
        }
        return true;
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
        refreshResources();
    },
    materialIcon(type) {
        if (type[0] === "R") return recipeList.idToItem(type).itemPic();
        return `<img src="/images/resources/${type}.png" alt="${type}">`
    },
    formatCost(res,amt) {
        return this.materialIcon(res)+"&nbsp;"+amt;
    },
    output(res) {
        for (let i=0;i<this.materials.length;i++) {
            if (this.materials[i].id === res) return this.materialIcon(res) + "&nbsp;&nbsp" + this.materials[i].amt;
        }
        return this.materialIcon(res) + "&nbsp;&nbsp" + this.resourceAvailable(res) + " out of " + WorkerManager.totalProduction(res);
    },
    available(res,amt) {
        const item = recipeList.idToItem(res);
        if (item === undefined) {
            return this.idToMaterial(res).amt >= amt;
        }
        return Inventory.itemCount(res,0) >= amt;
    },
    resourceAvailable(res) {
        if (res[0] === "R") return Inventory
        return WorkerManager.totalProduction(res)-actionSlotManager.totalCost(res);
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
    }
}

const $resources = $("#resources");

function refreshResources() {
    $resources.empty();
    $.each(Resources , function(_, resource) {
        const resourceNameForTooltips = resource.charAt(0).toUpperCase()+resource.slice(1);
        const d = $("<div/>").addClass("resource tooltip").attr("id",resource+"resource").attr("data-tooltip",resourceNameForTooltips).html(ResourceManager.output(resource));
        $resources.append(d);
    });
    ResourceManager.materials.map(m => m.id).forEach(material => {
        const d = $("<div/>").addClass("resource tooltip").attr("id",material).attr("data-tooltip",ResourceManager.idToMaterial(material).name).html(ResourceManager.output(material));
        if (material !== "M001" && ResourceManager.idToMaterial(material).amt === 0) d.hide()
        $resources.append(d);
    })
}
