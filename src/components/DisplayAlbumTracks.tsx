"use client";

import useSpotifyAlbumTracks from "@/hooks/useSpotifyAlbumsTracks";
import SpotifyAlbumTracks, { Item } from "@/types/SpotifyAlbumTracks";

const DisplayArtistAlbums = ({ albumID }: { albumID: string }) => {
  const dynamicUrl = `https://api.spotify.com/v1/albums/${albumID}/tracks`;
  const { albumTracks, loading, error } = useSpotifyAlbumTracks(dynamicUrl);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4 w-full">
      {albumTracks
        ? (
          <>
            <h2>Album Tracks</h2>
            <ul className="flex flex-row overflow-x-scroll gap-4 snap snap-x snap-mandatory ">
              {albumTracks.artistData.items.map((track: Item) => (
                <li
                  key={track.id}
                  className="flex flex-col rounded-lg bg-gray-900 p-4 w-5/6 snap-center"
                >
                  <p>{track.name}</p>
                  <p>{track.href}</p>
                  <p>{}</p>
                </li>
              ))}
            </ul>
          </>
        )
        : <p>No album data available</p>}
    </div>
  );
};

export default DisplayArtistAlbums;
