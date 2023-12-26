# Spotify Client-Credentials

### Running the app

> .env.local

```
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=
NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=
NEXT_PUBLIC_BASE_URL=
```

> A Dockerfile is included if you want to run in as a standalone app.\
> Uncomment the line _**output: 'standalone',**_ in next.config.js.

```bash
$ docker build -t spotify-cc-docker .
$ docker run -p 3000:3000 spotify-cc-docker
```

## Details

Application showcasing working with the Spotify API with Client-Credentials
(CC).\
**CC** gives access to Spotify, excluding data directly connected to end users.
