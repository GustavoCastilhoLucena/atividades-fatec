const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const url = 'mongodb://localhost:27017';
const dbName = 'rede_games';

let db;

MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    db = client.db(dbName);
    console.log('Conectado ao MongoDB');
  })
  .catch(err => console.error(err));

app.get('/produtos', async (req, res) => {
  try {
    const produtos = await db.collection('produtos')
      .find({}, { projection: { _id: 0, nome: 1, preco: 1 } })
      .limit(5)
      .toArray();

    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
