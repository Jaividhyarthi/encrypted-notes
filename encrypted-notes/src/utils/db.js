import { openDB } from 'idb';

const DB_NAME = 'secure_notes_db';
const STORE_NAME = 'notes';

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

export const saveNote = async (note) => {
  const db = await initDB();
  await db.put(STORE_NAME, note);
};

export const getAllNotes = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};

export const deleteNoteById = async (id) => {
  const db = await initDB();
  return await db.delete(STORE_NAME, id);
};
