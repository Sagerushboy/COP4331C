import { Schema, model } from 'mongoose'

// TODO: Update to reflect actual schema
const SessionSchema = new Schema({
	name: String,
})

const Session = model('Session', SessionSchema);

export default Session;
