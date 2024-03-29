const { readFileSync, writeFileSync } = require('fs');

const fs = require('fs').promises; // Import promises from file system module

// Function to filter lines based on text
function grep(lines, text) {
  // const regex = new RegExp(text, "g");
  // return lines.filter(line => regex.test(line));
  return lines.filter(line => line.includes(text));
}


// Function to perform operations from file
async function processFile(filePath, text, outputFilePath, operation) {
  try {
    const data = await readFileSync(filePath, 'utf-8');
    const lines = data.split('\n');

    let filteredLines;
    if (operation === 'filter') {
      filteredLines = grep(lines, text);
    } else if (operation === 'remove') {
      filteredLines = lines.filter(line => {
        if ((!line.includes('info') && text == 'Received') || (text == 'Received' && line.includes('Received') && line.includes('debug')) || (text != 'Received')){
          return !line.includes(text);
        }
        return line.includes(text)}); // Filter again to remove lines with text
    } else {
      throw new Error('Invalid operation. Choose "filter" or "remove".');
    }

    await writeFileSync(outputFilePath, filteredLines.join('\n'), 'utf-8');
    console.log(`${operation === 'filter' ? 'Filtered' : 'Lines without'} '${text}' ${operation === 'filter' ? 'written' : 'removed'} to: ${outputFilePath}`);
  } catch (err) {
    console.error(err);
  }
}

exports.processFile = processFile;