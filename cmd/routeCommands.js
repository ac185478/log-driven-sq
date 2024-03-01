const { readFileSync, writeFileSync } = require("fs");
const {generateSD} = require('../handlers/tracer');
const fs = require('fs').promises;
async function routeCommands(path){
    // fs.writeFileSync();
   generateSD(path);
    // writeFileSync("contract.json", JSON.stringify(await generateContracts(readFileSync(path).toString())));
}

exports.routeCommands = routeCommands;