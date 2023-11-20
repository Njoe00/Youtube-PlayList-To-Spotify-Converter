"use client";
import React from "react";

import Playlist from "./playlist";
import YoutubePlaylistTitles from "./youtubeplaylist";

export default function MusicCard({
  playListItem,
  setPlayListItem,
  setPlayListId,
  searchSpotifyTracks,
  token,
  setSpotifyPlayListId,
  playListId,
  spotifyPlayListId,
  musicCardRef,
}: {
  spotifyPlayListId: any;
  playListId: any;
  playListItem: any;
  setPlayListItem: any;
  setPlayListId: any;
  searchSpotifyTracks: any;
  token: any;
  setSpotifyPlayListId: any;
  musicCardRef: React.RefObject<HTMLElement | undefined>;
}) {
  return (
    <div
      ref={musicCardRef as React.RefObject<HTMLDivElement>}
      className="bg-white text-main-text-color w-screen h-screen justify-center flex flex-col items-center"
    >
      <h2 className="text-xl font-thin flex justify-center flex-row pb-48">
        Add your playlist link below
      </h2>
      {spotifyPlayListId ? (
        <YoutubePlaylistTitles
          playListItem={playListItem}
          setPlayListItem={setPlayListItem}
          playListId={playListId}
          setPlayListId={setPlayListId}
          searchSpotifyTracks={searchSpotifyTracks}
        />
      ) : (
        <Playlist token={token} setSpotifyPlayListId={setSpotifyPlayListId} />
      )}
    </div>
  );
}
