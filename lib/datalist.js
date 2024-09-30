import React from 'react'; 

import app from "./firebase-app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";

const db = getFirestore(app);
console.log(db);



// Function to get only main characters (the ones with odd ids) for the main character list
export async function getListMain() {
  console.log("getListMain");

  const snapshot = await getDocs(collection(db, "shogunAll"));
  const jDataMain = snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));

  // Filter out items with odd IDs and then map the desired properties
  return jDataMain
    .filter(item => parseInt(item.id) % 2 !== 0)
    .map(item => ({
      id: item.id.toString(),
      Character: item.Character,
      gender: item.Gender,
    }));
}


// refactored function to get all main char ids from shogunAll
export async function getAllIdsMain() {

  const snapshot = await getDocs( collection(db, "shogunAll") );
   
// filter for main characters - the ones who have odd ids
    return snapshot.docs
      .filter(item => parseInt(item.id) % 2 !== 0)
      .map(
        (d) => ({ 
            
           params: { 
             id: d.id.toString()
           }
         }
       )
     );    
   }

   // Function to get data by ID for a main character
export async function getDataMain(idRequested) {
    const docRef = doc(db, "shogunAll", idRequested);
    const d = await getDoc(docRef);
    
    let objReturned;
    if (!d.exists) {
      objReturned = {};
    } else {
      objReturned = d.data();
    }
  

    return objReturned;
}

//---------------------------------------------

// Function to get unsorted list for secondary characters from shogunAll
export async function getListSecond() {

    const snapshot = await getDocs( collection(db, "shogunAll") );
    const jDataSecond = snapshot.docs
     .filter(item => parseInt(item.id) % 2 === 0)
     .map(
        (d) => (
          {
           id: d.id,
           ... d.data()
          }
        )
      );


// Use map() on array to extract id, name, and gender properties
return jDataSecond.map(item => ({
    id: item.id.toString(),
    Character: item.Character,
    gender: item.Gender,
}));
}


export async function getAllIdsSecond() {
    const snapshot = await getDocs(collection(db, "shogunAll"));
    return snapshot.docs.map(
        (d) => (
          {
            params: {
                id: d.id.toString()
            }
         }
        )
      );
  }



// Function to get data by ID for shogun2nd.json
export async function getDataSecond(id2Requested) {
    const docRef2 = doc(db, "shogunAll", id2Requested);
    const d = await getDoc(docRef2);
    
    let obj2Returned;
    if (!d.exists) {
      obj2Returned = {};
    } else {
      obj2Returned = d.data();
    }
  

    return obj2Returned;
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
  
  
  
    // Loop through each family entry in the `familyArray`
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
  
  
      // Get the family members' objects using `.find` with standardized ID comparison
      const memberObjects = familyDoc.map(memberId => {
        const member = allCharacterData.find(item => item.id.toString() === memberId.toString()) || null;
        
        return member;
      }).filter(member => member !== null); 
  
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