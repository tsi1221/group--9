exports.getProfile = (req, res) => {
  res.json({ user: req.user });
};
