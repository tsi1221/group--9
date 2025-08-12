exports.getProfile = (req, res) => {
  res.json(req.user);
};
