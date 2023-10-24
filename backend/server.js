const express = require('express')
const cors = require('cors');
const data = require('./data.json')

const port = 3000

const app = express()
app.use(cors({
  origin: 'http://localhost:5173',
}));

app.get('/', async (req, res) => {
  setTimeout(() => {
    res.send(data);
  }, 1300);
})

app.get('/:type', (req, res) => {
  const file = data.filter((f) => f.type === req.params.type);

  setTimeout(() => {
    if (file) {
      res.json(file);
    } else {
      res.status(404).json({ error: 'File not found' });
    }
  }, 1300);
});

app.get('/:type/:id', (req, res) => {
  const fileId = parseInt(req.params.id);
  const file = data.find((f) => f.id === fileId && f.type === req.params.type);

  setTimeout(() => {
    if (file) {
      res.json(file);
    } else {
      res.status(404).json({ error: 'File not found' });
    }
  }, 1300);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
