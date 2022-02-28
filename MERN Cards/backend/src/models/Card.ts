import { Schema, model } from 'mongoose'

const CardSchema = new Schema({
	name: String
})

const Card = model('Card', CardSchema);

export default Card;