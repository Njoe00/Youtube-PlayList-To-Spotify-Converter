import React, { useState, useEffect } from "react";
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

export default function YoutubePlaylistTitles({
  youtubePlaylistTitles,
}: {
  youtubePlaylistTitles: string[];
}) {
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
      })
      .catch((error) => {
        console.error("Error fetching YouTube data:", error);
      });
  };

  useEffect(() => {
    const storeYoutubeTitles = async () => {
      for (let i = 0; i < playListItem.length; i++) {
        youtubePlaylistTitles.push(playListItem[i].snippet.title);
      }
      return youtubePlaylistTitles;
    };
    storeYoutubeTitles();
  }, [playListItem]);

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
  };
  const renderVideos = () => {
    return videos.map((video) => <li key={video.id}>{video.snippet.title}</li>);
  };

  return (
    <div>
      {/* <h1>Playlist</h1> */}
      {/* <form onSubmit={playListItems}>
        <input type="text" onChange={(e) => setPlayListId(e.target.value)} />
        <button type={"submit"}>Search</button>
      </form> */}
      {/* <button onClick={renderPlayListItems}>Click here for videos</button> */}
      <h1>Playlist links</h1>
      <form onSubmit={playListItems}>
        <input type="text" onChange={(e) => urlSpitter(e.target.value)} />
        <button type={"submit"}>Search</button>
      </form>
      <button onClick={renderPlayListItems}>Click here for titles</button>
      {renderPlayListItems()}
      <h1>YouTube Videos</h1>
      <form onSubmit={searchVideos}>
        <input type="text" onChange={(e) => setSearchQuery(e.target.value)} />
        <button type={"submit"}>Search</button>
      </form>
      <ul></ul>
    </div>
  );
}
