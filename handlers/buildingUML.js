//extracting fileData 
const fs = require('fs').promises;


async function buildingUML(filePath,outputFile) {
  const participants = { publisher: [] };
  const subscribers = {};
  const messages = [];
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      const lines = data.split('\n');
      lines.map((line) =>{
        // ----------- NEED TO IMPLEMENT  --------------------
        // const data = parseLogLine(line);
        // if (data.level === "info" && data.message.startsWith("Sending PUBLISH to")) {
        //   // Identify publisher and message details
        //   const publisherId = data.message.split("'")[3];
        //   participants.publisher.push(publisherId);
        //   messages.push({
        //     source: publisherId,
        //     topic: data.message.split("'")[5],
        //     info: data.value,
        //   });
        // } else if (data.level === "debug" && data.message.startsWith("Received PUBLISH from")) {
        //   // Identify subscriber and message details
        //   const subscriberId = data.message.split("'")[3];
        //   if (!subscribers[subscriberId]) {
        //     subscribers[subscriberId] = [];
        //   }
        //   messages.push({
        //     target: subscriberId,
        //     topic: data.message.split("'")[5],
        //     info: null, // "info" message not available for subscribers in debug level
        //   });
        //   subscribers[subscriberId].push(data.message.split("'")[5]);
        // }

      });
    
      // Generate the .puml script content
      const pumlScript = generatePumlScript(participants, subscribers, messages);
    
      // Write the script content to the output file
      fs.writeFile(outputFile, pumlScript);
    } catch (err) {
      console.error(err);
    }
  }

function parseLogLine(line) {
  // Implement logic to extract desired information from each line based on your log format
  // This example assumes specific keywords and delimiters
  const data = {};
  // ----------- NEED TO IMPLEMENT EACH LOG PARSING --------------------
  
  return data;
}

function generatePumlScript(participants, subscribers, messages) {
  // ----------- NEED TO REFINE THIS LOGIC --------------------
  // let script = "@startuml\n\n";

  // // Define participants (publisher and subscribers)
  // script += "title <title> \n\n";
  // script += `participant publisher as \"${participants.publisher.join(' ')}\"\n`;
  // for (const subscriberId in subscribers) {
  //   script += `participant subscriber_${subscriberId} as "${subscriberId}"\n`;
  // }

  // // Add messages as arrows with corresponding topics and (optional) info
  // messages.forEach(message => {
  //   const source = message.source || `publisher`;
  //   const target = message.target || `subscriber_${message.target}`;
  //   const topic = message.topic;
  //   const info = message.info ? `"${message.info}"` : "";
  //   script += `${source} --> ${target} : "${topic} ${info}\n`;
  // });

  // script += "\n@enduml";
  // return script;
}

// Replace with your actual file paths


exports.buildUML = buildingUML;