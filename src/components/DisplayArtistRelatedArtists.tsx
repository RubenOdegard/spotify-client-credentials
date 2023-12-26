"use client";

import getSpotifyArtistRelatedArtists from "@/hooks/getSpotifyArtistRelatedArtists";
import { Progress } from "@/components/ui/progress";

// need to import types

import Image from "next/image";
import { FlameIcon } from "lucide-react";

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
            <div className="flex flex-row overflow-x-scroll gap-2 snap snap-x snap-mandatory relative">
              {artistRelatedArtists.artistData?.artists?.map((artist) => (
                <div
                  key={artist.id}
                  className="flex flex-col rounded-lg bg-emerald-950 p-4 w-[140px] justify-center items-center snap-center text-center gap-y-1 "
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

                  <p className="text-xs text-emerald-300 truncate max-w-[15ch]">
                    {artist.name}
                  </p>
                  {/* <p className="truncate">{artist.href}</p>*/}
                  <div className=" flex gap-1 w-full justify-center items-center relative mt-2">
                    <FlameIcon
                      size={14}
                      className="absolute -top-[3px]  right-1/2 translate-x-1/2 p-0.5 bg-emerald-700 text-emerald-300 fill-emerald-500 rounded-full z-40 border border-emerald-900/10"
                    />{" "}
                    <Progress value={artist.popularity} />
                  </div>
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
