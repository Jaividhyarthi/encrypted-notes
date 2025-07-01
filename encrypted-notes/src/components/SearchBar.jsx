import React from 'react';

function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search decrypted notes..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
    />
  );
}

export default SearchBar;
