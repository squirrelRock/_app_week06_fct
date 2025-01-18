const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path"); 

// Path to service account file
const serviceAccount = require("./app-week06-f8c99-firebase-adminsdk-pxd75-b3ea50dfdc.json");

// Firebase Admin SDK - initializing
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Firestore database instance
const db = admin.firestore();

// Path to the JSON data file
const dataFile = path.join(__dirname, "../data/shogunAll.json");

// Import data function
const importData = async () => {
  try {
    // Read and parse the JSON data file
    const data = JSON.parse(fs.readFileSync(dataFile, "utf8"));

    // Ensure the data is a valid object (not an array or null)
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      const collectionRef = db.collection("shogunAll");

      // Iterate over each key in the object (which represents document IDs)
      for (const characterId in data) {
        if (data.hasOwnProperty(characterId)) {
          const docData = data[characterId];

          // Use characterId as the document ID
          await collectionRef.doc(characterId).set(docData);
          console.log(`Document with ID ${characterId} added successfully!`);
        }
      }
      console.log("Data import completed successfully!");
    } else {
      console.error("Error: Expected the JSON data to be an object with character IDs as keys.");
    }
  } catch (error) {
    console.error("Error importing data: ", error);
  }
};

// Run the import function
importData();