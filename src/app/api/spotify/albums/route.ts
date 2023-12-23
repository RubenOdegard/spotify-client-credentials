import axios from "axios";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  try {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const tokenResponse = await axios.get("/api/token");
    const accessToken = tokenResponse.data.accessToken;

    const artistResponse = await axios.get(
      url!,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const artistData = artistResponse.data;

    return NextResponse.json({ artistData });
  } catch (error) {
    console.error("Error fetching access token:", error.message);
    return NextResponse.error();
  }
}
