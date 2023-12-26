"use client";

import getSpotifyArtistRelatedArtists from "@/hooks/getSpotifyArtistRelatedArtists";

// need to import types

import Image from "next/image";

const DisplayArtistRelatedArtist = ({ artistID }: { artistID: string }) => {
  const dynamicUrl =
    `https://api.spotify.com/v1/artists/${artistID}/related-artists`;
  const { artistRelatedArtists, loading, error } =
    getSpotifyArtistRelatedArtists(
      dynamicUrl,
    );
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className=" w-full col-span-12 row-start-5 row-span-1">
      {artistRelatedArtists
        ? (
          <>
            <h2 className="mb-1">Related Artists</h2>
            <div className="flex flex-row overflow-x-scroll gap-2 snap snap-x snap-mandatory ">
              {artistRelatedArtists.artistData.artists.map((artist) => (
                <div
                  key={artist.id}
                  className="flex flex-col rounded-lg bg-emerald-950 p-4 w-5/6 snap-center text-center gap-y-1"
                >
                  <div className="h-24 w-24 relative">
                    <Image
                      src={artist.images[0].url}
                      alt=""
                      height={artist.images[0].height}
                      width={artist.images[0].width}
                      className="aspect-square rounded-full border-2 border-emerald-800/20 shadow-inner"
                    />
                    <p className="text-[0.6em] absolute top-0 right-0 bg-emerald-800 border border-emerald-500 rounded-md p-1">
                      {artist.followers.total}
                    </p>
                  </div>

                  <p className="text-xs text-emerald-300">{artist.name}</p>
                  {/* <p className="truncate">{artist.href}</p>*/}
                  <p className="text-xs">{artist.popularity}</p>
                </div>
              ))}
            </div>
          </>
        )
        : <p>No artist data available</p>}
    </div>
  );
};

export default DisplayArtistRelatedArtist;
