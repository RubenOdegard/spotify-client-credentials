import { useEffect, useState } from "react";
import axios from "axios";
import SpotifyArtistRelatedArtist from "@/types/SpotifyArtistRelatedArtists";

const useSpotifyArtistTopTracks = (url: string) => {
  const [artistRelatedArtists, setArtistRelatedArtists] = useState<
    SpotifyArtistRelatedArtist | null
  >(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
        const response = await axios.get(`/api/spotify?url=${url}`);
        const data: SpotifyArtistRelatedArtist = response.data;

        setArtistRelatedArtists(data);
      } catch (error: any) {
        setError(`Error fetching artist data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { artistRelatedArtists, loading, error };
};

export default useSpotifyArtistTopTracks;
