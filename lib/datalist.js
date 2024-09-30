import React from 'react'; 

import app from "./firebase-app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";

const db = getFirestore(app);
console.log(db);



// Function to get only main characters (the ones with odd ids) for the main character list
export async function getListMain() {
  console.log("getListMain");

  const jDataMain = await combinedData();

  // Filter out items with odd IDs and then map the desired properties
  return jDataMain
    .filter(item => parseInt(item.id) % 2 !== 0)
    .map(item => ({
      id: item.id.toString(),
      Character: item.Character,
      gender: item.Gender,
    }));
}


   // Function to get data by ID for a main character
export async function getDataMain(idClicked) {
    const docRef = doc(db, "shogunAll", idClicked);
    const d = await getDoc(docRef);
    
    let character;
    if (!d.exists) {
      character = {};
    } else {
      character = d.data();
    }
  

    return character;
}

//---------------------------------------------

// Function to get unsorted list for secondary characters from shogunAll
export async function getListSecond() {
    const jDataSecond  = await combinedData();

// Use map() on array to extract id, name, and gender properties
return jDataSecond.map(item => ({
    id: item.id.toString(),
    Character: item.Character,
    gender: item.Gender,
}));
}


// Function to get data by ID for shogun2nd.json
export async function getDataSecond(idClicked) {
    const docRef2 = doc(db, "shogunAll", idClicked);
    const d = await getDoc(docRef2);
    
    let character;
    if (!d.exists) {
      character = {};
    } else {
      character = d.data();
    }
  

    return character;
}




//  the Main and Secondary Character data go in one list
export async function combinedData() {
    
    const snapshot2 = await getDocs(collection(db, "shogunAll"));
    const allCharacterData = snapshot2.docs.map((d) => ({
      id: d.id,
      ...d.data()
    }));
    
    return allCharacterData;
  }


//  family clan data
export async function jDataFamily() {
    
    const snapshot = await getDocs(collection(db, "family"));
    const familyData = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data()
    }));
    
    return familyData;
  }


  // this function cross-references the family.json datalist with the full character list
  export async function groupByFamily() {
    
   
    // load the family data and the full character list data
    const [familyData, allCharacterData] = await Promise.all([jDataFamily(), combinedData()]);
  
    const familyGroups = {};
  
  
  
    // Loop through each family entry in familyDoc
    familyData.forEach(familyDoc => {
      const headOfClanId = familyDoc.headOfClan ? familyDoc.headOfClan.toString() : null;
      console.log('working on:', familyDoc);
  
      // Find the clan head object if `headOfClanId` is not null
      let clanHead = null;
      if (headOfClanId !== null) {
        // Use `.find` to get the clan head directly from `allCharacterData` with standardized ID comparison
        clanHead = allCharacterData.find(item => item.id.toString() === headOfClanId) || null;
        console.log(`clan head ${familyDoc.id}:`, clanHead);
      }
  
  
      // Get the family members' objects 
      const memberObjects = familyDoc.family
      ? allCharacterData.filter(character => familyDoc.family.includes(parseInt(character.id)))
      : [];
        
    
  
      console.log("family member objects:", memberObjects);
  
      // Create the family group object
      const familyGroup = {
        headOfClan: clanHead,
        members: memberObjects
      };
  
      // Store in `familyGroups` with `familyDoc.id` as the key
      familyGroups[familyDoc.id.toString()] = familyGroup;
      console.log(`Family Group ${familyDoc.id} created:`, familyGroup);
    });
  
    return familyGroups;
  }