import React from 'react';
import app from "./firebase-app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";

const db = getFirestore(app);
console.log(db);

// Combine Main and Secondary Character data into one list
export async function combinedData() {
  
  const snapshot2 = await getDocs(collection(db, "shogunAll"));
  const allCharacterData = snapshot2.docs.map((d) => ({
    id: d.id,
    ...d.data()
  }));

  return allCharacterData;
}

// function returns names and ids for all json objects in array, sorted by name property
export async function getSortedList() {


  const allCharacterData = await combinedData();

  // const data = allCharacterData; 
 // sort json array by name property
  allCharacterData.sort((a, b) => a.Character.localeCompare(b.Character));

  // take all sorted data
  return allCharacterData;
}

// function returns ids for all json objects in array
export async function getAllCharacterIds() {
 
const snapshot = await getDocs( collection(db, "shogunAll") );
   

   const paths = snapshot.docs.map(
        (d) => ({ 
            
           params: { 
             id: d.id.toString()
           }
         }
       )
     ); 
     console.log("here are the Paths:", paths); 
     return paths;   
   }


// function return ALL of the properties for one single object with a match id prop value
export async function getCharacterData(characterID) {

  const allCharacterData = await combinedData();

  const snapshot3 = await getDocs(collection(db, "things"));
  const things = snapshot3.docs.map((d) => ({
    id: d.id,
    ...d.data()
  }));

  
  // Find character with matching id
  const characterMatch = allCharacterData.filter(character => character.id.toString() === characterID);
  let character;
 if (!characterMatch){
  
   character = {};  
 } else { 
    character = characterMatch[0];
  
    // Find all things 
    const favoriteThings = things.filter(thing => {
      // parse
      return thing.owner.includes(parseInt(characterID));  
    });
  
    character.things = favoriteThings; 

  } 
 // return object value found
  return character;
}