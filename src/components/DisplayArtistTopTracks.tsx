"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import getSpotifyArtistTopTracks from "@/hooks/getSpotifyArtistTopTracks";

const DisplayArtistTopTracks = ({ artistID }: { artistID: string }) => {
  const dynamicUrl =
    `https://api.spotify.com/v1/artists/${artistID}/top-tracks?market=NO`;

  const { artistTopTracks, loading, error } = getSpotifyArtistTopTracks(
    dynamicUrl,
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const formatDuration = (duration_ms: number) => {
    const minutes = Math.floor(duration_ms / 60000);
    const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${+seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Slice the array to get only the first 6 tracks
  const displayedTracks = artistTopTracks?.artistData.tracks.slice(0, 6) || [];

  return (
    <div className="col-span-3 col-start-4 col-end-8 row-start-1 row-end-1  h-[325px]  ">
      {displayedTracks.length > 0
        ? (
          <div className="grid grid-cols-3 grid-flow-auto gap-2 justify-items-center">
            {displayedTracks.map((track) => (
              <div
                key={track.id}
                className="flex flex-col  rounded-lg bg-emerald-950 w-full snap-center relative "
              >
                <div className="h-26 w-26 relative">
                  <Image
                    src={track.album.images[0].url}
                    alt=""
                    height={track.album.images[0].height}
                    width={track.album.images[0].width}
                    className="aspect-square rounded-md"
                  />
                  <p className="text-[0.6em] bg-emerald-800 border border-emerald-500 rounded-md p-1 absolute bottom-1 right-1">
                    {formatDuration(track.duration_ms)}
                  </p>
                </div>

                <p className="text-xs text-center my-2 text-emerald-300">
                  {track.name}
                </p>
                {
                  /*  <p className="absolute top-0">{track.popularity}</p>
 */
                }
              </div>
            ))}
          </div>
        )
        : <p>No album data available</p>}
    </div>
  );
};

export default DisplayArtistTopTracks;
