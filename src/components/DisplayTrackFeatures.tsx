import Link from "next/link";
import DataContainer from "./DataContainer";
import TitleContainer from "./TitleContainer";
import { formatDuration } from "@/lib/utils";
import { Track } from "@/types/SpotifyArtistTopTracks";

const DisplayTrackFeatures = ({ selectedTrack }: { selectedTrack: Track }) => {
  return (
    <>
      <TitleContainer title="Track" />

      <DataContainer
        title={"Title"}
      >
        <Link
          href={selectedTrack.external_urls.spotify}
          target="_blank"
        >
          <h2 className="text-emerald-200 font-semibold">
            {selectedTrack.name}
          </h2>
        </Link>
      </DataContainer>

      <DataContainer
        title={"Duration"}
        value={formatDuration(selectedTrack.duration_ms)}
      />
      <DataContainer
        title={"Release"}
        value={selectedTrack.album.release_date}
      />

      <DataContainer
        title={"Popularity"}
        value={`${selectedTrack.popularity}/100`}
      />
    </>
  );
};
export default DisplayTrackFeatures;
