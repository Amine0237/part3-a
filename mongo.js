const mongoose = require('mongoose')
/*
if (process.argv.length < 3) {
	console.log('give password as argument')
	process.exit(1)
}
*/
const password = '9alwa9ALWA'
const dbName = 'noteApp'

const url =
  `mongodb+srv://fullstack:${password}@cluster0.1irz8b4.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
	content: String,
	important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
	content: 'MongoDB is a noSQL db',
	important: false
})

note.save().then(result => {
	console.log('note saved!')
	mongoose.connection.close()
})

/*
Note.find({}).then(result => {
	result.forEach(note => {
		console.log(note.content)
	})
	mongoose.connection.close()
})
*/
