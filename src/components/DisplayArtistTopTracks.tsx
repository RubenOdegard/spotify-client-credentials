"use client";

import getSpotifyArtistTopTracks from "@/hooks/getSpotifyArtistTopTracks";
import Image from "next/image";
import { useState } from "react";

import Modal from "@/components/Modal";

import { formatDuration } from "@/lib/utils";

import { Track } from "@/types/SpotifyArtistTopTracks";
import { Clock3, Disc3 } from "lucide-react";
import Link from "next/link";
import DisplayTrackAudioFeatues from "./DisplayTrackAudioFeatures";

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

  const handleTrackHover = (index: number | null) => {
    setHoveredIndex(index);
  };

  // Slice the array to get only the first 12 tracks
  const displayedTracks = artistTopTracks?.artistData?.tracks?.slice(0, 12) ||
    [];

  console.log(displayedTracks[0]);

  return (
    <div className="col-span-12  col-start-1 xl:col-span-3 xl:col-start-5 xl:col-end-9 xl:row-start-1 xl:row-end-1 h-[400px] relative my-8 xl:my-0">
      {isModalOpen && selectedTrack && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-x-8 ">
            <Link
              href={selectedTrack.album.external_urls.spotify}
              className="col-span-2 place-self-center"
            >
              <Image
                src={selectedTrack.album.images[0].url}
                alt=""
                quality={25}
                height={selectedTrack.album.images[0].height}
                width={selectedTrack.album.images[0].width}
                className="aspect-square rounded-md shadow-md border-b border-emerald-900 max-h-[300px] max-w-[300px] mb-4"
              />
            </Link>

            <div className="col-span-2 md:col-span-1 py-4 md:py-8 flex flex-col gap-2.5 max-w-[300px]">
              <h3 className="text-base font-semibold mb-2 underline-offset-4 underline">
                Track
              </h3>
              <div className="flex flex-col gap-0.5 flex-wrap">
                <span className="text-xs  font-semibold">
                  Title
                </span>
                <h2 className="text-emerald-200">{selectedTrack.name}</h2>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold">
                  Artists
                </span>
                <p className="flex gap-2 flex-wrap">
                  {selectedTrack.artists.map((artist, index) => (
                    <Link
                      key={artist.id}
                      href={artist.external_urls.spotify}
                      target="_blank"
                      className="text-emerald-200 underline  underline-offset-2 font-semibold"
                    >
                      {artist.name}
                    </Link>
                  ))}
                </p>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold ">
                  Duration
                </span>
                <p className="text-emerald-200">
                  {formatDuration(selectedTrack.duration_ms)}
                </p>
              </div>
              <div className="flex flex-col gap-0.5</div>">
                <span className="text-xs font-semibold ">
                  Release
                </span>
                <p className="text-emerald-200">
                  {selectedTrack.album.release_date}
                </p>
              </div>
              <div className="flex flex-col gap-0.5</div>">
                <span className="text-xs font-semibold ">
                  Popularity
                </span>
                <p className="text-emerald-200">
                  {selectedTrack.popularity}/100
                </p>
              </div>
            </div>
            <div className="col-span-2 md:col-span-1 py-4 md:py-8 max-w-[300px]">
              <DisplayTrackAudioFeatues trackID={selectedTrack.id} />
            </div>
          </div>
        </Modal>
      )}

      <div className="h-[50px] w-full bg-gradient-to-t from-gray-950 via-gray-950/30 to-transparent absolute -bottom-12 z-40 hidden xl:flex" />

      <h2 className="mb-4 flex items-center gap-2 font-semibold text-foreground ">
        <Disc3 size={18} className="text-emerald-500" />Top Tracks
      </h2>

      {displayedTracks.length > 0
        ? (
          <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-3 gap-2.5 justify-items-center overflow-y-scroll max-h-[400px] pb-6">
            {displayedTracks.map((track: Track, index) => (
              <div
                key={track.id}
                className="flex flex-col rounded-lg bg-emerald-950 w-full snap-center relative cursor-pointer border border-emerald-950"
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
