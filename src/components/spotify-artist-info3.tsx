"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const SpotifyArtistInfo = () => {
  const [artistData, setArtistData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
        const response = await axios.get("/api/spotify");
        const data = response.data;

        setArtistData(data.artistData);
      } catch (error) {
        console.error("Error fetching artist data:", error.message);
      }
    };

    // Fetch data when the component mounts
    fetchData();
  }, []);

  return (
    <div className="p-4">
      {artistData
        ? (
          <div className="">
            <h2 className="py-6">Artist album data:</h2>
            <div className="flex flex-col gap-4">
              {artistData.items.map((artist) => (
                <div
                  key={artist.id}
                  className="flex flex-col rounded-lg bg-gray-900 p-4"
                >
                  <div>ID: {artist.id}</div>
                  <div>Album name: {artist.name}</div>
                  <div>Image: {JSON.stringify(artist.images[0])}</div>
                  <Image
                    src={artist.images[0].url}
                    alt=""
                    height={artist.images[0].height}
                    width={artist.images[0].width}
                    className="aspect-square max-w-xs"
                  />
                </div>
              ))}
            </div>
            <pre>{JSON.stringify(artistData, null, 2)}</pre>
          </div>
        )
        : <p>Loading...</p>}
    </div>
  );
};

export default SpotifyArtistInfo;
