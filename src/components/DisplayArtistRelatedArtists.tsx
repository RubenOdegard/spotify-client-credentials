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

  const dynamicUrl =
    `https://api.spotify.com/v1/artists/${artistID}/related-artists`;
  const { artistRelatedArtists, loading, error } =
    useSpotifyArtistRelatedArtists(dynamicUrl);

  if (loading) {
    return (
      <span className="col-span-12 row-span-1 row-start-5 animate-pulse rounded-md bg-emerald-950">
      </span>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="row-start-8 group col-span-12 row-span-1 w-full">
      {artistRelatedArtists
        ? (
          <>
            <h2 className="mb-4 flex items-center gap-2 font-semibold">
              <UsersIcon size={18} className="text-emerald-500" />
              Related Artists
            </h2>
            <div className="snap relative flex cursor-pointer snap-x snap-mandatory flex-row gap-2 overflow-x-scroll pb-2">
              {artistRelatedArtists.artistData?.artists?.map((
                artist: Artist,
              ) => (
                // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                <div
                  key={artist.id}
                  className="flex flex-col items-center justify-center gap-y-1.5 rounded-md border border-emerald-950 bg-emerald-950 p-4"
                  onClick={() => handleRelatedArtistClick(artist.id)}
                >
                  <div className="relative h-24 w-24">
                    <Image
                      src={artist.images[0].url}
                      alt=""
                      quality={25}
                      height={artist.images[0].height}
                      width={artist.images[0].width}
                      className="aspect-square rounded-full border-2 border-emerald-800/20 shadow-inner duration-500 md:grayscale md:group-hover:grayscale-0"
                    />
                    <p className="absolute right-0 top-0 rounded-md border border-emerald-500 bg-emerald-800/90 px-1 py-0.5 text-[0.6em]">
                      {nFormatter(artist.followers.total, 1)}
                    </p>
                  </div>

                  <p className="max-w-[15ch] truncate text-xs text-emerald-300">
                    {artist.name}
                  </p>
                  <div className="relative mt-0.5 flex w-full items-center justify-center gap-1">
                    <div className="absolute -left-[1px] top-0 z-40 flex aspect-square h-3 w-3 items-center justify-center rounded-l-full text-red-800">
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
        )
        : <p>No artist data available</p>}
    </div>
  );
};

export default DisplayArtistRelatedArtist;
