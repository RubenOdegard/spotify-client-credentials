import Link from "next/link";
import DataContainer from "./DataContainer";
import TitleContainer from "./TitleContainer";
import { Album, Artist } from "@/types/SpotifyAlbumFeatures";

const DisplayAlbumFeatures = ({ selectedAlbum }: Album) => {
  console.log("Album: ", selectedAlbum);
  return (
    <>
      <TitleContainer title="Album" />

      <DataContainer
        title={"Title"}
      >
        <Link
          href={selectedAlbum.external_urls.spotify}
          target="_blank"
        >
          <h2 className="text-emerald-200 font-semibold">
            {selectedAlbum.name}
          </h2>
        </Link>
      </DataContainer>

      <DataContainer
        title={"Artists"}
      >
        {selectedAlbum.artists.map((artist: Artist) => (
          <Link
            key={artist.id}
            href={artist.external_urls.spotify}
            target="_blank"
            className="text-emerald-200 underline underline-offset-2 font-semibold"
          >
            {artist.name}
          </Link>
        ))}
      </DataContainer>

      <DataContainer
        title={"Total Tracks"}
        value={selectedAlbum.total_tracks}
      />

      <DataContainer
        title={"Release Date"}
        value={selectedAlbum.release_date}
      />
    </>
  );
};

export default DisplayAlbumFeatures;
