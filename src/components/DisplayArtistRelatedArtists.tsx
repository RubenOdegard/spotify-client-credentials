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
    <div className="p-4 w-full ">
      {artistRelatedArtists
        ? (
          <>
            <h2>Related Artists</h2>
            <div className="flex flex-row overflow-x-scroll gap-4 snap snap-x snap-mandatory ">
              {artistRelatedArtists.artistData.artists.map((artist) => (
                <div
                  key={artist.id}
                  className="flex flex-col rounded-lg bg-gray-900 p-4 w-5/6 snap-center max-w-xs"
                >
                  <Image
                    src={artist.images[0].url}
                    alt=""
                    height={artist.images[0].height}
                    width={artist.images[0].width}
                    className="aspect-square"
                  />

                  <p>Artist: {artist.name}</p>
                  <p className="truncate">{artist.href}</p>
                  <p>Popularity: {artist.popularity}</p>
                  <p>Followers: {artist.followers.total}</p>
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
