import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { connect, } from "mongoose";

const env = dotenv.config();

let app = express();

app.use(express.json());
app.use(cors());

const mongoURI: string =
	`mongodb://${process.env.ADDRESS}:${process.env.PORT}`;

connect(mongoURI, {
	auth: {
		username: process.env.USERNAME,
		password: process.env.PASSWORD
	},
	authSource: "admin",
	dbName: process.env.DATABASE,
})
	.then(() => console.log("Mongodb connected"))
	.catch((err) => {
		console.log("Error with db")
		console.error(err)
	});

app.listen(8080, () => console.log("Server running on port 8080"));