const express = require('express')
const database = require('./database.js')
const app = express()

app.use(express.json())

app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

app.get('/api/boxes', async (req, res) => {
  let boxes = await database.boxes.get()
  res.status(200).json(boxes)
})

app.get('/api/boxes/:id', async (req, res) => {
  let box = await database.boxes.find(req.params.id)
  if (box) {
    res.status(200).json(box)
  } else {
    res.status(404).json({ message: 'Item not found' })
  }
})

app.listen(3000, () =>
  console.log(`Ready at http://localhost:3000`)
)
