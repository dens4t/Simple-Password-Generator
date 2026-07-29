const crypto = require('crypto');

function getRandomString(length, options = {}) {
  const {
    useSpecial = true,
    useNumbers = true,
    useUpper = true,
    useLower = true
  } = options;

  const chars = {};
  if (useSpecial) chars.special = '!@#$%^&*()-=_+`~';
  if (useNumbers) chars.numbers = '0123456789';
  if (useUpper) chars.upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (useLower) chars.lower = 'abcdefghijklmnopqrstuvwxyz';

  let pool = Object.values(chars).join('');
  if (pool.length === 0) pool = 'abcdefghijklmnopqrstuvwxyz'; // fallback

  // Ensure at least one char from each selected category
  const categories = Object.values(chars).filter(c => c.length > 0);
  const result = [];

  // Guarantee one from each category
  categories.forEach(category => {
    const randomIndex = crypto.randomInt(0, category.length);
    result.push(category[randomIndex]);
  });

  // Fill remaining length
  for (let i = result.length; i < length; i++) {
    const randomIndex = crypto.randomInt(0, pool.length);
    result.push(pool[randomIndex]);
  }

  // Fisher-Yates shuffle using crypto
  for (let i = result.length - 1; i > 0; i--) {
    const j = crypto.randomInt(0, i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.join('');
}

module.exports = { getRandomString };
