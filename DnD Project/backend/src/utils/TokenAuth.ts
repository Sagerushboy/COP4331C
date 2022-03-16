import { sign } from "jsonwebtoken";
import { Response } from "express";

/*

Refresh token: long term token used to allow skipping of login until expiry. Also used to get an access token
Access token: short term token used to do authenticated actions like change user settings

Both are generated the same way. Expiry is whatever is set/agreed on.

Access token would be in the header 'authorization' (lowercase is important). Reset it after each request (frontend thing).

Refresh token is saved as an http-only token, meaning that you can only see it when using the specific api path.
Want to regenerate it after every time the user makes a request (todo on frontend).

*/

export function createAccessToken(user: any) {
	return sign(
		{
			username: user.username, // update this if necessary (check todo in CheckAuth)
		},
		process.env.ACCESS_TOKEN!, // need to add in .env file
		{
			expiresIn: "15m",
		}
	);
}

export function createRefreshToken(user: any) {
	return sign(
		{
			username: user.username, // update this if necessary (check todo in CheckAuth)
		},
		process.env.REFRESH_TOKEN!, // need to add in .env file
		{
			expiresIn: "7d",
		}
	);
}

export function sendRefreshToken(res: Response, token: string) {
	// might need to change when doing deployment but good for local testing
	res.cookie("refreshToken", token, {
		httpOnly: true,
		path: "/auth/refreshToken",
		sameSite: "lax",
		secure: true
	});
}
