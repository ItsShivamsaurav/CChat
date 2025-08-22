const JWT = require("jsonwebtoken");
const secret = "$hivam$aurav2028";

function createTokenForUser(user) {
  const payload = {
    id: user.userId,
    name: user.name,
    email: user.email,
  };
  const token = JWT.sign(payload, secret);
  return token;
}

function validateToken(token) {
  try {
    const payload = JWT.verify(token, secret);
    return payload;
  } catch (e) {
    console.log("Unverified user.");
    return null;
  }
}

module.exports = { createTokenForUser, validateToken };
