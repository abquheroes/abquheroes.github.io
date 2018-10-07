//not used currently
let wsSeed = Math.floor(Math.random() * 10000);
let hbSeed = Math.floor(Math.random() * 10000);
let wbSeed = Math.floor(Math.random() * 10000);

Math.seededRandom = () => {
    //max = max || 1;
    //min = min || 0;
    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    return Math.seed / 233280;
    //const rnd = Math.seed / 233280;
    //console.log(Math.floor(min + rnd * (max - min)));
    //return Math.floor(min + rnd * (max - min));
}

function randomNormal(a,b) {
    const adj = ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3
    const adjFull = (b*(1+adj)+a*(1-adj))/2
    return Math.round(adjFull);
}

function seedCreateSave() {
    return [wsSeed,hbSeed,wbSeed];
}

function seedLoadSave(save) {
    wsSeed = save[0];
    hbSeed = save[1];
    wbSeed = save[2];
}