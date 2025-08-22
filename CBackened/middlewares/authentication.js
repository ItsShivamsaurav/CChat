const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  // console.log("Checking for authentication cookie:", cookieName);
  return (req, res, next) => {
    // console.log(req.cookies.authToken);
    const tokenCookieValue = req.cookies.authToken;
    console.log("Token cookie value:", tokenCookieValue);
    if (!tokenCookieValue) {
      return next();
    }
    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
      console.log("Cookie authenticated:", req.user);
      next();
    } catch (e) {
      console.error("Authentication failed:", e);
      return res.status(403).json({ error: "Invalid token" });
    }
  };
}

module.exports = { checkForAuthenticationCookie };
