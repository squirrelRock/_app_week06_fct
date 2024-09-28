export async function groupByFamily() {
  // Fetch `jDataFamily` and `combinedData` in parallel using Promise.all
  const [familyData, allCharacterData] = await Promise.all([jDataFamily(), combinedData()]);

  const familyGroups = {};
  console.log('Starting groupByFamily function');

  // Convert `familyData` to an array since it’s currently an object with IDs as keys
  const familyArray = Object.values(familyData);

  // Iterate over each family entry in the `familyArray`
  familyArray.forEach(familyDoc => {
    const headOfClanId = familyDoc.headOfClan;
    console.log('Family Document:', familyDoc);

    // Find the clan head object if `headOfClanId` is not null
    let clanHead = null;
    if (headOfClanId !== null) {
      // Use `.find` to get the clan head directly from `allCharacterData`
      clanHead = allCharacterData.find(item => item.id.toString() === headOfClanId.toString()) || null;
    }

    // Setting unrelated characters' family list to empty if no `family` field exists
    const familyIds = Array.isArray(familyDoc.family) ? familyDoc.family : [];

    // Get the family members' objects by using `.find` for each family ID
    const memberObjects = familyIds.map(memberId => {
      return allCharacterData.find(item => item.id.toString() === memberId.toString()) || null;
    }).filter(member => member !== null); // Filter out `null` values

    // Create the family group object
    const familyGroup = {
      headOfClan: clanHead,
      members: memberObjects
    };

    // Store in `familyGroups` with `familyDoc.id` as the key
    familyGroups[familyDoc.id.toString()] = familyGroup;
  });

  return familyGroups;
}