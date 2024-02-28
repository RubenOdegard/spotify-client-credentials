"use client";

import useSpotifyTrackAudioFeatures from "@/hooks/useSpotifyTrackAudioFeatures";
import { KeyFormatter, TimeSignatureFormatter } from "@/lib/utils";
import TitleContainer from "./TitleContainer";

const DisplayTrackAudioFeatures = ({ trackID }: { trackID: string }) => {
  const dynamicUrl = `https://api.spotify.com/v1/audio-features/${trackID}`;
  const { trackAudioFeatures, loading, error } =
    useSpotifyTrackAudioFeatures(dynamicUrl);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="w-full">
      {trackAudioFeatures ? (
        <div className="flex flex-col gap-2.5">
          <TitleContainer title="Track Audio Features" />

          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold">Key</span>
            <h2 className="text-emerald-200">
              {KeyFormatter(trackAudioFeatures.artistData.key)}
            </h2>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold">Time Signature</span>
            <h2 className="text-emerald-200">
              {TimeSignatureFormatter(
                trackAudioFeatures.artistData.time_signature,
              )}
            </h2>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold">Beats Per Minute</span>
            <h2 className="text-emerald-200">
              {Math.round(trackAudioFeatures.artistData.tempo)} BPM
            </h2>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold">Energy Level</span>
            <h2 className="text-emerald-200">
              {trackAudioFeatures.artistData.tempo > 0.5 ? "High" : "Low"}
            </h2>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold">Danceability</span>
            <h2 className="text-emerald-200">
              {trackAudioFeatures.artistData.danceability > 0.45
                ? "Danceable"
                : "Less danceable"}
            </h2>
          </div>
        </div>
      ) : (
        <p>No artist data available</p>
      )}
    </div>
  );
};

export default DisplayTrackAudioFeatures;
