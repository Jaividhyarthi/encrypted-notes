import React from 'react';

function NoteCard({
  note,
  decrypted,
  decryptNote,
  deleteNote,
  togglePin,
  archiveNote,
  unarchiveNote,
  isArchived = false,
}) {
  return (
    <div
      style={{
        border: isArchived ? '1px dashed #aaa' : '1px solid #aaa',
        padding: '10px',
        marginTop: '10px',
        borderRadius: '4px',
        background: 'transparent', // ✅ No background color
        color: '#eee', // optional: light text for dark background
      }}
    >
      <p>
        <strong>Encrypted:</strong>
        <br />
        {note.content}
      </p>
      <p>
        <strong>Decrypted:</strong>
        <br />
        {decrypted || '🔒 Locked'}
      </p>

      <button onClick={() => decryptNote(note)}>🔓 Decrypt</button>{' '}
      <button onClick={() => deleteNote(note.id)}>🗑️ Delete</button>{' '}

      {!isArchived ? (
        <>
          <button onClick={() => togglePin(note.id)}>
            {note.pinned ? '📌 Unpin' : '📍 Pin'}
          </button>{' '}
          <button onClick={() => archiveNote(note.id)}>🗄️ Archive</button>
        </>
      ) : (
        <button onClick={() => unarchiveNote(note.id)}>♻️ Unarchive</button>
      )}
    </div>
  );
}

export default NoteCard;
