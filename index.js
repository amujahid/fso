const express = require('express')
const app = express()
const cors=require('cors')

app.use(express.static('dist'))
app.use(express.json())

let notes = [
  {
    id: 1,
    content: 'HTML is not easy',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
]
app.use(cors())
app.get('/', (request, response) => {
  response.send('<h1>hello world</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find((n) => n.id === id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).send('No such data found')
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter((n) => n.id != id)
  res.status(204).send('deleted')
})

app.post('/api/notes', (request, response) => {
  const note = request.body
  notes=[...notes,note]
  response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
