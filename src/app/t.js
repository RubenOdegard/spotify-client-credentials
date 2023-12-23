// pages/api/getAccessToken.js

import axios from "axios";
import querystring from "querystring";

export default async (req, res) => {
  try {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

    const base64Credentials = Buffer.from(`${clientId}:${clientSecret}`)
      .toString("base64");

    // Manually encode the payload in URL-encoded format
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

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error fetching access token:", error.message);
    res.status(error.response?.status || 500).json({
      error: "Internal Server Error",
    });
  }
};
