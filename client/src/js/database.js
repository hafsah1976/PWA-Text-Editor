import { openDB } from 'idb'; //import IndexedDB module

const floppyDisk = '\uD83D\uDCBE'; //uniCode for save sign

// Initialize the IndexedDB database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Create an object store named 'jate' with auto-incrementing keys
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


// Placeholder for a method that adds content to the database
export const putDb = async (content) => {
  // Implement the logic to add content to the 'jate' object store in the database
  console.log('Saving data to the database:', floppyDisk);

  // Create a connection to the 'jate' database with version 1.
  const jatedb = await openDB('jate', 1);

  // Create a new transaction and specify the 'jate' object store with read-write privileges.
  const tx = jatedb.transaction('jate', 'readwrite');

  // Open the 'jate' object store.
  const store = tx.objectStore('jate');

  // Use the .add() method on the store to add content.
  const request = await store.add({ text: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('Data saved to the database:', floppyDisk, result);
};


// Placeholder for a method that gets all content from the database
// Export a function we will use to GET data from the database.
export const getDb = async () => {
  // Implement the logic to retrieve all content from the 'jate' object store in the database
  console.log('GET from the database');

  // Create a connection to the 'jate' database with version 1.
  const jatedb = await openDB('jate', 1);

  // Create a new transaction and specify the 'jate' object store with read-only privileges.
  const tx = jatedb.transaction('jate', 'readonly');

  // Open the 'jate' object store.
  const store = tx.objectStore('jate');

  // Use the .getAll() method to retrieve all data from the object store.
  const request = store.getAll();

  // Wait for the request to complete and get the result.
  const result = await request;
  console.log('Result from the database:', result);

  return result; // Return the retrieved data.
};
  
initdb(); // Initialize the database when the module is loaded
