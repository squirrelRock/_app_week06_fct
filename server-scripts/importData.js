
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path"); 

// Path to service account file
const serviceAccount = require("./app-week06-f8c99-firebase-adminsdk-pxd75-b3ea50dfdc.json");

//  Firebase Admin SDK - initializing
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// database instance
const db = admin.firestore();


const jsonFiles = [
  "../data/family.json",
  "../data/shogunMain.json",
  "../data/shogun2nd.json",
  "../data/things.json"
];


const importData = async () => {
  try {
    // iterate over each JSON file
    for (const file of jsonFiles) {
      const dataFilePath = path.resolve(__dirname, file);
      
      // parse the JSON data file
      const data = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));

      console.log(`I am importing data from file: ${file}`);

      // define collection name
      const collectionName = path.basename(file, ".json");

      // is data is array or object?
      const collectionRef = db.collection(collectionName);
      
      if (Array.isArray(data)) {
        //if data is an array, make separate documents
        for (let index = 0; index < data.length; index++) {
          const docData = data[index];
          await collectionRef.doc(`doc_${index + 1}`).set(docData);
          console.log(`Document doc_${index + 1} in collection ${collectionName} imported successfully!`);
        }
      } else if (typeof data === 'object') {
        // if data is an object, it's in key-value format
        for (const [docId, docData] of Object.entries(data)) {
          await collectionRef.doc(docId).set(docData);
          console.log(`Document ${docId} in collection ${collectionName} imported successfully!`);
        }
      }
    }
    console.log("All data imports completed successfully!");
  } catch (error) {
    console.error("Error importing data: ", error);
  }
};

// run the function
importData();