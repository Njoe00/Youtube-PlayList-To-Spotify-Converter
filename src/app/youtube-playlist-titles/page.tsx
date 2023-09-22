<<<<<<< HEAD
import React, { useState } from "react";
import axios from "axios";

interface playListItemObj {
  snippet: {
    title: string;
    thumbnails: {
      high: {
        url: string;
        width: string;
        height: string;
      };
      default: {
        url: string;
      };
    };
  };
}

export default function YoutubePlaylistTitles() {
  const API_KEY = "AIzaSyDPz_HnRfsgRz708I_83usC0VHIdlVMW9k";

  const [playListId, setPlayListId] = useState("");
  const [playListItem, setPlayListItem] = useState<playListItemObj[]>([]);

  const playListItems = async (e: any) => {
    e.preventDefault();
    await axios
      .get("https://www.googleapis.com/youtube/v3/playlistItems", {
        params: {
          part: "snippet, contentDetails",
          key: API_KEY,
          maxResults: 100,
          playlistId: playListId,
        },
      })
      .then((response) => {
        setPlayListItem(response.data.items);
        console.log("line 26", playListItem[0].snippet.title);
        storeYoutubeTitles();
=======
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function YoutubePlaylistTitles() {
  const API_KEY = "AIzaSyDPz_HnRfsgRz708I_83usC0VHIdlVMW9k";
  const CLIENT_ID =
    "682640392367-ncgk3k797rt7ihtacadp3kb3h705k5cs.apps.googleusercontent.com";
  const CLIENT_ID_SECRET = "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";
  const AUTH_ENDPOINT = "https://www.googleapis.com/auth/youtube.readonly";
  const REDIRECT_URI = "http://localhost:3000";
  const RESPONSE_TYPE = "token";
  const [videos, setVideos] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [playListId, setPlayListId] = useState("");
  const [playListItem, setPlayListItem] = useState<string[]>([]);

  const searchVideos = async (e: any) => {
    e.preventDefault();
    await axios
      .get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          part: "snippet",
          key: API_KEY,
          q: searchQuery,
        },
      })
      .then((response) => {
        setVideos(response.data.items);
>>>>>>> d0988e0 (adding mergine conflicts for main file import)
      })
      .catch((error) => {
        console.error("Error fetching YouTube data:", error);
      });
  };
<<<<<<< HEAD

  const urlSpitter = (e: string) => {
    const breakpoint = /\list=/;
    const splitUrl = e.split(breakpoint);
    setPlayListId(splitUrl[1]);
  };

  const renderPlayListItems = () => {
    return playListItem.map((title, id) => (
      <li key={id}>
        {title.snippet.title}
        <img
          src={title.snippet.thumbnails.high.url}
          width={title.snippet.thumbnails.high.width}
          height={title.snippet.thumbnails.high.height}
          alt={title.snippet.thumbnails.default.url}
        />
      </li>
    ));
  };

  const storeYoutubeTitles = () => {
    const youtubeTitlesArray = [];
    for (let i = 0; i < playListItem.length; i++) {
      youtubeTitlesArray.push(playListItem[i].snippet.title);
    }
    return youtubeTitlesArray;
=======
  const renderVideos = () => {
    return videos.map((video) => <li key={video.id}>{video.snippet.title}</li>);
>>>>>>> d0988e0 (adding mergine conflicts for main file import)
  };

  return (
    <div>
<<<<<<< HEAD
      <h1>Playlist</h1>
      <form onSubmit={playListItems}>
        <input type="text" onChange={(e) => setPlayListId(e.target.value)} />
        <button type={"submit"}>Search</button>
      </form>
      <button onClick={renderPlayListItems}>Click here for videos</button>
      <h1>Playlist links</h1>
      <form onSubmit={playListItems}>
        <input type="text" onChange={(e) => urlSpitter(e.target.value)} />
        <button type={"submit"}>Search</button>
      </form>
      <button onClick={renderPlayListItems}>Click here for titles</button>
      {renderPlayListItems()}
=======
      <h1>YouTube Videos</h1>
      <form onSubmit={searchVideos}>
        <input type="text" onChange={(e) => setSearchQuery(e.target.value)} />
        <button type={"submit"}>Search</button>
      </form>
      <ul></ul>
>>>>>>> d0988e0 (adding mergine conflicts for main file import)
    </div>
  );
}
// https://www.youtube.com/watch?v=RmibkOh25uY&list=RDRmibkOh25uY
// https://www.youtube.com/watch?v=BeI6an1Fy6E&list=PLiGWrTQCFDq0bIFXWanR1xEtU872w05f8
