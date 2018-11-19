const express = require('express');
const app = express();

app.listen(8080, function() {
  console.log('listening on 8080')
})

app.get('/', (req, res) => {
  // res.sendFile('Client/src/index.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})
