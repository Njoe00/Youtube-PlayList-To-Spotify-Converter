"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import Header from "../components/header";
import TitleCard from "../components/titlecard";
import MusicCard from "../components/musiccard";

type spotifyDataObj = {
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

export interface playListItemObj {
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
  const [playListItem, setPlayListItem] = useState<playListItemObj[]>([]);
  const [spotifyPlayListId, setSpotifyPlayListId] = useState("");

  const musicCardRef = useRef();

  const scrollToSection = (ref: any) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
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
    setToken(null);
    window.localStorage.removeItem("token");
  };

  const searchSpotifyTrack = async (itemName: string, index: number) => {
    const data: any = await axios
      .get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: itemName,
          type: "track",
        },
      })
      .catch((error) => {
        console.error("Error fetching YouTube data:", error);
      });
    if (data.data.tracks.items === 0) {
      console.log(`Couldn't find "${itemName}"`);
    }
    console.log(data.data.tracks.items[index].uri, "spotify URI");

    return data.data.tracks.items[index].uri;
  };

  async function searchSpotifyTracks(playListItem: [playListItemObj]) {
    console.log("start fetching songs", playListItem);

    await Promise.allSettled(
      playListItem.map(async (item: playListItemObj, index: number) => {
        const itemName = item.snippet.title;
        return await searchSpotifyTrack(itemName, index);
      })
    ).then((data: any) => {
      const tracksUri: any = [];
      data.map((promiseObj: any) => {
        tracksUri.push(promiseObj.value);
      });
      addTracksToPlaylist(tracksUri);
    });
  }

  async function addTracksToPlaylist(tracksUri: any) {
    console.log(tracksUri, "trackURI");
    try {
      const response = await axios.post(
        `https://api.spotify.com/v1/playlists/${spotifyPlayListId}/tracks`,
        { uris: tracksUri },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Songs added:", response);
    } catch (error) {
      console.error("Error adding songs to playlist:", error);
    }
  }

  return (
    <div className="relative">
      <div className="App">
        <Header logout={logout} token={token} />
        <header className="App-header p-10"></header>
      </div>
      <main className="bg-square-pattern h-screen w-screen text-main-text-color bg-cover font-serif">
        <div className="bg-gradient-to-b from-white to-purple-200 h-screen opacity-[.93]">
          <div className="bg-wave-pattern h-full w-full">
            <TitleCard
              musicCardRef={musicCardRef}
              scrollToSection={scrollToSection}
            />
          </div>
        </div>
      </main>
      <MusicCard
        musicCardRef={musicCardRef}
        spotifyPlayListId={spotifyPlayListId}
        playListItem={playListItem}
        setPlayListItem={setPlayListItem}
        playListId={playListId}
        setPlayListId={setPlayListId}
        searchSpotifyTracks={searchSpotifyTracks}
        token={token}
        setSpotifyPlayListId={setSpotifyPlayListId}
      />
    </div>
  );
}
