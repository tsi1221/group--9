
exports.adminDashboard = (req, res) => {
  res.json({ message: 'Admin dashboard' });
};

exports.lawyerDashboard = (req, res) => {
  res.json({ message: 'Lawyer dashboard' });
};

exports.userDashboard = (req, res) => {
  res.json({ message: 'User dashboard' });
};
