import { Schema, model } from 'mongoose'

// TODO: Update to reflect actual schema
const UserSchema = new Schema({
	username: String,
	password: String,
})

const User = model('User', UserSchema);

export default User; 
