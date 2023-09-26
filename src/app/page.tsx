"use client";
import React, { useEffect, useState } from "react";

import SearchAndRenderArtists from "../components/searchAndRenderArtists";
import SearchAndRenderSongs from "@/components/searchAndRenderSongs";
import Playlist from "./playlist/page";

export default function Home() {
  const CLIENT_ID = "8d24557566154e98abbd389e45758e57";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE = "playlist-modify-private playlist-modify-public";
  const [token, setToken] = useState<string | null>("");
  const [searchKey, setSearchKey] = useState("");
  const [itemSearch, setItemSearch] = useState<string | any>([]);
  const [artists, setArtists] = useState<any>([]);
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

  const searchArtists = async (e: any) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });
    setArtists(data.artists.items);
  };

  const searchTracks = async (e: any) => {
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
    setTracks(data.tracks.items[0].uri);
    console.log(tracks);
  };

  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id}>
        {artist.images.length ? (
          <img width={"25%"} src={artist.images[0].url} alt="" />
        ) : (
          <div>No Image</div>
        )}
        {artist.name}
      </div>
    ));
  };

  const searchItems = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchKey,
          type: "track",
        },
      });
      if (data.tracks.items <= 0) {
        return console.log(`Couldn't find "${searchKey}"`);
      }
      setItemSearch(data.tracks.items);
      console.log("song query succesful:", data);
    } catch (error) {
      console.error("Error finding tracks:", error);
    }
  };

  const renderTracks = () => {
    return itemSearch.map((data: spotifyDataObj, id: number) => (
      <div className="text-orange-600 text-lg" key={id}>
        {data ? (
          <>
            {console.log(data)}
            <img alt="" width={"25%"} src={data.album.images[0].url} />
            {data.name}
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
        <SearchAndRenderArtists
          setArtists={setArtists}
          setSearchKey={setSearchKey}
          token={token}
          searchKey={searchKey}
          artists={artists}
        />
        <SearchAndRenderSongs
          itemSearch={itemSearch}
          token={token}
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          setItemSearch={setItemSearch}
        />
      </div>
      <Playlist token={token} tracks={tracks} />
    </main>
  );
}
