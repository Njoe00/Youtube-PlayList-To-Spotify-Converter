import React, { useState } from "react";

import Playlist from "./playlist";
import YoutubePlaylistTitles from "./youtubePlaylist";

export default function MusicCard({
  playListItem,
  setPlayListItem,
  setPlayListId,
  searchSpotifyTracks,
  playListId,
  spotifyPlayListId,
  setSpotifyPlayListId,
  musicCardRef,
}: {
  spotifyPlayListId: any;
  playListId: any;
  playListItem: any;
  setPlayListItem: any;
  setPlayListId: any;
  searchSpotifyTracks: any;
  setSpotifyPlayListId: any;
  musicCardRef: React.RefObject<HTMLElement | undefined>;
}) {
  const [isPlaylistCreated, setIsPlaylistCreated] = useState(false);
  return (
    <div
      ref={musicCardRef as React.RefObject<HTMLDivElement>}
      className="bg-white text-main-text-color w-full h-screen justify-center flex flex-col items-center"
    >
      <div className="text-center">
        <h1 className="text-primary-color mb-6">SERVICES</h1>
        <h2 className="text-4xl font-bold flex justify-center text-center flex-row pb-64">
          Take Your Music Game To <br /> The Next Level
        </h2>
      </div>
      {isPlaylistCreated ? (
        <YoutubePlaylistTitles />
      ) : (
        <Playlist
          isPlaylistCreated={isPlaylistCreated}
          setIsPlaylistCreated={setIsPlaylistCreated}
        />
      )}
    </div>
  );
}
