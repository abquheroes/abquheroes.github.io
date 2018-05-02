const workerLevels = {
    "Ore" : 0,
}

function getOreInterval() {
    return 1.5*Math.pow(workerLevels["Ore"],1.25)+1
}

function getOreWorkerCost() {
    return Math.floor(50*Math.pow(workerLevels["Ore"],1.5)+50)
}