"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import Playlist from "./playlist/page";
import Header from "./header/page";
import TitleCard from "./title_card/page";
import YoutubePlaylistTitles from "./youtubeplaylist/page";

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
  const CLIENT_ID = "8d24557566154e98abbd389e45758e57";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE = "playlist-modify-private playlist-modify-public";
  const [token, setToken] = useState<string | null>("");
  const [tracks, setTracks] = useState("");
  const [trackUri, setTrackUri] = useState<string | any>([]);
  const [passTrackUri, setPassTrackUri] = useState(false);
  const [playListId, setPlayListId] = useState<string>();
  const [playListItem, setPlayListItem] = useState<playListItemObj[]>([]);
  const [spotifyPlayListId, setSpotifyPlayListId] = useState("");

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

  // setTrackUri((trackUri: []) => [
  //   ...trackUri,
  //   data.data.tracks.items[index].uri,
  // ])
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
        <Header token={token} />
        <header className="App-header p-10 text-red-400 z-50 item-center"></header>
      </div>
      <main className="bg-square-pattern h-screen w-screen text-main-text-color bg-cover font-serif">
        <div className="bg-gradient-to-b from-white to-purple-200 h-screen opacity-[.93]">
          <div className="bg-wave-pattern h-full w-full">
            <TitleCard />
            {spotifyPlayListId ? (
              <YoutubePlaylistTitles
                playListItem={playListItem}
                setPlayListItem={setPlayListItem}
                playListId={playListId}
                setPlayListId={setPlayListId}
                searchSpotifyTracks={searchSpotifyTracks}
              />
            ) : (
              <Playlist
                token={token}
                tracks={tracks}
                trackUri={trackUri}
                passTrackUri={passTrackUri}
                setPassTrackUri={setPassTrackUri}
                setSpotifyPlayListId={setSpotifyPlayListId}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
