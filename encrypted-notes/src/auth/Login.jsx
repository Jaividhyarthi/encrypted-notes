import React, { useState } from 'react';
import { saveUser, getUser } from '../utils/authDb';
import { useAuth } from './AuthProvider';

function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [isNew, setIsNew] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !passphrase) {
      setError('Please fill in both fields.');
      return;
    }

    const existing = await getUser(username);

    if (isNew) {
      if (existing) {
        setError('Username already exists.');
      } else {
        await saveUser({ username, passphrase });
        login({ username, passphrase });
      }
    } else {
      if (!existing || existing.passphrase !== passphrase) {
        setError('Invalid credentials.');
      } else {
        login({ username, passphrase });
      }
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
      color: '#eee',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        background: '#111',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(255,255,255,0.05)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          {isNew ? 'Create Account' : 'Login'}
        </h2>

        {error && <p style={{ color: 'tomato' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              background: '#222',
              border: '1px solid #444',
              color: '#eee',
              borderRadius: '5px'
            }}
          />

          <input
            type="password"
            placeholder="Passphrase"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              background: '#222',
              border: '1px solid #444',
              color: '#eee',
              borderRadius: '5px'
            }}
          />

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              background: '#444',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {isNew ? 'Create Account' : 'Login'}
          </button>
        </form>

        <p style={{ marginTop: '15px', fontSize: '0.9em', textAlign: 'center' }}>
          {isNew ? 'Already have an account?' : 'New user?'}{' '}
          <span
            onClick={() => {
              setIsNew(!isNew);
              setError('');
            }}
            style={{ color: '#1e90ff', cursor: 'pointer' }}
          >
            {isNew ? 'Login here' : 'Sign up'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
