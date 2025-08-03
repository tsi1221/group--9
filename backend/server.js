const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the homepage!</h1>');
});

app.get('/about', (req, res) => {
  res.send('<h1>About Us</h1><p>This is the about page of our Node.js Express app.</p>');
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
