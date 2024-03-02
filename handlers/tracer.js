const { generateSD } = require("./buildingUML");
const {processFile} = require("./filterLog");

const text = ["PUBLISH","debug","mqtt-explorer","actions/events","auto", "Received"];
const outputFilePath = './output/filtered_log.log'; // Replace with desired output file name
const operation = ['filter','remove']; // Choose 'filter' or 'remove'
const outputPath = './output/test.puml';


// start event, info, Received publish, action/events
async function Initialize(logPath,outputPath){
  await processFile(logPath,text[0],outputFilePath,operation[0]);
  // await processFile(outputFilePath,text[3],outputFilePath,operation[1]);
  await processFile(outputFilePath,text[2],outputFilePath,operation[1]);
  await processFile(outputFilePath,text[4],outputFilePath,operation[1]);
  await processFile(outputFilePath,text[5],outputFilePath,operation[1]);
  await generateSD(outputFilePath,outputPath);
  
}

function tracer(logPath){
  Initialize(logPath,outputPath);
}
exports.generateSD = tracer;