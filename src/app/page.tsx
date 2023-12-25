import DisplayAlbumTracks from "@/components/DisplayAlbumTracks";
import DisplayArtist from "@/components/DisplayArtist";
import DisplayArtistAlbums from "@/components/DisplayArtistAlbums";
import DisplayArtistRelatedArtists from "@/components/DisplayArtistRelatedArtists";
import DisplayArtistTopTracks from "@/components/DisplayArtistTopTracks";
import DisplayTrackAudioFeatues from "@/components/DisplayTrackAudioFeatures";

const Home = () => {
  return (
    <div>
      <h1>Spotify Artist Info</h1>
      <DisplayTrackAudioFeatues trackID="2COo50CZFFHNkQNa6ta3q7" />
      <DisplayArtistRelatedArtists artistID="60a2bBHgTEfBJxFeJykcbD" />
      <DisplayArtistTopTracks artistID="60a2bBHgTEfBJxFeJykcbD" />
      <DisplayArtist artistID="60a2bBHgTEfBJxFeJykcbD" />
      <DisplayAlbumTracks albumID="46KxFs8Yte7AI01p9yvzWZ" />
      <DisplayArtistAlbums artistID="60a2bBHgTEfBJxFeJykcbD" />
    </div>
  );
};

export default Home;
