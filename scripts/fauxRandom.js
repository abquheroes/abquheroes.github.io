Math.reseed = () => {
    Math.seed = 11; //KoL tribute
}

// the initial seed
Math.reseed();

Math.seededRandom = (min, max) => {
    max = max || 1;
    min = min || 0;
    
    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    const rnd = Math.seed / 233280;
 
    return Math.floor(min + rnd * (max - min));
}

function randomNormal(a,b) {
    const adj = ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3
    const adjFull = (b*(1+adj)+a*(1-adj))/2
    return Math.round(adjFull);
}