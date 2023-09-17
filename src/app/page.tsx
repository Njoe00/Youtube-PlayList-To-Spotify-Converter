"use client";
import React, { useEffect, useState } from "react";

import SearchAndRenderArtists from "../components/searchAndRenderArtists";
import SearchAndRenderSongs from "@/components/searchAndRenderSongs";
import YoutubePlaylistTitles from "./youtube-playlist-titles/page";
import Playlist from "./playlist/page";

export default function Home() {
  const CLIENT_ID = "8d24557566154e98abbd389e45758e57";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE = "playlist-modify-private playlist-modify-public";
  const [token, setToken] = useState<string | null>("");
  const [searchKey, setSearchKey] = useState("");
  const [itemSearch, setItemSearch] = useState([]);
  const [artists, setArtists] = useState<string | any>([]);
  const [trackUri, setTrackUri] = useState("");
  const [tracksQuery, setTracksQuery] = useState<string>("");

  const songsArray = [
    "Ai Higuchi “Akuma no Ko” Anime Special Ver",
    "RADWIMPS - Suzume feat. Toaka [Official Lyric Video]",
    "070 Shake - Guilty Conscience (Official Video)",
    "Mariya Takeuchi - Plastic Love (Official Music Video)",
  ];
  const [tracks, setTracks] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token: string | null = window.localStorage.getItem("token");
    if (!token && hash) {
      let token = hash
        .substring(1)
        .split("&")
        .find((elem: string) => elem.startsWith("access_token"));

      if (hash) {
        const tokenFromHash = hash.split("=")[1];

        if (tokenFromHash) {
          window.location.hash = "";
          window.localStorage.setItem("token", tokenFromHash);
          token = tokenFromHash;
        }
      }
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const setTrackQuery = async () => {
    await Promise.allSettled(
      songsArray.map(async (string) => {
        setTracksQuery(string);
      })
    );
  };

  const searchItems = async (e: any) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "track",
      },
    });

    console.log("song searched for", response.data) {
    } catch {
      console.log("error occured", error.response.data)
    }
    setItemSearch(data.tracks.items);
  };

  const renderTracks = () => {
    return itemSearch.map((data, id) => (
      <div className="text-orange-600 text-lg" key={id}>
        {data ? (
          <>
            <img alt="" width={"25%"} src={data.album.images[0].url} />
            {data.name}
            {console.log("hello")}
          </>
        ) : (
          <div> "No Songs Available"</div>
        )}
      </div>
    ));
  };

  return (
    <main className="bg-black h-[1080px] text-orange-400">
      <div className="App">
        <header className="App-header">
          <YoutubePlaylistTitles />
          <h1>Spotify React</h1>
          {!token ? (
            <a
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
            >
              Login to Spotify
            </a>
          ) : (
            <button onClick={logout}>Logout</button>
          )}
        </header>
        <button onClick={setTrackQuery}>Click here to pass tracks</button>
        <SearchAndRenderArtists
          setArtists={setArtists}
          setSearchKey={setSearchKey}
          token={token}
          searchKey={searchKey}
          artists={artists}
        />
        <SearchAndRenderSongs
          token={token}
          setTrackUri={setTrackUri}
          trackUri={trackUri}
          tracksQuery={tracksQuery}
          songsArray={songsArray}
        />
      </div>
      <Playlist token={token} tracks={tracks} />
    </main>
  );
}
