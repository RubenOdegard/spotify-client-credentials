"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import SpotifyTopTracks from "@/types/SpotifyTopTracks";
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

  return (
    <div className="p-4 w-full ">
      {artistTopTracks
        ? (
          <div>
            <h2>Artist Top Tracks</h2>
            <div className="flex flex-row overflow-x-scroll gap-4 snap snap-x snap-mandatory ">
              {artistTopTracks?.artistData.tracks.map((track) => (
                <div
                  key={track.id}
                  className="flex flex-col rounded-lg bg-gray-900 p-4 w-5/6 snap-center max-w-xs"
                >
                  <Image
                    src={track.album.images[0].url}
                    alt=""
                    height={track.album.images[0].height}
                    width={track.album.images[0].width}
                    className="aspect-square "
                  />

                  <p>Name: {track.name}</p>
                  <p>Duration: {track.duration_ms} ms</p>
                  <p>Release date: {track.album.release_date}</p>
                  <p>Popularity: {track.popularity}</p>
                  <p className="truncate">href: {track.album.href}</p>
                </div>
              ))}
            </div>
          </div>
        )
        : <p>No album data available</p>}
    </div>
  );
};

export default DisplayArtistTopTracks;
