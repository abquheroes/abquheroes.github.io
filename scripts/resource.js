"use strict";

const Resources = Object.freeze({GOLD:"gold",ORE:"ore",WOOD:"wood",LEATHER:"leather",HERB:"herb"});

const ResourceManager = {
    gold : 0,
    addResource(resource,amt) {
        this[resource] += amt;
    },
    canAfford(costs) {
        for (const [resource, amt] of Object.entries(costs)) {
            if (amt > this[resource]) return false;
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
            return this.materialIcon(res) + "&nbsp;&nbsp" + WorkerManager.resourceDisplay(res);
        }
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