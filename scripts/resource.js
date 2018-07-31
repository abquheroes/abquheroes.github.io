"use strict";

const Resources = Object.freeze({GOLD:"gold",ORE:"ore",WOOD:"wood",LEATHER:"leather",HERB:"herb"});

const ResourceManager = {
    gold : 0,
    addResource(resource,amt) {
        this[resource] += amt;
        refreshResources();
    },
    canAfford(item) {
        console.log(item);
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
        return "<img src='/images/resources/"+type+".png' alt='"+type+"'>";
    },
    formatCost(res,amt) {
        return this.materialIcon(res)+"&nbsp;"+amt;
    },
    output(res) {
        if (this.hasOwnProperty(res)) {
            return this.materialIcon(res) + "&nbsp;&nbsp" + this[res];
        }
        else {
            return this.materialIcon(res) + "&nbsp;&nbsp" + this.resourceAvailable(res) + "/" + WorkerManager.totalProduction(res);
        }
    },
    resourceAvailable(res) {
        return WorkerManager.totalProduction(res)-actionSlotManager.totalCost(res);
    }
}

const $resources = $("#resources");

function refreshResources() {
    $resources.empty();
    $.each(Resources , function(_, resource) {
        const d = $("<div/>").addClass("resource tooltip").attr("id",resource+"resource").html(ResourceManager.output(resource));
        $resources.append(d);
    });
}