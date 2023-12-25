"use client";

import getSpotifyArtist from "@/hooks/getSpotifyArtist";
import SpotifyArtistData from "@/types/SpotifyArtist";
import Image from "next/image";

const DisplayArtist = ({ artistID }: { artistID: string }) => {
  const dynamicUrl = `https://api.spotify.com/v1/artists/${artistID}`;
  const { artistData, loading, error } = getSpotifyArtist(dynamicUrl);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4 w-full max-w-xs">
      {artistData
        ? (
          <>
            <h2>Artist</h2>
            <div className="flex flex-row overflow-x-scroll gap-4 snap snap-x snap-mandatory ">
              <div className="flex flex-col rounded-lg bg-gray-900 p-4 w-5/6 snap-center">
                <p>Name: {artistData.artistData.name}</p>
                <p>Popularity: {artistData.artistData.popularity}</p>

                <Image
                  src={artistData.artistData.images[0].url}
                  alt=""
                  height={artistData.artistData.images[0].height}
                  width={artistData.artistData.images[0].width}
                  className="aspect-square"
                />
              </div>
            </div>
          </>
        )
        : <p>No artist data available</p>}
    </div>
  );
};

export default DisplayArtist;
