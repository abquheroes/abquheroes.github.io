"use strict";

const Resources = Object.freeze({ORE:"ore",WOOD:"wood",LEATHER:"leather",HERB:"herb"});

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
        for (let i=0;i<this.materials.length;i++) {
            if (this.materials[i].id === res) {
                this.materials[i].amt += amt;
                return;
            }
        }
    },
    canAfford(item) {
        for (const [resource, amt] of Object.entries(item.cost)) {
            if (amt > this.resourceAvailable(resource)) return false;
        }
        return true;
    },
    deductCost(costs) {
        if (!this.canAfford(costs)) return;
        for (const [resource, amt] of Object.entries(costs)) {
            this[resource] -= amt;
        }
    },
    materialIcon(type) {
        console.log(type);
        if (type[0] === "R") return recipeList.idToItem(type).itemPic();
        return "<img src='/images/resources/"+type+".png' alt='"+type+"'>";
    },
    formatCost(res,amt) {
        return this.materialIcon(res)+"&nbsp;"+amt;
    },
    output(res) {
        for (let i=0;i<this.materials.length;i++) {
            if (this.materials[i].id === res) return this.materialIcon(res) + "&nbsp;&nbsp" + this.materials[i].amt;
        }
        return this.materialIcon(res) + "&nbsp;&nbsp" + this.resourceAvailable(res) + "/" + WorkerManager.totalProduction(res);
    },
    available(res,amt) {
        const item = recipeList.idToItem(res);
        if (item === undefined) {
            if (!this.hasOwnProperty(res)) return false;
            return this[res] >= amt;
        }
        return Inventory.itemCount(res,0);
    },
    resourceAvailable(res) {
        if (res[0] === "R") return Inventory
        return WorkerManager.totalProduction(res)-actionSlotManager.totalCost(res);
    },
    name(res) {
        const item = recipeList.idToItem(res);
        if (item === undefined) return res;
        return item.name;
    }
}

const $resources = $("#resources");

function refreshResources() {
    $resources.empty();
    $.each(Resources , function(_, resource) {
        const d = $("<div/>").addClass("resource tooltip").attr("id",resource+"resource").html(ResourceManager.output(resource));
        $resources.append(d);
    });
    ResourceManager.materials.map(m => m.id).forEach(material => {
        const d = $("<div/>").addClass("resource tooltip").attr("id",material.id).html(ResourceManager.output(material));
        $resources.append(d);
    })
}