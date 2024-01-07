import { useEffect, useState } from "react";
import axios from "axios";
import { SpotifyAlbumData } from "@/types/SpotifyAlbumData";

const useSpotifyAlbumData = (url: string) => {
  const [albumData, setAlbumData] = useState<SpotifyAlbumData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/spotify?url=${url}`);
        const data = response.data;

        setAlbumData(data.artistData);
      } catch (error: any) {
        setError(`Error fetching album data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { albumData, loading, error };
};

export default useSpotifyAlbumData;
