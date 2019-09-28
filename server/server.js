const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static('dist'));


//Add new routes above
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(port, () => console.log(`listening from port: ${port}`));