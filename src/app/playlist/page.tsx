"use client";
import React, { useState } from "react";
import axios from "axios";
import { waveform } from "ldrs";
waveform.register();

export default function Playlist({
  setSpotifyPlayListId,
  token1,
}: {
  setSpotifyPlayListId: any;
  token1: string | null;
}) {
  const [playlistName, setPlaylistName] = useState("playlist #1");
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createPlaylist = async () => {
    if (playlistName.length === 0) {
      setErrorMessage(true);
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://api.spotify.com/v1/me/playlists",
        {
          name: playlistName,
        },
        {
          headers: {
            Authorization: `Bearer ${token1}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSpotifyPlayListId(response.data.id);
      console.log("Playlist created:", response.data);
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="pl-32 z-40 flex ">
      <div className="flex-col items-center flex">
        <h1>Name your Spotify playlist here:</h1>
        <input
          className="p-4 px-14 mt-2 mr-2 rounded-md text-center"
          type="text"
          placeholder="Playlist Name"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />
        {errorMessage && playlistName.length === 0 && (
          <div className="text-red-600 mt-4 text-lg w-[300px] h-[40px] text-center">
            The text box is empty.
          </div>
        )}
        {!errorMessage && playlistName.length > 0 && !isLoading && (
          <button
            onClick={createPlaylist}
            className="text-xl m-4 text-white bg-primary-color w-[250px] h-[50px] font-light rounded-full transition delay-150 duration-200 hover:bg-main-text-color ease-in-out"
          >
            Name Your Playlist{" "}
          </button>
        )}
        {isLoading && (
          <div className="m-8">
            <l-waveform
              size="50"
              stroke="4"
              speed="2"
              color="#16163F"
            ></l-waveform>
          </div>
        )}
      </div>
    </div>
  );
}
