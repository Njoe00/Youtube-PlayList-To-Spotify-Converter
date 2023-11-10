"use client";
import React, { useState } from "react";
import axios from "axios";
import { waveform } from "ldrs";

import { playListItemObj } from "../app/page";

export default function YoutubePlaylistTitles({
  playListItem,
  setPlayListItem,
  playListId,
  setPlayListId,
  searchSpotifyTracks,
}: {
  playListItem: playListItemObj[];
  setPlayListItem: React.Dispatch<React.SetStateAction<playListItemObj[]>>;
  playListId: string | undefined;
  setPlayListId: React.Dispatch<React.SetStateAction<string | undefined>>;
  searchSpotifyTracks: any;
}) {
  const YOUTUBE_API = "AIzaSyDPz_HnRfsgRz708I_83usC0VHIdlVMW9k";
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchPlaylist = async () => {
    setIsLoading(true);
    const response: any = await axios
      .get("https://www.googleapis.com/youtube/v3/playlistItems", {
        params: {
          part: "snippet, contentDetails",
          key: YOUTUBE_API,
          maxResults: 100,
          playlistId: playListId,
        },
      })
      .catch((error) => {
        setErrorMessage(inputValue);
      });
    return response.data.items;
  };

  const handleClick = async () => {
    const playlist = await fetchPlaylist();
    setPlayListItem(playlist);
    await searchSpotifyTracks(playlist);
    setIsLoading(false);
  };

  const urlSpitter = (e: string) => {
    const breakpoint = /\list=/;
    const splitUrl = e.split(breakpoint);
    setInputValue(e);
    setPlayListId(splitUrl[1]);
  };

  return (
    <div className="pl-32 z-40 pt-2 flex">
      <div className="flex-col flex items-center">
        <h1>Copy Youtube playlist URL and paste here:</h1>
        <input
          className="p-4 px-14 mt-2 mr-2 rounded-md"
          type="text"
          onChange={(e) => {
            urlSpitter(e.target.value);
          }}
          placeholder="Paste Youtube playlist URL here"
          value={inputValue}
        />
        {errorMessage && inputValue && !isLoading && (
          <div className="text-red-600 m-6 text-base w-[300px] h-[40px] text-center">
            Sorry, this URL isn&apos;t working: {errorMessage}
          </div>
        )}
        {!errorMessage && !isLoading && (
          <button
            className={`m-6 text-xl transition delay-150 duration-200 text-white w-[300px] h-[40px] font-light rounded-full ease-in-out flex-row text-center ${
              inputValue ? "bg-primary-color" : "bg-main-text-color"
            }`}
            onClick={handleClick}
            disabled={!inputValue}
          >
            Load from URL
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
