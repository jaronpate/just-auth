import JustAuth from '../src';

describe('Hash Utilities', () => {
  it('hash and validate a correct password', () => {
    const hashed_pass = JustAuth.hashPassword('password');
    expect(JustAuth.validatePassword('password', hashed_pass)).toBe(true);
  });

  it('hash and validate an incorrect password', () => {
    const hashed_pass = JustAuth.hashPassword('password');
    expect(JustAuth.validatePassword('notpassword', hashed_pass)).toBe(false);
  });
});
