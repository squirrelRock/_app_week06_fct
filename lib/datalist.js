import React from 'react'; 

import app from "./firebase-app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";

const db = getFirestore(app);
console.log(db);



// Function to get unsorted list for shogunMain.json
export async function getListMain() {
   console.log("getListMain");

   const snapshot = await getDocs( collection(db, "shogunMain") );
   const jDataMain = snapshot.docs.map(
     (d) => (
       {
        id: d.id,
        ... d.data()
       }
     )
   );

    // Use map() on array to extract id, name, and gender properties
    return jDataMain.map(item => ({
        id: item.id.toString(),
        Character: item.Character,
        gender: item.Gender,
    }));
}



// refactored function to get all IDs for shogunMain.json
export async function getAllIdsMain() {

  const snapshot = await getDocs( collection(db, "shogunMain") );
   

    return snapshot.docs.map(
        (d) => ({ 
            
           params: { 
             id: d.id.toString()
           }
         }
       )
     );    
   }

   // Function to get data by ID for shogunMain.json
export async function getDataMain(idRequested) {
    const docRef = doc(db, "shogunMain", idRequested);
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

// Function to get unsorted list for shogun2nd.json
export async function getListSecond() {

    const snapshot = await getDocs( collection(db, "shogun2nd") );
    const jDataSecond = snapshot.docs.map(
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
    const snapshot = await getDocs(collection(db, "shogun2nd"));
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
    const docRef2 = doc(db, "shogun2nd", id2Requested);
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


//  the Main and Secondary Character data go in one list
export async function jDataFamily() {
    
    const snapshot = await getDocs(collection(db, "family"));
    const familyData = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data()
    }));
    
    return familyData;
  }


  // This function cross-references the family.json datalist with the combined Main and Secondary cast lists.
  export async function groupByFamily() {
    console.log("🚀🚀🚀 groupByFamily function has started 🚀🚀🚀");
   
    // Fetch `jDataFamily` and `combinedData` in parallel using Promise.all
    const [familyData, allCharacterData] = await Promise.all([jDataFamily(), combinedData()]);
  
    const familyGroups = {};
    console.log('Starting groupByFamily function');
  
    // Convert `familyData` to an array since it’s currently an object with IDs as keys
    const familyArray = Object.values(familyData);
    console.log("Family Array after conversion:", familyArray);
  
    // Log the IDs in `allCharacterData` to confirm structure
    console.log("All Character Data IDs:", allCharacterData.map(character => character.id));
  
    // Loop through each family entry in the `familyArray`
    familyArray.forEach(familyDoc => {
      const headOfClanId = familyDoc.headOfClan ? familyDoc.headOfClan.toString() : null;
      console.log('Processing Family Document:', familyDoc);
  
      // Find the clan head object if `headOfClanId` is not null
      let clanHead = null;
      if (headOfClanId !== null) {
        // Use `.find` to get the clan head directly from `allCharacterData` with standardized ID comparison
        clanHead = allCharacterData.find(item => item.id.toString() === headOfClanId) || null;
        console.log(`Clan Head for Family ${familyDoc.id}:`, clanHead);
      }
  
      // Log the family members' IDs
      const familyIds = Array.isArray(familyDoc.family) ? familyDoc.family : [];
      console.log("Family IDs for Family Group:", familyIds.map(id => id.toString())); // Ensure IDs are strings
  
      // Get the family members' objects using `.find` with standardized ID comparison
      const memberObjects = familyIds.map(memberId => {
        const member = allCharacterData.find(item => item.id.toString() === memberId.toString()) || null;
        console.log(`Family Member ID ${memberId} found in Combined Data:`, member);
        return member;
      }).filter(member => member !== null); // Filter out `null` values
  
      console.log("Family Members for Family Group:", memberObjects);
  
      // Create the family group object
      const familyGroup = {
        headOfClan: clanHead,
        members: memberObjects
      };
  
      // Store in `familyGroups` with `familyDoc.id` as the key
      familyGroups[familyDoc.id.toString()] = familyGroup;
      console.log(`Family Group ${familyDoc.id} created:`, familyGroup);
    });
  
    console.log("Final Family Groups Object:", JSON.stringify(familyGroups, null, 2));
    return familyGroups;
  }