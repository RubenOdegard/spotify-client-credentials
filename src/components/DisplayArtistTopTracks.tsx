"use client";

import { useState } from "react";
import Image from "next/image";
import getSpotifyArtistTopTracks from "@/hooks/getSpotifyArtistTopTracks";

import Modal from "@/components/Modal";

import { Clock3, Disc3 } from "lucide-react";
import { Track } from "@/types/SpotifyArtistTopTracks";

const DisplayArtistTopTracks = ({ artistID }: { artistID: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const handleTrackClick = (track: Track) => {
    setSelectedTrack(track);
    setIsModalOpen(true);
  };

  const dynamicUrl =
    `https://api.spotify.com/v1/artists/${artistID}/top-tracks?market=NO`;

  const { artistTopTracks, loading, error } = getSpotifyArtistTopTracks(
    dynamicUrl,
  );

  if (loading) {
    return <p className="col-span-3">Loading top tracks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const formatDuration = (duration_ms: number) => {
    const minutes = Math.floor(duration_ms / 60000);
    const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${+seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleTrackHover = (index: number | null) => {
    setHoveredIndex(index);
  };

  // Slice the array to get only the first 12 tracks
  const displayedTracks = artistTopTracks?.artistData?.tracks?.slice(0, 12) ||
    [];

  return (
    <div className="col-span-12  col-start-1 lg:col-span-3 lg:col-start-5 lg:col-end-9 lg:row-start-1 lg:row-end-1 h-[400px] relative my-8 lg:my-0">
      {isModalOpen && selectedTrack && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2>{selectedTrack.name}</h2>
          <p>{formatDuration(selectedTrack.duration_ms)}</p>
        </Modal>
      )}

      <div className="h-[50px] w-full bg-gradient-to-t from-gray-950 via-gray-950/30 to-transparent absolute -bottom-12 z-40 hidden lg:flex" />

      <h2 className="mb-4 flex items-center gap-2 font-semibold text-foreground ">
        <Disc3 size={18} className="text-emerald-500" />Top Tracks
      </h2>

      {displayedTracks.length > 0
        ? (
          <div className="grid grid-cols-3 gap-2.5 justify-items-center overflow-y-scroll h-[400px] pb-6">
            {displayedTracks.map((track: Track, index) => (
              // biome-ignore lint/a11y/useKeyWithClickEvents: <lazy ignore, redo into a buton later>
              <div
                key={track.id}
                className={"flex flex-col  rounded-lg bg-emerald-950 w-full snap-center relative cursor-pointer border border-emerald-950 max-h-[145px]"}
                onClick={() => handleTrackClick(track)}
                onMouseEnter={() => handleTrackHover(index)}
                onMouseLeave={() => handleTrackHover(null)}
              >
                <div className="h-26 w-26 relative">
                  <Image
                    src={track.album.images[0].url}
                    alt=""
                    quality={25}
                    height={track.album.images[0].height}
                    width={track.album.images[0].width}
                    className="aspect-square rounded-md shadow-md border-b border-emerald-900 "
                  />
                  <p className="text-[0.5em] text-emerald-100 bg-emerald-800/90 border border-emerald-500 rounded-md px-1 py-0.5 absolute top-1 right-1 flex gap-1 justify-center items-center">
                    <Clock3 size={8} /> {formatDuration(track.duration_ms)}
                  </p>
                </div>

                <p
                  className={`text-xs text-center my-2 text-emerald-300 mx-2.5 truncate ${
                    hoveredIndex === index
                      ? "text-emerald-50 font-semibold underline"
                      : ""
                  }`}
                >
                  {track.name}
                </p>
              </div>
            ))}
          </div>
        )
        : <p>No top tracks data available</p>}
    </div>
  );
};

export default DisplayArtistTopTracks;
