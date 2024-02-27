const {buildUML } = require("./buildingUML");
pathToLog = './output/filtered_log.log';
buildUML(pathToLog);
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
