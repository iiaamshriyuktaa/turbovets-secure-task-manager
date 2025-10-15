// Polyfill for globalThis.crypto.hash when missing (used by Vite)
// This file is required early via NODE_OPTIONS --require
try {
  const nodeCrypto = require('crypto');
  if (typeof globalThis.crypto === 'undefined') {
    globalThis.crypto = nodeCrypto.webcrypto || {};
  }

  if (typeof globalThis.crypto.hash !== 'function') {
    // Provide a Promise-based hash(algorithm, data) -> Promise<ArrayBuffer>
    globalThis.crypto.hash = (algorithm, data) => {
      return new Promise((resolve, reject) => {
        try {
          const hash = nodeCrypto.createHash(algorithm);
          // data may be ArrayBuffer, Uint8Array, Buffer or string
          if (data instanceof ArrayBuffer) {
            hash.update(Buffer.from(new Uint8Array(data)));
          } else if (ArrayBuffer.isView(data)) {
            hash.update(Buffer.from(data.buffer, data.byteOffset, data.byteLength));
          } else if (Buffer.isBuffer(data)) {
            hash.update(data);
          } else {
            hash.update(String(data));
          }

          const digest = hash.digest();
          // convert Buffer to ArrayBuffer
          const ab = digest.buffer.slice(digest.byteOffset, digest.byteOffset + digest.byteLength);
          resolve(ab);
        } catch (err) {
          reject(err);
        }
      });
    };
  }
} catch (e) {
  // ignore — if this fails, the original error will surface
}
