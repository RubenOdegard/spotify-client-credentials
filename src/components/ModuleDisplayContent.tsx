"use client";
import React from "react";
import DisplayArtist from "./DisplayArtist";
import DisplayArtistAlbums from "./DisplayArtistAlbums";
import DisplayArtistRelatedArtists from "./DisplayArtistRelatedArtists";
import DisplayArtistTopTracks from "./DisplayArtistTopTracks";
import { useArtist } from "./ArtistContext";

const ModuleDisplayContent = () => {
	const { artistID } = useArtist();
	return (
		<div className="lg:p-24">
			<div className="mx-auto grid min-h-[100dvh] grid-cols-12 gap-x-8 gap-y-6 border-emerald-900 bg-background/30 p-4 shadow-xl backdrop-blur-sm md:mx-2 md:min-h-[80dvh] md:rounded-xl md:border lg:mx-auto lg:p-8">
				<div className="col-span-12 flex w-full items-center justify-center lg:py-8">
					<DisplayArtist artistID={artistID} />
				</div>
				<DisplayArtistTopTracks artistID={artistID} />
				<DisplayArtistAlbums artistID={artistID} />
				<DisplayArtistRelatedArtists artistID={artistID} />
			</div>
		</div>
	);
};

export default ModuleDisplayContent;
