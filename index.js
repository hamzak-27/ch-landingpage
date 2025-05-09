// This is a simple express server to handle redirects
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the main directory
app.use(express.static(path.join(__dirname, 'candid_project')));

// Redirect root to the main index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'candid_project/www.joincandidhealth.com/index.html'));
});

// For any other route, try to find it in the www directory first
app.get('*', (req, res) => {
  const wwwPath = path.join(__dirname, 'candid_project/www.joincandidhealth.com', req.path);
  res.sendFile(wwwPath, (err) => {
    if (err) {
      // If not found in www directory, try to find it in the candid_project root
      res.sendFile(path.join(__dirname, 'candid_project', req.path), (err) => {
        if (err) {
          // If still not found, return 404
          res.status(404).send('Not found');
        }
      });
    }
  });
});

// Use the port provided by Vercel or default to 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 