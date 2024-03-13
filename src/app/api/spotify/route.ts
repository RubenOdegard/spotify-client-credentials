import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function refreshToken() {
	try {
		const tokenResponse = await axios.get("/api/token");
		const accessToken = tokenResponse.data?.accessToken;
		return accessToken;
	} catch (error) {
		console.error("Error refreshing token:", error);
		throw new Error("Failed to refresh access token");
	}
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const url = searchParams.get("url");

	try {
		axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

		let accessToken = null;
		try {
			accessToken = await refreshToken();
		} catch (refreshError) {
			console.error("Error refreshing token:", refreshError);
			return NextResponse.json(
				{ error: AxiosError },
				{
					status: 401,
				},
			);
		}

		const artistResponse = await axios.get(url!, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		const artistData = artistResponse.data;

		return NextResponse.json({ artistData });
	} catch (error) {
		console.error(error);
		return NextResponse.json({
			errorMessage: "Error in Spotify Route",
			error: error,
		});
	}
}
