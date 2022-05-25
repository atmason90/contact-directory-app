// TODO: Install the following package:
import { openDB } from 'idb';

// TODO: Complete the initDb() function below:
const initdb = async () => {
    openDB('contact', 1, {
        upgrade(db) {
            if (db.objectStoreNames.contains('contact')) {
                console.log('contact database already exists');
                return;
            }
            db.createObjectStore('contact', { keyPath: 'id', autoIncrement: true });
            console.log('contact database created');
        }
    })
};


// TODO: Complete the postDb() function below:
export const postDb = async (name, home, cell, email)  => {
    console.log('POST to database');
    const contactDb = await openDB('contact', 1);
    const tx = contactDb.transaction('contact', 'readwrite');
    const store = tx.objectStore('contact');
    const request = store.post({ name: name, home: home, cell: cell, email: email });
    const result = await request;
    console.log('data saved to database', result);
};

// TODO: Complete the getDb() function below:
export const getDb = async () => {
  console.log('GET all data from database');
  const contactDb = await openDB('contact', 1);
  const tx = contactDb.transaction('contact', 'readonly');
  const store = tx.objectStore('contact');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
  console.log('DELETE database');
  const contactDb = await openDB('contact', 1);
  const tx = contactDb.transaction('contact', 'readwrite');
  const store = tx.objectStore('contact');
  const request = store.delete();
  const result = await request;
  console.log('database deleted', result);
};

initdb();
