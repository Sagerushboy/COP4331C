import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
	username: String,
	firstName: String,
	lastName: String,
})

const User = model('User', UserSchema);

export default User;  // exporting User model for finding and other operations