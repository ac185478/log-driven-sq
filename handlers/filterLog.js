const fs = require('fs').promises; // Import promises from file system module

// Function to filter lines based on text
function grep(lines, text) {
  const regex = new RegExp(text, "g");
  return lines.filter(line => regex.test(line));
}


// Function to perform operations from file
async function processFile(filePath, text, outputFilePath, operation) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const lines = data.split('\n');

    let filteredLines;
    if (operation === 'filter') {
      filteredLines = grep(lines, text);
    } else if (operation === 'remove') {
      filteredLines = lines.filter(line => !line.includes(text)); // Filter again to remove lines with text
    } else {
      throw new Error('Invalid operation. Choose "filter" or "remove".');
    }

    await fs.writeFile(outputFilePath, filteredLines.join('\n'), 'utf-8');
    console.log(`${operation === 'filter' ? 'Filtered' : 'Lines without'} '${text}' ${operation === 'filter' ? 'written' : 'removed'} to: ${outputFilePath}`);
  } catch (err) {
    console.error(err);
  }
}

// Example usage


// processFile(filePath, text[1], outputFilePath, operation[1]);

exports.processFile = processFile;

