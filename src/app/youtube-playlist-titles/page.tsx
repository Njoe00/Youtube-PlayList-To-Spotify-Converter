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
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
        console.log("line 26", videos);
      })
      .catch((error) => {
        console.error("Error fetching YouTube data:", error);
      });
  };
  const renderVideos = () => {
    return videos.map((video, id) => (
      <li key={id}>
        <img
          src={video.snippet.thumbnails.high.url}
          width={video.snippet.thumbnails.high.width}
          height={video.snippet.thumbnails.high.height}
          // alt={video.snippet.thumbnails.default.url}
        />
        {video.snippet.title}
      </li>
    ));
  };

  return (
    <div>
      <h1>YouTube Videos</h1>
      <form onSubmit={searchVideos}>
        <input type="text" onChange={(e) => setSearchQuery(e.target.value)} />
        <button type={"submit"}>Search</button>
      </form>
      <button onSubmit={renderVideos}>Click here</button>
      {renderVideos()}
    </div>
  );
}
