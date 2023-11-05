import React, { useState } from "react";
import axios from "axios";
import { waveform } from "ldrs";
waveform.register();

import { playListItemObj } from "../page";

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
  const [toggleButton, setToggleButton] = useState(false);
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
  console.log(isLoading);

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

  const ToggleButtonState = () => {
    setToggleButton(!toggleButton);
  };

  return (
    <div className="pl-32 z-40 pt-8">
      <div className="flex">
        {toggleButton ? (
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
                Sorry, this URL isn't working: {errorMessage}
              </div>
            )}
            {!errorMessage && !isLoading && (
              <button
                className={`m-6 text-xl text-white w-[300px] h-[40px] font-light rounded-full ease-in-out flex-row text-center ${
                  inputValue ? "bg-primary-color" : "bg-main-text-color"
                }`}
                onClick={handleClick}
                disabled={!inputValue}
              >
                Load from URL
              </button>
            )}

            {isLoading && (
              <l-waveform
                size="75"
                stroke="4"
                speed="1"
                color="#16163F"
              ></l-waveform>
            )}
          </div>
        ) : (
          <button
            onClick={ToggleButtonState}
            className="text-xl m-4 text-white bg-primary-color w-[140px] h-[50px] font-light rounded-full hover:bg-black ease-in-out"
          >
            Click Here
          </button>
        )}
      </div>
    </div>
  );
}
