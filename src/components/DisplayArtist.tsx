"use client";

import useSpotifyArtist from "@/hooks/useSpotifyArtist";
import Image from "next/image";

const DisplayArtist = ({ artistID }: { artistID: string }) => {
  const dynamicUrl = `https://api.spotify.com/v1/artists/${artistID}`;
  const { artistData, loading, error } = useSpotifyArtist(dynamicUrl);

  if (loading) {
    return (
      <span className="col-span-12 row-span-4 xl:col-start-1 xl:col-span-4  max-w-[400px] max-h-[400px] bg-emerald-950 animate-pulse rounded-md">
      </span>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="w-full col-span-12  xl:col-start-1 xl:col-span-4 row-span-4 max-w-[400px] group">
      {artistData
        ? (
          <>
            <h2 className="font-bold text-xl mb-4">
              {artistData.artistData.name}
            </h2>
            <div className="flex flex-row gap-4 ">
              <div className="flex flex-col rounded-md bg-emerald-900 w-full">
                <div className="relative h-full max-h-[410px] overflow-clip">
                  <Image
                    src={artistData.artistData.images[0].url}
                    alt=""
                    quality={75}
                    priority={true}
                    height={artistData.artistData.images[0].height}
                    width={artistData.artistData.images[0].width}
                    className="h-full shadow-md rounded-md md:invert-0 md:group-hover:saturate-150 md:group-hover:scale-125 md:group-hover:rotate-12 transition-all duration-1000 ease-out border border-emerald-950"
                  />
                </div>
              </div>
            </div>
          </>
        )
        : <p>No artist data available</p>}
    </div>
  );
};

export default DisplayArtist;
