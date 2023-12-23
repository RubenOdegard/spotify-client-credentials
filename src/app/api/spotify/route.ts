import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const tokenResponse = await axios.get("/api/token");
    const accessToken = tokenResponse.data.accessToken;

    const artistResponse = await axios.get(
      "https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/albums",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const artistData = artistResponse.data;

    return NextResponse.json({ artistData });
  } catch (error) {
    console.error("Error fetching access token or artist data:", error.message);
    return NextResponse.error();
  }
}
