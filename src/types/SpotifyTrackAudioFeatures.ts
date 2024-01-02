interface SpotifyAudioFeatures {
  artistData: {
    acousticness: number;
    analysis_url: string;
    danceability: number;
    duration_ms: number;
    energy: number;
    id: string;
    instrumentalness: number;
    key: number;
    liveness: number;
    loudness: number;
    mode: number;
    speechiness: number;
    tempo: number;
    time_signature: number;
    track_href: string;
    type: "audio_features";
    uri: string;
    valence: number;
  };
}

export interface Track {
  selectedTrack: {
    album: {
      album_type: string;
      artists: SpotifyArtist[];
      external_urls: { spotify: string };
      href: string;
      id: string;
      images: SpotifyImage[];
      is_playable: boolean;
      name: string;
      release_date: string;
      release_date_precision: string;
      total_tracks: number;
      type: string;
      uri: string;
    };
    artists: SpotifyArtist[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: { isrc: string };
    external_urls: Record<string, string>;
    href: string;
    id: string;
    is_local: boolean;
    is_playable?: boolean;
    name: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: string;
    uri: string;
  };
}

interface SpotifyImage {
  height: number;
  url: string;
  width: number;
}

interface SpotifyArtist {
  external_urls: { spotify: string };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export default SpotifyAudioFeatures;
