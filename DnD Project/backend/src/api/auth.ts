import { Router } from "express";
import { verify } from "jsonwebtoken";
import User from "../models/User";
import { sendRefreshToken, createAccessToken, createRefreshToken } from "../utils/TokenAuth";

const router = Router();

router.get("/refreshToken", async (req, res) => {
	const { refreshToken } = req.cookies;
	let payload = null;

	if (!refreshToken) {
		return res.status(401).json({
			message: "No refresh token provided"
		});
	}

	try {
		payload = verify(refreshToken, process.env.REFRESH_TOKEN!);
	} catch (err) {
		console.error(err);
		return res.status(401).json({ accessToken: "", error: "Error with verifying payload" });
	}

	const { username } = payload as any; // change any to payload shape

	if (!username) {
		return res.status(401).json({ accessToken: "", error: "No username in payload" });
	}

	const user = await User.findOne({ username }).exec();

	if (!user) {
		return res.status(401).json({ accessToken: "", error: "No user found" });
	}

	sendRefreshToken(res, createRefreshToken(user));

	res.json({
		accessToken: createAccessToken(user)
	});
});

router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	if (!username) {
		return res.status(400).json({ error: "Username does not exist" });
	}

	let data = await User.findOne({ username, password }).exec();

	// only username in user collection of mongodb
	if (data) {
		res.status(200).json({
			data,
			accessToken: createAccessToken(data)
		});
	} else {
		return res.status(400).json({ error: "Invalid user info" });
	}

	sendRefreshToken(res, createRefreshToken(data));
});

router.post("/signup", async (req, res) => {
	const { username, password } = req.body;
	if ([username, password].some(item => item === null || item === undefined)) {
		return res.status(400).json({ error: "Sign up info does not exist" });
	}

	let data = await User.findOne({ username }).exec();

	if (data) {
		return res.status(400).json({ error: "Username already exists" });
	} else {
		res.status(200).json({
			accessToken: createAccessToken(data)
		});
	}

	sendRefreshToken(res, createRefreshToken(data));
});

export default router;