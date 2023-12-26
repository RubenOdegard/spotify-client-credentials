import DisplayAlbumTracks from "@/components/DisplayAlbumTracks";
import DisplayArtist from "@/components/DisplayArtist";
import DisplayArtistAlbums from "@/components/DisplayArtistAlbums";
import DisplayArtistRelatedArtists from "@/components/DisplayArtistRelatedArtists";
import DisplayArtistTopTracks from "@/components/DisplayArtistTopTracks";
import DisplayTrackAudioFeatues from "@/components/DisplayTrackAudioFeatures";

const Home = () => {
  return (
    <div className="max-w-7xl flex items-center mx-auto min-h-[100dvh] max-h-[100dvh]  ">
      <div className="grid grid-cols-12  rounded-xl p-2 gap-x-4 gap-y-1">
        <DisplayArtist artistID="60a2bBHgTEfBJxFeJykcbD" />
        <DisplayArtistRelatedArtists artistID="60a2bBHgTEfBJxFeJykcbD" />
        <DisplayArtistTopTracks artistID="60a2bBHgTEfBJxFeJykcbD" />
        <DisplayArtistAlbums artistID="60a2bBHgTEfBJxFeJykcbD" />
      </div>
    </div>
  );
};

export default Home;
