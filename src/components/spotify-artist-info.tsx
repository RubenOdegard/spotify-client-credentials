"use client";

// components/SpotifyArtistInfo.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import type { SpotifyAlbum, SpotifyAlbumData } from "@/types";

const SpotifyArtistInfo = () => {
  const [albumData, setAlbumData] = useState<SpotifyAlbumData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
        const response = await axios.get("/api/spotify");
        const data = response.data;

        setAlbumData(data.artistData);
      } catch (error) {
        console.error("Error fetching album data:", error.message);
      }
    };

    // Fetch data when the component mounts
    fetchData();
  }, []);

  return (
    <div className="p-4">
      {albumData
        ? (
          <div className="">
            <h2 className="py-6">Artist album data:</h2>
            <div className="flex flex-col gap-4">
              {albumData.items.map((album: SpotifyAlbum) => (
                <div
                  key={album.id}
                  className="flex flex-col rounded-lg bg-gray-900 p-4"
                >
                  <div>ID: {album.id}</div>
                  <div>Album name: {album.name}</div>
                  <Image
                    src={album.images[0].url}
                    alt=""
                    height={album.images[0].height}
                    width={album.images[0].width}
                    className="aspect-square max-w-xs"
                  />
                </div>
              ))}
            </div>
            <pre>{JSON.stringify(albumData, null, 2)}</pre>
          </div>
        )
        : <p>Loading...</p>}
    </div>
  );
};

export default SpotifyArtistInfo;
