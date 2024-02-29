const {buildUML, generateSD } = require("./buildingUML");
const {processFile} = require("./filterLog");

const filePath = './log/mock.log'; // mock file path
const text = ["PUBLISH","debug","mqtt-explorer","actions/events","auto"];
const outputFilePath = './output/filtered_log.log'; // Replace with desired output file name
const operation = ['filter','remove']; // Choose 'filter' or 'remove'
const logPath = './output/filtered_log.log';
const outputPath = './output/test.puml';


async function Initialize(logPath,outputPath){
  await processFile(filePath,text[3],outputFilePath,operation[1]);
  await processFile(filePath,text[0],outputFilePath,operation[0]);
  await processFile(filePath,text[2],outputFilePath,operation[1]);
  generateSD(logPath,outputPath);
  
}

Initialize(logPath,outputPath);

// let logSample = 'mosquitto {"time":"2024-02-19T19:29:05.618Z","source":"mosquitto","level":"info","retailer":"ncr","store":"store01","endpoint":"terminal01","message":"Received PUBLISH from scoui_1708370869422  topic: scox/v1/ncr/store01/terminal01/picklists/requests","messageID":"cb934800-b497-4a85-ac23-47f4b78aad9b","value":"{\\"event\\":\\"getItemsByCategory\\",\\"source\\":\\"ui\\",\\"params\\":{\\"locale\\":\\"en-US\\",\\"category\\":\\"Favorites\\",\\"tags\\":[]}}"}';
// logSample = JSON.parse(logSample.substring(9));
// // console.log(topicRegex.exec(logSample)[0]);
// // console.log(logSample.message);
// // console.log(logSample);
// const msg = logSample.message;
// // const regex = /from "(.*?)"/;
// const [,,, source, , topic] = msg.trim().split(/\s+/);
// const temp = {};
// temp.source = source;
// temp.topic = topic;
// console.log(temp);
// const jarvisEvent = JSON.parse(logSample.value).event;
// console.log(logSample);

// const subscription = {
//   'scox/v1/ncr/store01/terminal01/picklists/requests': ['scoui', 'inputsequencer'],
// };
// const participants = subscription[topic];
// // eslint-disable-next-line array-callback-return
// participants.map((participant) => {
//   // f(x) function which writes to .puml file
//   console.log(source, '->', participant, ':', jarvisEvent);
// });
