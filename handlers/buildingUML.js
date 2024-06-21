const fs = require("fs");
var plantuml = require('plantuml');
const { exec } = require("child_process");
function generatePlantUML(inputFilePath, outputFilePath) {
  // Read the log file
  fs.readFile(inputFilePath, "utf8", async (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    // Split the log into lines
    const lines = data.split("\n");

    // Initialize PlantUML script
    let plantUMLScript = `@startuml\nautonumber\n\ntitle NextGenSCO JARVIS - log sequence\n\n`;
    
    // Object to store participants (publishers and subscribers)
    let publisher = null;
    let subscriber = null;
    let payload = null;
    let participants = [];
    let event = null;
    // Iterate over each line in the log
    lines.forEach((line) => {
      let data = parseLogLine(line);
      if (data.level == "info") {
        publisher = data.source;
        payload = data.info;
        event = data.event;
        if(!participants.includes(publisher)){
          participants.push(publisher);
        }
      }
      if (line.includes("Sending PUBLISH to")) {
        subscriber = data.target;
        let message;
        if((data.topic.includes('tb/requests') || data.topic.includes('intervention/requests') || data.topic.includes('scoui/requests')) 
          && event === 'changeState' 
          && (subscriber.includes('core'))){
             message = ` ${publisher} --> ${subscriber} : ${data.topic} \\nEvent: ${event}\n`;
      }else{
         message = ` ${publisher} -> ${subscriber} : ${data.topic} \\nEvent: ${event}\n`;
      }
        plantUMLScript += message;
      }
    });
    plantUMLScript += "\n@enduml";

    // Write the PlantUML script to the output file
    fs.writeFile(outputFilePath, plantUMLScript, "utf8", (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }
      console.log("PlantUML script generated successfully!");
    });
    const svg = await plantuml(plantUMLScript);
    fs.writeFileSync("./output/sq.svg", svg);
    exec(`open ${'./output/sq.svg'}`);
  });

}

function parseLogLine(line) {
  // Implement logic to extract desired information from each line based on your log format
  // This example assumes specific keywords and delimiters
  const data = {};

  // if (!line.includes('<')){
  //   line = line.replace(/\\"/g,'"');
  //   line = line.replace('"{"','{"');
  //   line = line.replace('}"}', '}}');
  //   line = line.replace('"{}', '"{}"')
  // }
  const logData = JSON.parse(line);
  data.level = logData.level;
    if (data.level == "info") {
      const [, , , publisher, , topic] = logData.message.trim().split(/\s+/);
      data.source = publisher.includes('auto') ? 'DeviceEmulator':publisher;
      data.topic = topic;
      if(!(logData.value === "(null)") && !line.includes('<') && logData.value.event ){
      data.info = logData.value;
      data.event = data.info.event;}
      else if(line.includes('<')){
          data.event = 'XML_PAYLOAD';
      }
      else if(logData.value === "(null)"){
        data.event = '(null)';
      }else{
        if(logData.value.name !== undefined)
        data.event = logData.value.name;
      else if(logData.value !== 'Operation Complete' && !logData.value.includes('getMediaIDs') && !logData.value.includes('getStrings')){
          let qq = JSON.parse(logData.value);
          data.event = qq.event;
      }
      }
    } else if (data.level == "debug" && line.includes("Sending PUBLISH to")) {
      const [, , , target, , , , , topic] = logData.message.trim().split(/\s+/);
      data.target = target.includes('auto') ? 'DeviceEmulator':target;
      data.topic = topic.slice(1, -2);
      data.message = logData.message;
    }
  return data;
}
exports.generateSD = generatePlantUML;
exports.parseLogLine = parseLogLine;