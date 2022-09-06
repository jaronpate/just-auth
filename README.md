## JustHash

This is a very simple library that abstracts password hashing for you. There are no dependencies; it uses the crypto module built into node.

[![CI](https://github.com/jaronpate/just-hash/actions/workflows/main.yml/badge.svg)](https://github.com/jaronpate/just-hash/actions/workflows/main.yml)

```typescript
import JustHash from 'just-hash';

// This is safe to store in your DB of choice.
// It contains both the salt and hashed value.
const hashed_password = JustHash.hashPassword('password');

// Use validatePassword() to check values against the hash
JustHash.validatePassword('password', hashed_password); // returns true
JustHash.validatePassword('incorrect', hashed_password); // returns false
```

```typescript
import JustHash, { HashAlgorithm, TextEncoding } from 'just-hash';

// This is how you would configure the behavior of the library if you so wish.
// This is optional as the library will initialize with default values which
// are perfectly fine to use in most cases.
// What you see below is the default configuration.
JustHash.configure({
    hash_algorithm: HashAlgorithm.sha512;   // algorithm used when hashing data
    output_type: TextEncoding.hex;          // output format of hashed data
    salt_length: 16;                        // number of byte to salt with
    key_length: 64;                         // length to hash passwords to
});
```

For use in Vanilla JS: `const JustHash = require('../dist/index.js').default;`