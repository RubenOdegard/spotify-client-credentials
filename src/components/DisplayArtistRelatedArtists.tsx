"use client";

import { Progress } from "@/components/ui/progress";
import useSpotifyArtistRelatedArtists from "@/hooks/useSpotifyArtistRelatedArtists";
import { nFormatter } from "@/lib/utils";

import { useArtist } from "./ArtistContext";

import { FlameIcon, UsersIcon } from "lucide-react";
import Image from "next/image";
import { Artist } from "@/types/SpotifyArtistRelatedArtists";

const DisplayArtistRelatedArtist = ({ artistID }: { artistID: string }) => {
  const { artistID: contextArtistID, handleRelatedArtistClick } = useArtist();

  const dynamicUrl = `https://api.spotify.com/v1/artists/${artistID}/related-artists`;
  const { artistRelatedArtists, loading, error } =
    useSpotifyArtistRelatedArtists(dynamicUrl);

  if (loading) {
    return (
      <span className="col-span-12 row-start-5 row-span-1 bg-emerald-950 animate-pulse rounded-md"></span>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="w-full col-span-12 row-start-8 row-span-1 group">
      {artistRelatedArtists ? (
        <>
          <h2 className="mb-4 flex items-center gap-2 font-semibold">
            <UsersIcon size={18} className="text-emerald-500" />
            Related Artists
          </h2>
          <div className="flex flex-row overflow-x-scroll gap-2 snap snap-x snap-mandatory relative cursor-pointer">
            {artistRelatedArtists.artistData?.artists?.map((artist: Artist) => (
              // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
              <div
                key={artist.id}
                className="p-4 bg-emerald-950 rounded-md flex flex-col items-center justify-center gap-y-1.5 border border-emerald-950"
                onClick={() => handleRelatedArtistClick(artist.id)}
              >
                <div className="h-24 w-24 relative">
                  <Image
                    src={artist.images[0].url}
                    alt=""
                    quality={25}
                    height={artist.images[0].height}
                    width={artist.images[0].width}
                    className="aspect-square rounded-full border-2 border-emerald-800/20 shadow-inner md:grayscale md:group-hover:grayscale-0 duration-500"
                  />
                  <p className="text-[0.6em] absolute top-0 right-0 bg-emerald-800/90 border border-emerald-500 rounded-md px-1 py-0.5">
                    {nFormatter(artist.followers.total, 1)}
                  </p>
                </div>

                <p className="text-xs text-emerald-300 truncate max-w-[15ch]">
                  {artist.name}
                </p>
                <div className="flex gap-1 w-full justify-center items-center relative mt-0.5">
                  <div className="absolute top-0 -left-[1px] z-40 h-3 w-3 rounded-l-full flex justify-center items-center text-red-800 aspect-square">
                    <FlameIcon
                      size={12}
                      className="ml-1 fill-red-500 text-red-400"
                    />
                  </div>{" "}
                  <Progress value={artist.popularity} />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No artist data available</p>
      )}
    </div>
  );
};

export default DisplayArtistRelatedArtist;
