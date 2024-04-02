const fs = require('fs');
const path = require('path');

// Specify the directory containing the files to rename
// Example: '/Users/your-username/Documents/screenshots'
const directoryPath = '/Users/tannerschenck/Documents/screenshots';

// Read the directory
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(originalFilename => {
    // Replace spaces and hyphens with underscores in the filename
    const newFilename = originalFilename.replace(/[\s-]/g, '_');

    // Full path for original and new filenames
    const originalFilePath = path.join(directoryPath, originalFilename);
    const newFilePath = path.join(directoryPath, newFilename);

    // Rename the file
    fs.rename(originalFilePath, newFilePath, (err) => {
      if (err) {
        console.error(`Error renaming file '${originalFilename}':`, err);
      } else {
        console.log(`Renamed '${originalFilename}' to '${newFilename}'`);
      }
    });
  });
});