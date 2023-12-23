"use client";

import Image from "next/image";
import getAlbums from "@/hooks/getAlbums";

const SpotifyArtistInfo = () => {
  const { albumData, loading, error } = getAlbums();

  return (
    <div className="p-4">
      {albumData
        ? (
          <div className="">
            <h2 className="py-6">Artist album data:</h2>
            <div className="flex flex-col gap-4">
              {albumData.items.map((album) => (
                <div
                  key={album.id}
                  className="flex flex-col rounded-lg bg-gray-900 p-4"
                >
                  <div>ID: {album.id}</div>
                  <div>Album name: {album.name}</div>
                  <div>Image: {JSON.stringify(album.images[0])}</div>
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
        : <p>{loading ? "Loading..." : error || "No album data available."}</p>}
    </div>
  );
};

export default SpotifyArtistInfo;
