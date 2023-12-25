"use client";

import getSpotifyArtist from "@/hooks/getSpotifyArtist";
import SpotifyAudioFeatures from "@/types/SpotifyAudioFeatures";

const DisplayTrackAudioFeatues = ({ trackID }: { trackID: string }) => {
  const dynamicUrl = `https://api.spotify.com/v1/audio-features/${trackID}`;
  const { artistData, loading, error } = getSpotifyArtist(dynamicUrl);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4 w-full ">
      {artistData
        ? (
          <>
            <h2>Track Audio Features</h2>
            <div className="flex flex-row overflow-x-scroll gap-4 snap snap-x snap-mandatory ">
              <div className="flex flex-col rounded-lg bg-gray-900 p-4 w-5/6 snap-center max-w-xs truncate">
                {JSON.stringify(artistData)}
              </div>
            </div>
          </>
        )
        : <p>No artist data available</p>}
    </div>
  );
};

export default DisplayTrackAudioFeatues;
