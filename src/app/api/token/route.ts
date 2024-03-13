import axios, { AxiosError } from "axios";
import querystring from "querystring";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
	try {
		const clientId = process.env.SPOTIFY_CLIENT_ID;
		const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

		const base64Credentials = Buffer.from(
			`${clientId}:${clientSecret}`,
		).toString("base64");

		const payload = querystring.stringify({
			grant_type: "client_credentials",
		});

		const tokenResponse = await axios.post(
			"https://accounts.spotify.com/api/token",
			payload,
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: `Basic ${base64Credentials}`,
				},
			},
		);

		const accessToken = tokenResponse.data.access_token;

		return NextResponse.json({ accessToken });
	} catch (error) {
		console.error(error);
		return NextResponse.json({
			errorMessage: "Error in token route",
			error: AxiosError,
		});
	}
}
