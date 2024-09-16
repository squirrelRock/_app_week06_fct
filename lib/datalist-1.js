import dataArrayObject from '../lib/datafactor'; 

// Load the data using the dataArrayObject function
const jData = dataArrayObject('shogunMain.json');

// function returns names and ids for all json objects in array, sorted by name property
export function getSortedList() {
    // sort json array by name property
    jData.sort(
        function (a, b) {
            return a.Character.localeCompare(b.Character);
        }
    );

    // use map() on array to extract just id + name properties into new array of obj values
    return jData.map(
        function (item) {
            return {
                id: item.id.toString(),
                Character: item.Character,
                gender: item.Gender,
            };
        }
    );
}

// function returns ids for all json objects in array
export function getAllIds() {
    // use map() on array to extract just id + name properties into new array of obj values
    return jData.map(
        function (item) {
            return {
                params: {
                    id: item.id.toString()
                }
            };
        }
    );
}

// function return ALL of the properties for one single object with a match id prop value
export async function getData(idRequested) {
    // find object value in array that has matching id
    const objMatch = jData.filter(
        function (obj) {
            return obj.id.toString() === idRequested;
        }
    );

    // extract object value in filtered array if any
    let objReturned;
    if (objMatch.length > 0) {
        objReturned = objMatch[0];
    } else {
        objReturned = {};
    }

    // return object value found
    return objReturned;
}
