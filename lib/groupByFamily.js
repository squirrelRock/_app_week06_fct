import React from 'react';
import dataArrayObject from '../lib/datafactor'; 
import jDataMain from '../lib/datalist';
import jDataSecond from '../lib/datalist';



const jDataFamily = dataArrayObject('family.json'); 


//Putting the Main and Secondary Character data into one list
export function combinedData() {
    
    const combinedData = [...jDataMain, ...jDataSecond];
  
    return combinedData.map(item => ({
      id: item.id,
      Character: item.Character,
      Role: item.Role,
      Gender: item.Gender
    }));
  }


   
  export function groupByFamily(combinedData, jDataFamily) {
    const familyGroups = {};
    console.log('Starting groupByFamily function');
    
    // Loop through each family entry in the family data
    jDataFamily.forEach(familyEntry => {
      const headOfClanId = familyEntry.headOfClan;
      console.log('family entry:', familyEntry); 
  
      // Get the clan head object if headOfClanId is not null
      let clanHead = null;
      if (headOfClanId !== null) {
        console.log('head of clan ID:', headOfClanId); 
        clanHead = combinedData.find(item => item.id === headOfClanId);
        
        console.log('Clan Head Object:', clanHead); 

      } else {
        console.log('No head of clan, just unrelated');
      }
  
      // Get the family members' objects
      const memberObjects = familyEntry.family.map(memberId => {
        const member = combinedData.find(item => item.id === memberId);
       
        return member;
      });
  
     
      const familyGroup = {
        headOfClan: clanHead,
        members: memberObjects
      };
  
      // Store in familyGroups with familyEntry.id as the key
      familyGroups[familyEntry.id] = familyGroup;
    });
  
    return familyGroups;
  }
 
  // const familyGroups = groupByFamily(combinedData(), jDataFamily);