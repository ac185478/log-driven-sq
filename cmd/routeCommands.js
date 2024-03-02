const { readFileSync, writeFileSync } = require("fs");
const {generateSD} = require('../handlers/tracer');
const fs = require('fs').promises;
async function routeCommands(path){
    // fs.writeFileSync();
   generateSD(path);
}

exports.routeCommands = routeCommands;