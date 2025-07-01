import { openDB } from 'idb';

const DB_NAME = 'secure_users';
const STORE_NAME = 'users';

export const initUserDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'username' });
      }
    },
  });
};

export const saveUser = async (username, passphrase) => {
  const db = await initUserDB();
  await db.put(STORE_NAME, { username, passphrase });
};

export const getUser = async (username) => {
  const db = await initUserDB();
  return db.get(STORE_NAME, username);
};
