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
    <div className="w-full col-start-1 col-span-4 row-span-1 max-w-[400px]">
      {artistData
        ? (
          <>
            <h2 className="font-bold">{artistData.artistData.name}</h2>
            <div className="flex flex-row gap-4 ">
              <div className="flex flex-col rounded-md bg-emerald-900 w-full">
                {
                  /* <p>Popularity: {artistData.artistData.popularity}</p>
                  */
                }
                <div className="relative h-full max-h-[410px]">
                  <Image
                    src={artistData.artistData.images[0].url}
                    alt=""
                    height={artistData.artistData.images[0].height}
                    width={artistData.artistData.images[0].width}
                    className="h-full shadow-md rounded-md "
                  />
                </div>
              </div>
            </div>
          </>
        )
        : <p>No artist data available</p>}
    </div>
  );
};

export default DisplayArtist;
