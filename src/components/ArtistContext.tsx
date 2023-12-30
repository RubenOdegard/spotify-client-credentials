"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface ArtistContextProps {
  artistID: string;
  handleRelatedArtistClick: (newArtistID: string) => void;
}

const ArtistContext = createContext<ArtistContextProps | undefined>(undefined);

export const useArtist = () => {
  const context = useContext(ArtistContext);
  if (!context) {
    throw new Error("useArtist must be used within an ArtistProvider");
  }
  return context;
};

export const ArtistProvider = ({ children }: { children: ReactNode }) => {
  const [artistID, setArtistID] = useState("3q7HBObVc0L8jNeTe5Gofh");
  // 1eAyilKA1p82m0SkoEZ8d

  const handleRelatedArtistClick = (newArtistID: string) => {
    setArtistID(newArtistID);
    console.log(artistID);
  };

  return (
    <ArtistContext.Provider value={{ artistID, handleRelatedArtistClick }}>
      {children}
    </ArtistContext.Provider>
  );
};
