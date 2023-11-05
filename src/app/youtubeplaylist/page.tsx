import React, { useState } from "react";
import axios from "axios";

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

  const fetchPlaylist = async () => {
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
        console.error("Error fetching YouTube data:", error);
      });
    return response.data.items;
  };

  const handleClick = async () => {
    const playlist = await fetchPlaylist();
    setPlayListItem(playlist);
    await searchSpotifyTracks(playlist);
  };

  const urlSpitter = (e: string) => {
    const breakpoint = /\list=/;
    const splitUrl = e.split(breakpoint);
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
              onChange={(e) => urlSpitter(e.target.value)}
            />
            <button
              className="m-6 text-xl text-white bg-primary-color w-[300px] h-[40px] font-light rounded-full hover:bg-black ease-in-out flex-row text-center"
              onClick={handleClick}
            >
              Load from URL
            </button>
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
