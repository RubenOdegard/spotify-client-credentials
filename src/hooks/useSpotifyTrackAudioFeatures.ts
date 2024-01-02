import SpotifyAudioFeatures from "@/types/SpotifyTrackAudioFeatures";
import axios from "axios";
import { useEffect, useState } from "react";

const useSpotifyAudioFeatures = (url: string) => {
  const [trackAudioFeatures, setTrackAudioFeatures] = useState<
    SpotifyAudioFeatures | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
        const response = await axios.get(`/api/spotify?url=${url}`);
        const data: SpotifyAudioFeatures = response.data;

        setTrackAudioFeatures(data);
      } catch (error: any) {
        setError(`Error fetching artist data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { trackAudioFeatures, loading, error };
};

export default useSpotifyAudioFeatures;
