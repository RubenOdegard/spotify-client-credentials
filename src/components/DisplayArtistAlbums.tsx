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
    <div className=" col-start-9 col-end-13 row-start-1 row-end-1 relative ">
      <h2 className="mb-1">Albums</h2>

      <div className="h-[50px] w-full bg-gradient-to-t from-gray-950 via-gray-950/30 to-transparent absolute bottom-0 z-40 " />
      {albumData
        ? (
          <div className="grid grid-cols-3 gap-2 justify-items-center overflow-y-scroll h-[400px] pb-6">
            {albumData.items?.map((album: AlbumData) => (
              <div
                key={album.id}
                className="flex flex-col rounded-lg bg-emerald-950 w-full snap-center relative"
              >
                <div className="h-26 w-26 relative">
                  <Image
                    src={album.images[0].url}
                    alt=""
                    height={album.images[0].height}
                    width={album.images[0].width}
                    className="aspect-square rounded-md"
                  />
                  <div className="text-[0.6em] bg-emerald-800 border border-emerald-500 rounded-md p-1 absolute bottom-1 right-1">
                    Total tracks: {album.total_tracks}
                  </div>
                </div>

                <div className="text-xs text-center my-2 text-emerald-300 mx-2 truncate ">
                  {album.name}
                </div>
              </div>
            ))}
          </div>
        )
        : <p>No album data available</p>}
    </div>
  );
};

export default DisplayArtistAlbums;
