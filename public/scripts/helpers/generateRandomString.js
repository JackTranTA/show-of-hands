const generateRandomString = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let string = '';
  for (let i = 0; i < 6; i++) {
    string += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return string;
};

module.exports = { generateRandomString };
