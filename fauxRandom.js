Math.reseed = () => {
    Math.seed = 11; //KoL tribute
}

// the initial seed
Math.reseed();

Math.seededRandom = (max, min) => {
    max = max || 1;
    min = min || 0;
 
    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    const rnd = Math.seed / 233280;
 
    return min + rnd * (max - min);
}