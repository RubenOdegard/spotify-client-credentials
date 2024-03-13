# Spotify Client-Credentials

### Table of contents

- [Introduction](#introduction)
- [Setup](#setup)
- [Visuals](#visuals)
- [Walkthrough](#walkthrough)
  - [Example Types](#example-types)
  - [Formatters](#formatters)

## Introduction

Application showcasing working with the Spotify API with
[Client-Credentials](https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow)
(CC).\
**CC** gives access to Spotify's data, excluding data directly tied to users.

- [x] Artist Profile Picture
- [x] Artist Information
- [x] Artist Top Tracks
- [x] Artist Albums
- [x] Related Artists
- [x] Details - _selected track_
- [x] Details - _selected album_
- [ ] Search implementation
- [x] Navigate through related artists
- [ ] Save token to local storage and rotate if expired

---

### Setup

> The application needs the following environment variables in **.env.local**
> A env.example file is included for reference.

```
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
NEXT_PUBLIC_BASE_URL=
```

> A Dockerfile is included if you want to run in as a standalone app.\
> Uncomment the line _**output: 'standalone',**_ in next.config.js.

```bash
$ docker build -t spotify-cc-docker .
$ docker run -p 3000:3000 spotify-cc-docker
```

---

## Visuals

**Main**\
![Main](https://gcdnb.pbrd.co/images/P5tYKDhk0Q1i.png?o=1)

**Track Details**\
![Track-details](https://gcdnb.pbrd.co/images/fgxvWaqrxvsf.png?o=1)

**Album Details**\
![Album-Details](https://gcdnb.pbrd.co/images/iCI8UzdAhI6j.png?o=1)

### Types

> Example from SpotifyTrackAudioFeatures.ts

```typescript
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

export default SpotifyAudioFeatures;
```

### Formatters

> Some of the information returned from the Spotify Web API is not intuitively
> understandable for the end user and has to be formatted. These formatters are
> inside _/utils/utils.ts_. More information about api responses can be found
> [here](https://developer.spotify.com/documentation/web-api).

**nFormatter** - _follower count_

```typescript
export function nFormatter(num: number, digits: number) {
  const si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}
```

**KeyFormatter** - _song key_

```typescript
export function KeyFormatter(num: number): string {
  const pitchClasses = [
    "C",
    "C♯/D♭",
    "D",
    "D♯/E♭",
    "E",
    "F",
    "F♯/G♭",
    "G",
    "G♯/A♭",
    "A",
    "A♯/B♭",
    "B",
  ];

  if (num >= 0 && num <= 11) {
    return pitchClasses[num];
  }
  return "Error";
}
```

**TimeSignatureFormatter** - _song time signature_

```typescript
export function TimeSignatureFormatter(num: number): string {
  if (num >= 3 && num <= 7) {
    return `${num.toString()}/4`;
  }
  return "Invalid time signature";
}
```

**FormatDuration** - _song duration to minutes and seconds_

```typescript
export const formatDuration = (duration_ms: number) => {
  const minutes = Math.floor(duration_ms / 60000);
  const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${+seconds < 10 ? "0" : ""}${seconds}`;
};
```
