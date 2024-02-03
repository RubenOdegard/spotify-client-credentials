"use client";

import Image from "next/image";
import useSpotifyAlbumData from "@/hooks/useSpotifyAlbumData";
import { AlbumData } from "@/types/SpotifyAlbumData";
import { DiscAlbum, Music } from "lucide-react";
import Modal from "./Modal";
import { useState } from "react";
import Link from "next/link";
import DataContainer from "./DataContainer";
import TitleContainer from "./TitleContainer";
import DisplayAlbumFeatures from "./DisplayAlbumFeatures";

const DisplayArtistAlbums = ({ artistID }: { artistID: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumData | null>(null);

  const dynamicUrl = `https://api.spotify.com/v1/artists/${artistID}/albums`;
  const { albumData, loading, error } = useSpotifyAlbumData(dynamicUrl);

  if (loading) {
    return (
      <span className="col-span-12 row-span-4 max-h-[400px] max-w-[400px]  animate-pulse rounded-md bg-emerald-950 xl:col-span-4 xl:col-start-9" />
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleAlbumHover = (index: number | null) => {
    setHoveredIndex(index);
  };

  const handleAlbumClick = (Album: AlbumData) => {
    setSelectedAlbum(Album);
    setIsModalOpen(true);
  };

  return (
    <div className="group relative col-span-12 col-start-1">
      {isModalOpen && selectedAlbum && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="grid grid-cols-1  gap-x-8 ">
            <Link
              href={selectedAlbum.external_urls.spotify}
              className="col-span-2 place-self-center"
            >
              <Image
                src={selectedAlbum.images[0].url}
                alt=""
                quality={25}
                height={selectedAlbum.images[0].height}
                width={selectedAlbum.images[0].width}
                className="mb-4 aspect-square max-h-[300px] max-w-[300px] rounded-md border-b border-emerald-900 shadow-md"
              />
            </Link>

            <div className="col-span-2 flex max-w-[300px] flex-col gap-2.5 py-4 md:col-span-1 md:py-8">
              <DisplayAlbumFeatures selectedAlbum={selectedAlbum} />
            </div>
          </div>
        </Modal>
      )}

      <h2 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
        <DiscAlbum size={18} className="text-emerald-500" />
        Albums
      </h2>

      {albumData
        ? (
          <div className="flex snap-x snap-proximity flex-nowrap justify-items-center gap-3 overflow-x-scroll pb-2">
            {albumData.items?.map((album: AlbumData, index) => (
              // biome-ignore lint/a11y/useKeyWithClickEvents: lazy ignore, replace with button?
              <div
                key={album.id}
                className="relative flex w-full min-w-[200px] cursor-pointer snap-start flex-col rounded-lg border border-emerald-950 bg-emerald-950"
                onClick={() => handleAlbumClick(album)}
                onMouseEnter={() => handleAlbumHover(index)}
                onMouseLeave={() => handleAlbumHover(null)}
              >
                <div className="h-26 w-26 relative">
                  <Image
                    src={album.images[0].url}
                    alt=""
                    quality={25}
                    height={album.images[0].height}
                    width={album.images[0].width}
                    className="aspect-square rounded-md border-b border-emerald-900 shadow-md"
                  />
                  <div className="absolute right-1 top-1 flex items-center justify-center gap-1 rounded-md border border-emerald-500 bg-emerald-800/90 px-1 py-0.5 text-[0.5em] text-emerald-100">
                    <Music size={8} /> {album.total_tracks}
                  </div>
                </div>

                <div
                  className={`text-xs text-center my-2 text-emerald-300 mx-2.5 truncate ${
                    hoveredIndex === index
                      ? "font-semibold text-emerald-50 underline"
                      : ""
                  }`}
                >
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
