import { Schema, model } from 'mongoose'

// creates data types for mongodb
const CardSchema = new Schema({
	name: String,
	userId: Number,
})

const Card = model('Card', CardSchema);

export default Card; // exporting Card model for finding and other operations