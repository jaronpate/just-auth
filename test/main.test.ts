import JustHash from '../src';

describe('Hash Utilities', () => {
  it('hash and validate a correct password', () => {
    const hashed_pass = JustHash.hashPassword('password');
    expect(JustHash.validatePassword('password', hashed_pass)).toBe(true);
  });

  it('hash and validate an incorrect password', () => {
    const hashed_pass = JustHash.hashPassword('password');
    expect(JustHash.validatePassword('notpassword', hashed_pass)).toBe(false);
  });
});
