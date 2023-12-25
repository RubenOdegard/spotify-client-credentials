interface ExternalUrls {
  spotify: string;
}

interface Followers {
  href: string;
  total: number;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

interface SpotifyArtistData {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export default SpotifyArtistData;
