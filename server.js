const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get talks data
app.get('/api/talks', (req, res) => {
  const talksPath = path.join(__dirname, 'data', 'talks.json');
  fs.readFile(talksPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading talks data');
      return;
    }
    res.json(JSON.parse(data));
  });
});


// For any other request, serve index.html
app.use((req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});