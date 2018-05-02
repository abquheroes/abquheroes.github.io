const workerLevels = {
    "Ore" : 0,
}

function getOreInterval() {
    return Math.floor((1.5*Math.pow(workerLevels["Ore"],1.25)+1)*100,2)/100
}

function getOreWorkerCost() {
    return Math.floor(50*Math.pow(workerLevels["Ore"],1.5)+50)
}