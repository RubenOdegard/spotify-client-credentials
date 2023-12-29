import { ArtistProvider } from "@/components/ArtistContext";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("localhost:3000"),
  openGraph: {
    images: "",
  },
  title: {
    default: "Spotify",
    template: "%s - Spotify",
  },
  description: "Spotify app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-gradient-to-bl from-background via-emerald-950 to-background font-sans antialiased relative",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <ArtistProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ArtistProvider>
      </body>
    </html>
  );
}
