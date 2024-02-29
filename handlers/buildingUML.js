const fs = require('fs');
var plantuml = require('node-plantuml');
// const logFilePath = '/Users/AC185478/Documents/MyProjects/tracer/output/filtered_log.log';
// const outputFilePath = '/Users/AC185478/Documents/MyProjects/tracer/output/test.puml';
async function generatePlantUML(inputFilePath, outputFilePath) {
    // Read the log file
    fs.readFile(inputFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        // Split the log into lines
        const lines = data.split('\n');

        // Initialize PlantUML script
        let plantUMLScript = `@startuml\n\ntitle Message Sequence\n\n`;

        // Object to store participants (publishers and subscribers)
        const participants = {};
        let publisher = null;
        let subscriber = null;

        // Iterate over each line in the log
        lines.forEach(line => {
            let data = parseLogLine(line);
            if (line.includes("Received PUBLISH from")) {
                // Extract publisher information
                publisher = data.source;
                participants[publisher] = `participant ${publisher}\n`;

            } else if (line.includes("Sending PUBLISH to")) {
                // Extract subscriber information
                subscriber = data.target;
                participants[subscriber] = `participant ${subscriber}\n`;
            }
            // Extract topic
            const topic = data.topic;

            // Add message to PlantUML script
            if (publisher && subscriber && (publisher != subscriber) && data.info) {
                const message = `${publisher} -> ${subscriber} : ${topic} Payload: '${data.info}'\n`;
                plantUMLScript += message;
            }
        });

        // Add participants to PlantUML script
        for (const participant in participants) {
            if(participant!=undefined){
            plantUMLScript += participants[participant];
            }
        }

        // Close PlantUML script
        plantUMLScript += '\n@enduml';

        // Write the PlantUML script to the output file
        fs.writeFile(outputFilePath, plantUMLScript, 'utf8', err => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log('PlantUML script generated successfully!');
        });
        var gen = plantuml.generate("./output/test.puml");
        gen.out.pipe(fs.createWriteStream("./output/sd.png"));
    });
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
      data.topic = topic.slice(1,-2);
      data.info = null;
      data.message = logData.message;
    }
    return data;
  }
// Example usage:
// generatePlantUML(logFilePath, outputFilePath);


exports.generateSD = generatePlantUML;