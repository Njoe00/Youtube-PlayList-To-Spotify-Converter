"use client";
import React, { useEffect, useState } from "react";

import SearchAndRenderArtists from "../components/searchAndRenderArtists";
import SearchAndRenderSongs from "@/components/searchAndRenderSongs";

export default function Home() {
  const CLIENT_ID = "8d24557566154e98abbd389e45758e57";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const [token, setToken] = useState<string | null>("");
  const [searchKey, setSearchKey] = useState("");
  const [itemSearch, setItemSearch] = useState<string | any>([]);
  const [artists, setArtists] = useState<any>([]);

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

  return (
    <main className="bg-black h-[1080px] text-orange-400">
      <div className="App">
        <header className="App-header">
          <h1>Spotify React</h1>
          {!token ? (
            <a
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
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
    </main>
  );
}
