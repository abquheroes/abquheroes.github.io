function formatToUnits(number, precision) {
    const abbrev = ['', ' K', ' M', ' B', ' T', 'Q'];
    const unrangifiedOrder = Math.floor(Math.log10(Math.abs(number)) / 3)
    const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ))
    const suffix = abbrev[order];
    return parseFloat((number / Math.pow(10, order * 3)).toFixed(precision)) + suffix;
}

function msToTime(s) {
    const ms = s % 1000;
    s = (s - ms) / 1000;
    let secs = s % 60;
    s = (s - secs) / 60;
    let mins = s % 60;
    if (secs < 10) secs = "0" + secs
    if (mins < 10) mins = "0" + mins   
    return mins + ':' + secs;
}

function rollDice(number, sides) {
    let total = 0;
    while(number-- > 0) total += Math.floor(Math.random() * sides) + 1;
    return total;
}

function round(number, precision) {
    var shift = function (number, precision) {
      var numArray = ("" + number).split("e");
      return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
    };
    return shift(Math.round(shift(number, +precision)), -precision).toFixed(precision);
}

function timeSince(startTime,endTime) {
    endTime = endTime || Date.now()
    let s = "";
    let diff = Math.round((endTime-startTime)/1000);
    const d = Math.floor(diff/(24*60*60))
    diff = diff-d*24*60*60
    if (d === 1) s += d + " day, ";
    else s += d + " days, ";
    const h = Math.floor(diff/(60*60));
    diff = diff-h*60*60;
    if (h === 1) s += h + " hour, ";
    else s += h + " hours, ";
    const m = Math.floor(diff/60);
    diff = diff-m*60;
    if (m === 1) s += m + " minute, ";
    else s += m + " minutes, ";
    if (diff === 1) s += diff + " second, ";
    else s += diff + " seconds, ";
    return s.slice(0, -2);
}

function createArray(len, itm) {
    const arr = [];
    while (len > 0) {
        arr.push(itm);
        len--;
    }
    return arr;
}

const miscIcons = {
    hp : '<img src="images/DungeonIcons/hp.png">',
    pow : '<img src="images/DungeonIcons/pow.png">',
    act : '<img src="images/DungeonIcons/act.png">',
    gold : '<img src="images/DungeonIcons/gold.png">'
}

function msToSec(ms) {
    return round(ms/1000,1) + "s"
}

const miscLoadedValues = {};