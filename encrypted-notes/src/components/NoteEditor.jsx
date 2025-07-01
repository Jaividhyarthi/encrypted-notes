import React from 'react';

function NoteEditor({ text, setText, passphrase, setPassphrase, addNote }) {
  return (
    <>
      <input
        type="password"
        placeholder="Enter passphrase"
        value={passphrase}
        onChange={(e) => setPassphrase(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />

      <textarea
        placeholder="Type your note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: '100%', height: '100px', padding: '10px' }}
      />

      <button onClick={addNote} style={{ marginTop: '10px', padding: '10px 20px' }}>
        ➕ Add Note
      </button>
    </>
  );
}

export default NoteEditor;
