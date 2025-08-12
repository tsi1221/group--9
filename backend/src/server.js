require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('dotenv').config();
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/authRoutes');
// const socialRoutes = require('./routes/socialRoutes');
const profileRoutes = require('./routes/profileRoutes');
app.use(cors());

app.use(cookieParser());
app.use(express.json());

app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/users', profileRoutes);
// app.use('/api/social', socialRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
