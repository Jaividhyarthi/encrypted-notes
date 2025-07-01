import React, { useState, useEffect } from 'react';
import NoteEditor from './components/NoteEditor';
import NoteCard from './components/NoteCard';
import SearchBar from './components/SearchBar';
import { encryptNote, decryptNote } from './utils/crypto';
import { saveNote, getAllNotes, deleteNoteById } from './utils/db';

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [decryptedNotes, setDecryptedNotes] = useState({});
  const [search, setSearch] = useState('');

  // Load all notes on mount
  useEffect(() => {
    const loadNotes = async () => {
      const saved = await getAllNotes();
      setNotes(saved);
    };
    loadNotes();
  }, []);

  const addNote = async () => {
    if (!passphrase) return alert('Enter passphrase to encrypt.');
    const encrypted = encryptNote(text, passphrase);
    const newNote = {
      id: Date.now(),
      content: encrypted,
      pinned: false,
      archived: false,
    };
    await saveNote(newNote);
    setNotes([...notes, newNote]);
    setText('');
  };

  const decryptSingleNote = (note) => {
    if (!passphrase) return alert('Enter passphrase to decrypt.');
    const decrypted = decryptNote(note.content, passphrase);
    setDecryptedNotes({ ...decryptedNotes, [note.id]: decrypted });
  };

  const deleteNote = async (id) => {
    await deleteNoteById(id);
    setNotes(notes.filter((n) => n.id !== id));
    const updated = { ...decryptedNotes };
    delete updated[id];
    setDecryptedNotes(updated);
  };

  const togglePin = async (id) => {
    const updated = notes.map((n) =>
      n.id === id ? { ...n, pinned: !n.pinned } : n
    );
    setNotes(updated);
    await saveNote(updated.find((n) => n.id === id));
  };

  const archiveNote = async (id) => {
    const updated = notes.map((n) =>
      n.id === id ? { ...n, archived: true } : n
    );
    setNotes(updated);
    await saveNote(updated.find((n) => n.id === id));
  };

  const unarchiveNote = async (id) => {
    const updated = notes.map((n) =>
      n.id === id ? { ...n, archived: false } : n
    );
    setNotes(updated);
    await saveNote(updated.find((n) => n.id === id));
  };

  // Filter and sort visible notes
  const visibleNotes = notes
    .filter((n) => !n.archived)
    .filter((n) => {
      const d = decryptedNotes[n.id] || '';
      return d.toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '40px',
        backgroundColor: '#000',
        color: '#eee',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ width: '100%', maxWidth: '700px', padding: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>🔐 Encrypted Notes (Modular)</h1>

        <NoteEditor
          text={text}
          setText={setText}
          passphrase={passphrase}
          setPassphrase={setPassphrase}
          addNote={addNote}
        />

        <SearchBar search={search} setSearch={setSearch} />

        <hr />
        <h2>📌 Notes ({visibleNotes.length})</h2>
        {visibleNotes.length === 0 && <p>No notes found.</p>}
        {visibleNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            decrypted={decryptedNotes[note.id]}
            decryptNote={decryptSingleNote}
            deleteNote={deleteNote}
            togglePin={togglePin}
            archiveNote={archiveNote}
          />
        ))}

        <hr />
        <h2>🗂️ Archived Notes</h2>
        {notes.filter((n) => n.archived).length === 0 && <p>No archived notes.</p>}
        {notes
          .filter((n) => n.archived)
          .map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              decrypted={decryptedNotes[note.id]}
              decryptNote={decryptSingleNote}
              deleteNote={deleteNote}
              unarchiveNote={unarchiveNote}
              isArchived={true}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
