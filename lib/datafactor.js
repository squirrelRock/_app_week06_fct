// datafactor.js
import React from 'react';
import fs from 'fs';
import path from 'path';

export default function dataArrayObject(listName) {
    const dataDirectory = path.join(process.cwd(), 'data');
    const dataFilePath = path.join(dataDirectory, listName);
  
    // Read and load json file 
    const jsonRawString = fs.readFileSync(dataFilePath, 'utf8');

    // Convert string to json array object
    const jsonDataObj = JSON.parse(jsonRawString);

    console.log(`Loaded data from ${listName}:`, jsonDataObj); // Debug log

    return jsonDataObj;
}
