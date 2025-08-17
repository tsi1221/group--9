require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const logOutRoutes = require('./routes/logOutRoutes');
const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');
const profileRoutes = require('./routes/profileRoutes');
const passwordResetRoutes = require('./routes/passwordResetRoutes');

const app = express();

// CORS configuration
const allowedOrigins = ['http://localhost:5173']; // add any domains you want
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like mobile apps, curl, postman)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // allow cookies to be sent
}));

// Middlewares
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', logOutRoutes);
app.use('/api/users', profileRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/password-reset', passwordResetRoutes);
app.use('/admin', require('./routes/adminRoutes'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
