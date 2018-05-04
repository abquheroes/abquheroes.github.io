"use strict";

const workerLevels = {
    "Ore" : 0,
    "Wood" : 0,
}

function getOreInterval() {
    return 1.7 + (3*workerLevels["Ore"])
}

function getWoodInterval() {
    return 1.5 + (3*workerLevels["Wood"])
}

function getOreWorkerCost() {
    return 350 * Math.pow(1.125,workerLevels["Ore"])
}

function getWoodWorkerCost() {
    return 500 * Math.pow(1.125,workerLevels["Wood"])
}