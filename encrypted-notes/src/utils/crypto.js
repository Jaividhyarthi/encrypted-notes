// utils/crypto.js
import CryptoJS from 'crypto-js';

export const encryptNote = (text, passphrase) => {
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};

export const decryptNote = (cipherText, passphrase) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, passphrase);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted || '[Incorrect Passphrase]';
  } catch (error) {
    return '[Error Decrypting Note]';
  }
};
