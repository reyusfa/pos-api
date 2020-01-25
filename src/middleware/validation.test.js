const {
  usernameIsValid,
  nameIsValid,
  usernameIsExists,
  emailIsExists
} = require('./validation');

test('Name is valid', () => {
  expect(nameIsValid('user')).toBe(true);
});

// test(`Username use less than 5 characters`, () => {
//   expect(usernameIsValid('user')).toBe(true);
// });

// test(`Username use more than 20 characters`, () => {
//   expect(usernameIsValid('abcdefghijklmnopqrstu')).toBe(true);
// });

// test(`Username use more than one separator in a row`, () => {
//   expect(usernameIsValid('admin__123')).toBe(true);
// });

// test(`Username start with separator`, () => {
//   expect(usernameIsValid('_admin')).toBe(true);
// });

// test(`Username end with separator`, () => {
//   expect(usernameIsValid('admin_')).toBe(true);
// });

// test(`Username use characters other than alphanumerics and allowed separator`, () => {
//   expect(usernameIsValid('ad@min')).toBe(true);
// });

// test(`Username is exists`, () => {
//   const fetchData = () => {
//     return usernameIsExists('admin');
//   };
//   return expect(fetchData()).resolves.toBe(true);
// });

// test(`Email is exists`, () => {
//   const fetchData = () => {
//     return emailIsExists('admin@email.com');
//   };
//   return expect(fetchData()).resolves.toBe(true);
// });
