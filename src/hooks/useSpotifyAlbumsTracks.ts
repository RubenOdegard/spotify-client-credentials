import { useEffect, useState } from "react";
import axios from "axios";
import SpotifyAlbumTracks from "@/types/SpotifyAlbumTracks";

const useSpotifyAlbumData = (url: string) => {
  const [albumTracks, setAlbumTracks] = useState<SpotifyAlbumTracks | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
        const response = await axios.get(url);
        const data: SpotifyAlbumTracks = response.data;

        setAlbumTracks(data);
      } catch (error: any) {
        setError(`Error fetching album data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { albumTracks, loading, error };
};

export default useSpotifyAlbumData;
