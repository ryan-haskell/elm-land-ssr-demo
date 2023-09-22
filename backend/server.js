const path = require('path')
const express = require('express')
const database = require('./database.js')
const ElmLand = require('./elm-land.js')
const app = express()


// 1️⃣ Basic logging for the terminal
app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})


// 2️⃣ Your standard JSON REST API endpoints
app.use(express.json())

app.get('/api/boxes', async (req, res) => {
  let boxes = await database.boxes.get()
  res.status(200).json(boxes)
})

app.get('/api/boxes/:id', async (req, res) => {
  let box = await database.boxes.find(req.params.id)
  if (box) { res.status(200).json(box) }
  else { res.status(404).json({ message: 'Box not found' }) }
})


// 3️⃣ Handles static files
app.get('/main.js', (req, res) => res.send(ElmLand.toMainJs()))
app.use(express.static(path.join(__dirname, '..', 'dist')))
app.use(express.static(path.join(__dirname, '..', 'static')))


// 4️⃣ Customize meta tags for the homepage, boxes page, and more!
app.get('/', async (req, res) => {
  res.send(ElmLand.toIndexHtml({
    title: 'Elm Land SEO',
    meta: [
      { name: 'description', content: 'This is the homepage!' }
    ],
    link: [],
    script: []
  }))
})

app.get('/boxes', async (req, res) => {
  let boxes = await database.boxes.get()

  res.send(ElmLand.toIndexHtml({
    title: 'Boxes | Elm Land SEO',
    meta: [
      { name: 'description', content: `Search through our catalog of ${boxes.length} boxes!` }
    ],
    link: [],
    script: []
  }))
})

app.get('/boxes/:id', async (req, res, next) => {
  // Fetch metadata about a box
  let box = await database.boxes.find(req.params.id)

  if (box) {
    // Send that through as meta tags
    res.send(ElmLand.toIndexHtml({
      title: `${box.name} | Elm Land SEO`,
      meta: [
        { name: 'description', content: box.description }
      ],
      link: [],
      script: []
    }))
  }
  else {
    next()
  }
})


// 5️⃣ Catch-all route to show your Elm Land app
app.get('*', async (req, res) => {
  res.send(ElmLand.toIndexHtml({
    title: undefined,
    meta: [],
    link: [],
    script: []
  }))
})


// 6️⃣ Start the server
let port = process.env.PORT || 3000
app.listen(port, () => console.log(`Ready at http://localhost:${port}`))
