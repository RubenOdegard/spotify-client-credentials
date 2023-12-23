import ModuleArtistAlbums from "@/components/ModuleArtistAlbums";
import TestApiComponent from "@/components/test";

const Home = () => {
  return (
    <div>
      <h1>Spotify Artist Info</h1>
      <TestApiComponent />
      <ModuleArtistAlbums />
    </div>
  );
};

export default Home;
