import React from 'react';
import dataArrayObject from '../lib/datafactor'; 

// Load all datasets
const jDataMain = dataArrayObject('shogunMain.json'); 
const jDataSecond = dataArrayObject('shogun2nd.json'); 
const jDataFamily = dataArrayObject('family.json'); 


// Function to get sorted list for shogunMain.json
export function getListMain() {
   

    // Use map() on array to extract id, name, and gender properties
    return jDataMain.map(item => ({
        id: item.id.toString(),
        Character: item.Character,
        gender: item.Gender,
    }));
}

// Function to get sorted list for shogun2nd.json
export function getListSecond() {
    

    // Use map() on array to extract id, name, and gender properties
    return jDataSecond.map(item => ({
        id: item.id.toString(),
        Character: item.Character,
        gender: item.Gender,
    }));
}

// Function to get all IDs for shogunMain.json
export function getAllIdsMain() {
    return jDataMain.map(item => ({
        params: {
            id: item.id.toString()
        }
    }));
}

// Function to get all IDs for shogun2nd.json
export function getAllIdsSecond() {
    return jDataSecond.map(item => ({
        params: {
            id: item.id.toString()
        }
    }));
}

// Function to get data by ID for shogunMain.json
export async function getDataMain(idRequested) {
    const objMatch = jDataMain.filter(obj => obj.id.toString() === idRequested);
    
    let objReturned;
    if (objMatch.length > 0) {
        objReturned = objMatch[0];
    } else {
        objReturned = {};
    }

    return objReturned;
}

// Function to get data by ID for shogun2nd.json
export async function getDataSecond(id2Requested) {
    const obj2Match = jDataSecond.filter(obj => obj.id.toString() === id2Requested);
    
    let obj2Returned;
    if (obj2Match.length > 0) {
        obj2Returned = obj2Match[0];
    } else {
        obj2Returned = {};
    }

    return obj2Returned;
}




//  the Main and Secondary Character data go in one list
export function combinedData() {
    
    const combinedData = [...jDataMain, ...jDataSecond];
  
    return combinedData.map(item => ({
      id: item.id,
      Character: item.Character,
      Role: item.Role,
      Gender: item.Gender
    })

    );
    
  }


  // This function cross-references the family.json datalist with the combined Main and Secondary cast lists.
  export function groupByFamily(combinedData) {
    const familyGroups = {};
  
    jDataFamily.forEach(familyEntry => {
      const headOfClanId = familyEntry.headOfClan;
      console.log('familyEntry:', familyEntry);
   
      const getCharacterObjects = {};
      combinedData.forEach(item => {
        getCharacterObjects[item.id] = item;
      });
  
      // Get the clan head object if headOfClanId is not null
      let clanHead = null;
      if (headOfClanId !== null) {
        clanHead = getCharacterObjects[headOfClanId] || null;
      }
  
      // setting unrelated characters' family list to null
      const familyIds = (familyEntry.family.id !== 5) ? familyEntry.family : [];
  
      // Get the family members' objects
      const memberObjects = familyIds.map(memberId => {
        const member = getCharacterObjects[memberId] || null;
        return member;
      }).filter(member => member !== null); // filtering out the unrelated characters
  
      // Create the family group
      const familyGroup = {
        headOfClan: clanHead,
        members: memberObjects
      };
  
      // Store in familyGroups with familyEntry.id as the key
      familyGroups[familyEntry.id] = familyGroup;
    });
  
    return familyGroups;
  }
  
  