const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
// must be first!
app.use(compression());

app.use(express.static(path.join(__dirname, 'public')));

// ...
app.get('*', function (req, res) {
  // and drop 'public' in the middle of here
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

const PORT = process.env.NODE_PORT || 8080;
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
});
