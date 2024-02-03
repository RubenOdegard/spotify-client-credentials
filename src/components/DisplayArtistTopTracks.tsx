"use client";

import Modal from "@/components/Modal";
import useSpotifyArtistTopTracks from "@/hooks/useSpotifyArtistTopTracks";
import { formatDuration } from "@/lib/utils";
import { Track } from "@/types/SpotifyArtistTopTracks";
import { Clock3, Disc3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DisplayTrackAudioFeatues from "./DisplayTrackAudioFeatures";
import DisplayTrackFeatures from "./DisplayTrackFeatures";

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

  const { artistTopTracks, loading, error } = useSpotifyArtistTopTracks(
    dynamicUrl,
  );

  if (loading) {
    return (
      <span className="col-span-12 row-span-4 max-h-[400px] max-w-[400px]  animate-pulse rounded-md bg-emerald-950 xl:col-span-4 xl:col-start-5" />
    );
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

  return (
    <div className="relative col-span-12 col-start-1">
      {/* can be rewritten to conditional component with props to get rid of && */}
      {isModalOpen && selectedTrack && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {/* Selected Track Image */}
          <div className="grid grid-cols-1 gap-x-8  md:grid-cols-2 ">
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
                className="mb-4 aspect-square max-h-[300px] max-w-[300px] rounded-md border-b border-emerald-900 shadow-md"
              />
            </Link>

            {/* split container for track features and track audio features, 50/50 */}
            <div className="col-span-2 flex max-w-[200px] flex-col gap-2.5 py-4 md:col-span-1 md:py-8">
              <DisplayTrackFeatures selectedTrack={selectedTrack} />
            </div>
            <div className="col-span-2 max-w-[200px] py-4 md:col-span-1 md:py-8">
              <DisplayTrackAudioFeatues trackID={selectedTrack.id} />
            </div>
          </div>
        </Modal>
      )}

      <h2 className="mb-4 flex items-center gap-2 font-semibold text-foreground ">
        <Disc3 size={18} className="text-emerald-500" />
        Top Tracks
      </h2>

      {displayedTracks.length > 0
        ? (
          <div className="flex flex-nowrap justify-items-center gap-3 overflow-x-scroll pb-2">
            {displayedTracks.map((track: Track, index) => (
              // biome-ignore lint/a11y/useKeyWithClickEvents: lazy ignore, replace with button?
              <div
                key={track.id}
                className="relative flex w-full min-w-[200px] cursor-pointer snap-center flex-col rounded-lg border border-emerald-950 bg-emerald-950"
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
                    className="aspect-square rounded-md border-b border-emerald-900 shadow-md "
                  />
                  <p className="absolute right-1 top-1 flex items-center justify-center gap-1 rounded-md border border-emerald-500 bg-emerald-800/90 px-1 py-0.5 text-[0.7em] text-emerald-100">
                    <Clock3 size={8} /> {formatDuration(track.duration_ms)}
                  </p>
                </div>

                <p
                  className={`text-xs text-center my-2 text-emerald-300 mx-2.5 truncate ${
                    hoveredIndex === index
                      ? "font-semibold text-emerald-50 underline"
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
