import DisplayAlbumTracks from "@/components/DisplayAlbumTracks";
import DisplayArtist from "@/components/DisplayArtist";
import DisplayArtistAlbums from "@/components/DisplayArtistAlbums";
import DisplayArtistRelatedArtists from "@/components/DisplayArtistRelatedArtists";
import DisplayArtistTopTracks from "@/components/DisplayArtistTopTracks";
import DisplayTrackAudioFeatues from "@/components/DisplayTrackAudioFeatures";

const artistID = "3PgCoKtxkxF046P2FM7SFE";

const Home = () => {
  return (
    <div className="px-24 flex items-center mx-auto min-h-[100dvh] max-h-[100dvh]  ">
      <div className="grid grid-cols-12  rounded-xl p-2 gap-x-4 gap-y-1">
        <DisplayArtist artistID={artistID} />
        <DisplayArtistRelatedArtists artistID={artistID} />
        <DisplayArtistTopTracks artistID={artistID} />
        <DisplayArtistAlbums artistID={artistID} />
      </div>
    </div>
  );
};

export default Home;
