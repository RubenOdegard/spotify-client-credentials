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
      <span className="col-span-12 row-span-4 xl:col-start-9 xl:col-span-4  max-w-[400px] max-h-[400px] bg-emerald-950 animate-pulse rounded-md" />
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
    <div className="col-span-12 col-start-1 xl:col-start-9 xl:col-end-13 xl:row-start-1 xl:row-end-4 relative group my-8 xl:my-0">
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
                className="aspect-square rounded-md shadow-md border-b border-emerald-900 max-h-[300px] max-w-[300px] mb-4"
              />
            </Link>

            <div className="col-span-2 md:col-span-1 py-4 md:py-8 flex flex-col gap-2.5 max-w-[300px]">
              <DisplayAlbumFeatures selectedAlbum={selectedAlbum} />
            </div>
          </div>
        </Modal>
      )}

      <h2 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
        <DiscAlbum size={18} className="text-emerald-500" />
        Albums
      </h2>

      <div className="h-[50px] w-full bg-gradient-to-t from-gray-950 via-gray-950/30 to-transparent absolute bottom-0 z-40 rounded-md overflow-clip hidden xl:flex" />
      {albumData
        ? (
          <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-3 gap-2.5 justify-items-center overflow-y-scroll max-h-[400px] pb-6">
            {albumData.items?.map((album: AlbumData, index) => (
              // biome-ignore lint/a11y/useKeyWithClickEvents: lazy ignore, replace with button?
              <div
                key={album.id}
                className="flex flex-col rounded-lg bg-emerald-950 w-full snap-center relative border border-emerald-950"
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
                    className="aspect-square rounded-md shadow-md border-b border-emerald-900"
                  />
                  <div className="text-[0.5em] text-emerald-100 bg-emerald-800/90 border border-emerald-500 rounded-md px-1 py-0.5 absolute top-1 right-1 flex gap-1 justify-center items-center">
                    <Music size={8} /> {album.total_tracks}
                  </div>
                </div>

                <div
                  className={`text-xs text-center my-2 text-emerald-300 mx-2.5 truncate ${
                    hoveredIndex === index
                      ? "text-emerald-50 font-semibold underline"
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
