// @/hooks/useSpotifyAlbumData.js
import { useEffect, useState } from "react";
import axios from "axios";

const useSpotifyAlbumData = () => {
  const [albumData, setAlbumData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
        const response = await axios.get("/api/spotify");
        const data = response.data;

        setAlbumData(data.artistData);
      } catch (error) {
        setError(`Error fetching album data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    // Fetch data when the hook is called
    fetchData();
  }, []);

  return { albumData, loading, error };
};

export default useSpotifyAlbumData;
