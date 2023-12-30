import { useEffect, useState } from "react";
import axios from "axios";
import SpotifyArtistData from "@/types/SpotifyArtist";

const getSpotifyArtist = (url: string) => {
  const [artistData, setArtistData] = useState<SpotifyArtistData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
        const response = await axios.get(`/api/spotify?url=${url}`);
        const data: SpotifyArtistData = response.data;

        setArtistData(data);
      } catch (error) {
        setError(`Error fetching artist data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { artistData, loading, error };
};

export default getSpotifyArtist;
