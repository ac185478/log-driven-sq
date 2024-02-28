//extracting fileData
const fs = require("fs").promises;

async function buildingUML(filePath, outputFile) {
  const participants = { publisher: [] };
  const subscribers = {};
  const messages = [];
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const lines = data.split("\n");
    lines.map((line) => {
      // ----------- NEED TO IMPLEMENT  --------------------
      const data = parseLogLine(line);
    //   if (data.level === "info") {
    //     // Identify publisher and message details
    //     const publisherId = data.source;
    //     participants.publisher.push(publisherId);
    //     messages.push({
    //       source: publisherId,
    //       topic: data.topic,
    //       info: data.info,
    //     });
    //   } else if (data.level === "debug") {
    //     // Identify subscriber and message details
    //     const subscriberId = data.target;
    //     if (!subscribers[subscriberId]) {
    //       subscribers[subscriberId] = [];
    //     }
    //     messages.push({
    //       target: subscriberId,
    //       topic: data.topic,
    //       info: null, // "info" message not available for subscribers in debug level
    //     });
    //     subscribers[subscriberId].push(data.message);
    //   }
    });
    // console.log(subscribers);
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
  const logData = JSON.parse(line.substring(9));
  data.level = logData.level;
  if (data.level == "info") {
    const [, , , publisher, , topic] = logData.message.trim().split(/\s+/);
    data.source = publisher;
    data.topic = topic;
    data.info = logData.value;
  } else if (data.level == "debug") {
    const [, , , target, , , , , topic] = logData.message.trim().split(/\s+/);
    data.target = target;
    data.topic = topic;
    data.info = null;
    data.message = logData.message;
  }
  return data;
}

function generatePumlScript(participants, subscribers, messages) {
  // ----------- NEED TO IMPLEMENT THIS LOGIC --------------------
  let script = "@startuml\n\n";
  // // Define participants (publisher and subscribers)
  // script += "title Transaction \n\n";
  // script += `participant publisher as \"${participants.publisher.join(' ')}\"\n`;
  // for (const subscriberId in subscribers) {
  //   script += `participant "${subscriberId}"\n`;
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
  return script;
}

// Replace with your actual file paths

exports.buildUML = buildingUML;
