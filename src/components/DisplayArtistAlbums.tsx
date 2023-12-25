"use client";

import Image from "next/image";
import getSpotifyAlbumData from "@/hooks/getSpotifyAlbumsData";
import { AlbumData } from "@/types/SpotifyAlbumData";

const DisplayArtistAlbums = ({ artistID }: { artistID: string }) => {
  const dynamicUrl = `https://api.spotify.com/v1/artists/${artistID}/albums`;
  const { albumData, loading, error } = getSpotifyAlbumData(dynamicUrl);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4 w-full">
      {albumData
        ? (
          <div className="">
            <h2>Artist Albums</h2>
            <div className="flex flex-row overflow-x-scroll gap-4 snap snap-x snap-mandatory ">
              {albumData.items.map((album: AlbumData) => (
                <div
                  key={album.id}
                  className="flex flex-col rounded-lg bg-gray-900 p-4 w-5/6 snap-center"
                >
                  <Image
                    src={album.images[0].url}
                    alt=""
                    height={album.images[0].height}
                    width={album.images[0].width}
                    className="aspect-square"
                  />
                  <div>ID: {album.id}</div>
                  <div>Album name: {album.name}</div>
                  <div>Total tracks: {album.total_tracks}</div>
                  <div>Release date: {album.release_date}</div>
                </div>
              ))}
            </div>
          </div>
        )
        : <p>No album data available</p>}
    </div>
  );
};

export default DisplayArtistAlbums;
