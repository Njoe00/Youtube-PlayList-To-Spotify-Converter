"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/header";
import TitleCard from "../components/titleCard";
import { fetchSpotifyUserID } from "../hooks/fetchSpotifyUserID";

if (sessionStorage.getItem("token") !== null) {
  fetchSpotifyUserID();
}

export type spotifyDataObj = {
  album: { images: [{ url: string }] };
  artists: [];
  available_markets: [];
  disc_number: number;
  duration: number;
  explicit: boolean;
  external_ids: object;
  href: string;
  id: number;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: null;
  track_number: number;
  type: string;
  uri: string;
};

export interface playlistItemObj {
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

export default function Home() {
  const [token, setToken] = useState<string | null>("");
  const [playListId, setPlayListId] = useState<string>();
  const [playListItem, setPlayListItem] = useState<playlistItemObj[]>([]);
  const [spotifyPlayListId, setSpotifyPlayListId] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.sessionStorage.getItem("token");
    if (!token) {
      let token = hash
        .substring(1)
        .split("&")
        .find((elem: string) => elem.startsWith("access_token"));

      if (token) {
        const tokenFromHash = hash.split("=")[1];

        if (tokenFromHash) {
          window.location.hash = "";
          window.sessionStorage.setItem("token", tokenFromHash);
          token = tokenFromHash;
        }
      }
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken(null);
    window.sessionStorage.removeItem("token");
  };

  return (
    <main
      className="h-full w-full text-main-text-color bg-cover font-serif"
      style={{ backgroundImage: "url(/square-pattern.jpg)" }}
    >
      <div>
        <Header logout={logout} token={token} />
        <header className="App-header"></header>
      </div>
      <div className="bg-gradient-to-b bg-cover from-white to-purple-200 h-screen opacity-[.93]">
        <div
          className="h-full w-full shrink bg-cover"
          style={{
            backgroundImage: "url(/layered-waves.svg)",
          }}
        >
          <TitleCard
            playListItem={playListItem}
            setPlayListItem={setPlayListItem}
            setPlayListId={setPlayListId}
            setSpotifyPlayListId={setSpotifyPlayListId}
            playListId={playListId}
            spotifyPlayListId={spotifyPlayListId}
          />
        </div>
      </div>
    </main>
  );
}
