import { useEffect, useState } from "react";
import axios from "axios";
import SpotifyTracks from "@/types/SpotifyArtistTopTracks";

const useSpotifyArtistTopTracks = (url: string) => {
  const [artistTopTracks, setArtistTopTracks] = useState<SpotifyTracks | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/spotify?url=${url}`);
        const data: SpotifyTracks = response.data;

        setArtistTopTracks(data);
      } catch (error) {
        setError(`Error fetching artist data: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { artistTopTracks, loading, error };
};

export default useSpotifyArtistTopTracks;
