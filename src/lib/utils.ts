import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function nFormatter(num: number, digits: number) {
  const si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: "k" },
    { value: 1E6, symbol: "M" },
    { value: 1E9, symbol: "G" },
    { value: 1E12, symbol: "T" },
    { value: 1E15, symbol: "P" },
    { value: 1E18, symbol: "E" },
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

// Calculate key of a song based on the value returned from Spotify
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

  // Check if the key is valid
  if (num >= 0 && num <= 11) {
    return pitchClasses[num];
  }
  return "Error";
}

export function TimeSignatureFormatter(num: number): string {
  // Check if the time signature is valid
  if (num >= 3 && num <= 7) {
    return `${num.toString()}/4`; // Assuming 4/4 time signature for simplicity
  }
  return "Invalid time signature";
}

// Format duration to minutes and seconds
export const formatDuration = (duration_ms: number) => {
  const minutes = Math.floor(duration_ms / 60000);
  const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${+seconds < 10 ? "0" : ""}${seconds}`;
};
