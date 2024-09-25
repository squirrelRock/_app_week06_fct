import React from 'react';
import dataArrayObject from '../lib/datafactor';


const jDataMain = dataArrayObject('shogunMain.json'); 
const jDataSecond = dataArrayObject('shogun2nd.json'); 
const things = dataArrayObject('things.json'); 

// Combine Main and Secondary Character data into one list
export function combinedData() {
  const combinedData = [...jDataMain, ...jDataSecond];

  return combinedData.map(item => ({
    id: item.id,
    Character: item.Character,
    Role: item.Role,
    Personality: item.Personality,
    About: item.About,
    Gender: item.Gender,
    Actor: item.Actor
  }));
}

// function returns names and ids for all json objects in array, sorted by name property
export function getSortedList() {
  const data = combinedData(); 
 // sort json array by name property
  data.sort((a, b) => a.Character.localeCompare(b.Character));

  // Map to extract id + Character properties
  return data.map(item => ({
    id: item.id.toString(),
    Character: item.Character,
    Role: item.Role,
    Personality: item.Personality,
    About: item.About,
    Gender: item.Gender,
    Actor: item.Actor
  }));
}

// function returns ids for all json objects in array
export function getAllCharIds() {
  const data = combinedData(); 

  // Map to return id properties
  return data.map(item => ({
    params: {
      id: item.id.toString()
    }
  }));
}
// function return ALL of the properties for one single object with a match id prop value
export function getCharData(characterID) {
  const data = combinedData(); 
  const things = dataArrayObject('things.json'); 
  
  // Find character with matching id
  const characterMatch = data.filter(character => character.id.toString() === characterID);

 
  let character;
  if (characterMatch.length > 0) {
    character = characterMatch[0];
  
    // Find all things 
    const favoriteThings = things.filter(thing => {
      //all values will be arrays
      return thing.owner.includes(parseInt(characterID));  
    });
  
    character.things = favoriteThings; 

  } else {
    character = {};  
  }
 // return object value found
  return character;
}