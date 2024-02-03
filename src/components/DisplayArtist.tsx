"use client";

import useSpotifyArtist from "@/hooks/useSpotifyArtist";
import { nFormatter } from "@/lib/utils";
import Image from "next/image";
import { Progress } from "./ui/progress";
import { FlameIcon } from "lucide-react";

const DisplayArtist = ({ artistID }: { artistID: string }) => {
  const dynamicUrl = `https://api.spotify.com/v1/artists/${artistID}`;
  const { artistData, loading, error } = useSpotifyArtist(dynamicUrl);

  if (loading) {
    return (
      <span className="col-span-12 row-span-4 max-h-[400px] max-w-[400px]  animate-pulse rounded-md bg-emerald-950 xl:col-span-4 xl:col-start-1">
      </span>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  const UppercaseFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="group col-span-12  row-span-4 w-full max-w-[400px] border-b-2 border-emerald-950 pb-6 xl:col-span-4 xl:col-start-1">
      {artistData
        ? (
          <>
            <div className="flex flex-row gap-4 ">
              <div className="flex w-full flex-col rounded-md bg-emerald-900">
                <div className="relative h-full overflow-clip">
                  <Image
                    src={artistData.artistData.images[0].url}
                    alt=""
                    quality={75}
                    priority={true}
                    height={artistData.artistData.images[0].height}
                    width={artistData.artistData.images[0].width}
                    className=" h-full rounded-md border border-emerald-950 shadow-md transition-all duration-1000 ease-out md:invert-0 md:group-hover:rotate-12 md:group-hover:scale-125 md:group-hover:saturate-150"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between py-6">
              <h2 className="text-xl font-bold">
                {artistData.artistData.name}
              </h2>
              <p className="rounded-md border border-emerald-500 bg-emerald-800/90 px-1 py-0.5 text-sm">
                {nFormatter(artistData.artistData.followers.total, 1)}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="flex flex-wrap gap-2">
                {artistData.artistData.genres.map((genre) => {
                  return (
                    <span
                      key={genre}
                      className="rounded-md bg-emerald-900 px-2.5 py-1 text-xs"
                    >
                      {UppercaseFirstLetter(genre)}
                    </span>
                  );
                })}
              </p>
            </div>
          </>
        )
        : <p>No artist data available</p>}
    </div>
  );
};

export default DisplayArtist;
