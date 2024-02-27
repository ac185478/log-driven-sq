//extracting fileData 
const fs = require('fs').promises;


async function buildingUML(filePath) {
  let publisher = [],subscriber = [],topic = [],event = [];
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      const lines = data.split('\n');
      console.log(lines); // to check if the logs fetched 
      lines.map((eachline) =>{

      })
    } catch (err) {
      console.error(err);
    }
  }

exports.buildUML = buildingUML;