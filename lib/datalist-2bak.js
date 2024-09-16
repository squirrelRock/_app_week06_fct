import dataArrayObject from '../lib/datafactor'; 


const jDataMain = dataArrayObject('shogunMain.json'); 
const jDataSecond = dataArrayObject('shogun2nd.json'); 

// Function to get sorted list for shogunMain.json
export function getSortedListMain() {
    // Create a copy of jDataMain and sort it by name property
    const sortedDataMain = [...jDataMain].sort((a, b) => a.Character.localeCompare(b.Character));

    // Use map() on array to extract id, name, and gender properties
    return sortedDataMain.map(item => ({
        id: item.id.toString(),
        Character: item.Character,
        gender: item.Gender,
    }));
}

// Function to get sorted list for shogun2nd.json
export function getSortedListSecond() {
    // Create a copy of jDataSecond and sort it by name property
    const sortedDataSecond = [...jDataSecond].sort((a, b) => a.Character.localeCompare(b.Character));

    // Use map() on array to extract id, name, and gender properties
    return sortedDataSecond.map(item => ({
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
