import { verify } from "jsonwebtoken";
import { Request, Response } from "express";

/*

This example looks for the username inside the jwt, should change when completing TODO.
TODO: Define jwt shape for when checking authorization.

*/

export default function checkAuth(req: Request, res: Response, next: Function) {
	// extract token from authorization header
	let token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		return res.status(401).json({
			message: "No access token"
		});
	}

	let username = null;

	try {
		let payload: any = verify(token, process.env.ACCESS_TOKEN!);
		username = payload.username;

	} catch (e) {
		return res.status(401).json({
			message: "Error with verifying token"
		});
	}

	if (!username) {
		return res.status(401).json({
			message: "No username in token"
		});
	}

	// Save our username in the locals section so that other routes can use it
	res.locals.username = username;

	// runs the next route if there is one
	// This next function won't run if any of the errors occur
	next();
}