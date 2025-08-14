require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
// const passport = require('passport');
const cors = require('cors');

const app = express();

// Correctly require all route files
const logOutRoutes = require('./routes/logOutRoutes');
const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');
// const socialRoutes = require('./routes/socialRoutes');
const profileRoutes = require('./routes/profileRoutes');
const passwordResetRoutes = require ('./routes/passwordResetRoutes');

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
// app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', logOutRoutes);
app.use('/api/users', profileRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/password-reset', passwordResetRoutes);
// app.use('/api/social', socialRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
