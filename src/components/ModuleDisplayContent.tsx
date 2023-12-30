"use client";
import React from "react";
import DisplayArtist from "./DisplayArtist";
import DisplayArtistAlbums from "./DisplayArtistAlbums";
import DisplayArtistRelatedArtists from "./DisplayArtistRelatedArtists";
import DisplayArtistTopTracks from "./DisplayArtistTopTracks";
import { useArtist } from "./ArtistContext";

const ModuleDisplayContent = () => {
  const { artistID, handleRelatedArtistClick } = useArtist();
  return (
    <div>
      <div className="grid grid-cols-12  md:rounded-xl p-4 lg:p-8 mx-2  gap-x-8 xl:gap-y-2 bg-background md:border border-emerald-900 shadow-xl lg:mx-auto">
        <DisplayArtist artistID={artistID} />
        <DisplayArtistTopTracks artistID={artistID} />
        <DisplayArtistAlbums artistID={artistID} />
        <DisplayArtistRelatedArtists
          artistID={artistID}
        />
      </div>
    </div>
  );
};

export default ModuleDisplayContent;
