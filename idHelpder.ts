interface Person {
    name: string,
    age: number,
    id: number
}

// Function from lesson to add id to new records in collection with an id. Called in post handler
export function getNextIdFromCollection(collection: []) {
    if (collection.length === 0) return 1;
    const lastRecord: Person = collection[collection.length - 1];
    return lastRecord.id + 1;
}
