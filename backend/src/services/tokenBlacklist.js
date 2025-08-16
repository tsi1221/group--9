let blacklist = [];

function addToken(token, expirySeconds) {
  const expiresAt = Date.now() + expirySeconds * 1000;
  blacklist.push({ token, expiresAt });
}

function isBlacklisted(token) {
  return blacklist.some(t => t.token === token && t.expiresAt > Date.now());
}

module.exports = { addToken, isBlacklisted };
