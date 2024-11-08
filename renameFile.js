const fs = require('fs');
const path = require('path');

// get directory from command line
const directoryPath = process.argv[2];

// Check if directory path is provided
if (!directoryPath) {
  console.error("Please provide a directory path as an argument, e.g. 'node renameFile.js /path/to/directory'");
  process.exit(1);
}

// Read the directory
fs.readdir(directoryPath, async (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }
// Confirm the directory being processed
console.log(`Processing directory: ${directoryPath}`);

let renamedFiles = 0;

const renameTasks = files.map((originalFilename) => {
    // Replace spaces and hyphens with underscores in the filename
    const newFilename = originalFilename.replace(/[\s-]/g, '_');

    // Full path for original and new filenames
    const originalFilePath = path.join(directoryPath, originalFilename);
    const newFilePath = path.join(directoryPath, newFilename);

    // Rename the file if the name has changed
    if (originalFilename !== newFilename) {
      return new Promise((resolve, reject) => {
        
        fs.rename(originalFilePath, newFilePath, (err) => {
          if (err) {
            console.error(`Error renaming file '${originalFilename}':`, err);
            reject(err);
          } else {
            console.log(`Renamed '${originalFilename}' to '${newFilename}'`);
            renamedFiles++;
            resolve();
          }
        });
    });
  }
  return Promise.resolve();
});

await Promise.all(renameTasks);

// Display summary after all renaming is complete
  console.log(`\nFinished processing directory: ${directoryPath}`);
  console.log(`Total files renamed: ${renamedFiles}`);
});