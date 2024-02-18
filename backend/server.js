const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3001;

const url = 'mongodb://localhost:27017'; //REPLACE THIS WITH THE CONNECTION URL OF UR MONGODB
const dbName = 'myDatabase'; // REPLACE THIS WITH DB NAME

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;

  const db = client.db(dbName);
  
  //ROUTE FOR GETTING IMAGE
  app.get('/image', (req, res) => {
    db.collection('images').findOne({}, (err, result) => {
      if (err) throw err;
      res.json(result.imageUrl);
    });
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});