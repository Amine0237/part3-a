
/*
if (process.argv.length < 3) {
	console.log('give password')
	process.exit(1)
}
*/
// const password = process.argv[2]
// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
require('dotenv').config()

const Note = require('./models/note')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

app.get('/api/notes', (request, response) => {
	Note.find({}).then(notes => {
		response.json(notes)
	})
})

app.get('/api/notes/:id', (request, response) => {
	Note.findById(request.params.id).then(note => {
		response.json(note)
	})
})
/*
app.delete('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id)
	notes = notes.filter((note) => note.id !== id)
	response.status(204).end()
})
*/
app.post('/api/notes', (request, response) => {
	const body = request.body

	if (body.content === undefined) {
		return response.status(400).json({ error: 'content missing' })
	}

	const note = new Note({
		content: body.content,
		important: body.important || false
	})

	note.save().then(savedNote => {
		response.json(savedNote)
	})
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
