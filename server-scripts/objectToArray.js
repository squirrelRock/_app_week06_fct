const fs = require("fs");
const path = require("path");

// Path to your original character JSON file
const inputFilePath = path.resolve(__dirname, "../data/shogunAll2.json");
const outputFilePath = path.resolve(__dirname, "../data/shogunAll2_arr.json");

// Read and parse the original object-based character data
const characterData = JSON.parse(fs.readFileSync(inputFilePath, "utf8"));

// Convert the object to an array using Object.values()
const characterArray = Object.values(characterData);

// Write the array format to a new file
fs.writeFileSync(outputFilePath, JSON.stringify(characterArray, null, 2));

console.log("Data successfully converted to array format and saved to character_array.json!");