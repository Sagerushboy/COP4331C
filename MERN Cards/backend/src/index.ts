import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { connect, } from "mongoose";
import cards from './api/cards';
import User from "./models/User";

const env = dotenv.config();

let app = express();

app.use(express.json());
app.use(cors());

app.use("/cards", cards);

const mongoURI: string =
	`mongodb+srv://${process.env.ADDRESS}`;

connect(mongoURI, {
	auth: {
		username: process.env.USERNAME,
		password: process.env.PASSWORD
	},
	dbName: process.env.DATABASE,
	retryWrites: true,
	w: "majority"
})
	.then(() => console.log("Mongodb connected"))
	.catch((err) => {
		console.log("Error with db")
		console.error(err)
	});

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

addUser().catch(() => console.log("Error with adding new temp user"));
app.listen(8080, () => console.log("Server running on port 8080"));