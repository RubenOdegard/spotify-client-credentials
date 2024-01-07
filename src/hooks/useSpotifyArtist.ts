import { useEffect, useState } from "react";
import axios from "axios";
import SpotifyArtistData from "@/types/SpotifyArtist";

const useSpotifyArtist = (url: string) => {
  const [artistData, setArtistData] = useState<SpotifyArtistData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/spotify?url=${url}`);
        const data: SpotifyArtistData = response.data;

        setArtistData(data);
      } catch (error: any) {
        setError(`Error fetching artist data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { artistData, loading, error };
};

export default useSpotifyArtist;
