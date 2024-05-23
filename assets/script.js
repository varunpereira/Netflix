const fs = require('fs');
const path = require('path');

// Directory containing the folders
const baseDir = path.join(__dirname, 'shows'); // Change 'output' to your target directory

// Ensure the base directory exists
if (!fs.existsSync(baseDir)) {
  console.error(`Base directory does not exist: ${baseDir}`);
  process.exit(1);
}

// Read the base directory and filter for subdirectories
const folders = fs.readdirSync(baseDir).filter(name => fs.lstatSync(path.join(baseDir, name)).isDirectory());

// Create an array of objects based on folder names
const folderObjects = folders.map((folderName, index) => ({
  id: index + 1,
  title: folderName,
  keywords: folderName,
  cover_link: "/shows/"+folderName+'/cover.jpg',
  snip_link: "",
}));

// console.log(folderObjects);

// Optionally, write the result to a JSON file
fs.writeFileSync('shows.js', JSON.stringify(folderObjects, null, 2), 'utf-8');
