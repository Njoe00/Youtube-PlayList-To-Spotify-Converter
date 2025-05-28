"use client";
import React from "react";
import "../app/globals.css";
import { useLocation } from "react-router-dom";

import Playlist from "../components/playlist";
import YoutubePlaylistTitles from "../components/youtubePlaylist";

export default function MusicCard({
  token,
  spotifyPlayListId,
  playListId,
  playListItem,
  setPlayListItem,
  setPlayListId,
  searchSpotifyTracks,
  setSpotifyPlayListId,
}: {
  token: string | null;
  spotifyPlayListId: any;
  playListId: any;
  playListItem: any;
  setPlayListItem: any;
  setPlayListId: any;
  searchSpotifyTracks: any;
  setSpotifyPlayListId: any;
}) {
  return (
    <div className="bg-white text-main-text-color w-full h-screen justify-center flex flex-col items-center">
      <div className="text-center">
        <h1 className="text-primary-color mb-6">SERVICES</h1>
        <h2 className="text-4xl font-bold flex justify-center text-center flex-row pb-64">
          Take Your Music Game To <br /> The Next Level
        </h2>
      </div>
      {spotifyPlayListId ? (
        <YoutubePlaylistTitles
          playListItem={playListItem}
          setPlayListItem={setPlayListItem}
          playListId={playListId}
          setPlayListId={setPlayListId}
          searchSpotifyTracks={searchSpotifyTracks}
        />
      ) : (
        <Playlist setSpotifyPlayListId={setSpotifyPlayListId} />
      )}
    </div>
  );
}
