import { Schema, model } from 'mongoose'

// TODO: Update to reflect actual schema
const CharacterSchema = new Schema({
	name: String,
})

const Character = model('Character', CharacterSchema);

export default Character;
