import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { connect, } from "mongoose";
import cards from './api/cards';
import User from "./models/User";

const env = dotenv.config(); // env variables

let app = express(); // api library

app.use(express.json()); // allow for sending json
app.use(cors()); // allow for cors

app.use("/cards", cards); // all routes will be /cards/{route}

const mongoURI: string = `mongodb+srv://${process.env.ADDRESS}`;

// connection to mongodb based off env and url
connect(mongoURI, {
	auth: {
		username: process.env.USERNAME,
		password: process.env.PASSWORD
	},
	dbName: process.env.DATABASE,
	retryWrites: true,
	w: "majority"
})
	.then(() => console.log("Mongodb connected")) // good
	.catch((err) => {
		// bad
		console.log("Error with db")
		console.error(err)
	});

// add alex user if don't exist
const addUser = async () => {
	let res = await User.find({ username: "alex" }).exec();

	if (res.length <= 0) {
		let newUser = new User({
			username: "alex",
			firstName: "alex",
			lastName: "alex"
		});

		await newUser.save();
	}
}

// adding alex user
addUser().catch(() => console.log("Error with adding new temp user"));

// launching server
app.listen(8080, () => console.log("Server running on port 8080"));