"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import Playlist from "./playlist/page";

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

export default function Home() {
  const CLIENT_ID = "8d24557566154e98abbd389e45758e57";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE = "playlist-modify-private playlist-modify-public";
  const [token, setToken] = useState<string | null>("");
  const [tracks, setTracks] = useState("");
  const [trackUri, setTrackUri] = useState<string | any>([]);
  const [tracksQuery, setTracksQuery] = useState<string>("");
  const [youtubePlaylistTitles, setYoutubePlaylistTitles] = useState([]);
  const [passTrackUri, setPassTrackUri] = useState(false);
  const [playListId, setPlayListId] = useState("");
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

  async function SearchSpotifyTrack() {
    youtubePlaylistTitles.map(async (songQuery: string, index: number) => {
      try {
        const { data } = await axios.get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            q: songQuery,
            type: "track",
          },
        });

        if (data.tracks.items === 0) {
          return console.log(`Couldn't find "${songQuery}"`);
        }
        setTrackUri((trackUri: []) => [
          ...trackUri,
          data.tracks.items[index].uri,
        ]);
        console.log("song query succesful:", data.tracks.items[0].album.name);
      } catch (error) {
        console.error("Error finding tracks:", error);
      }
    });
    addTracksToPlaylist();
    console.log(trackUri, "line 46");
  }

  async function addTracksToPlaylist() {
    try {
      const response = await axios.post(
        `https://api.spotify.com/v1/playlists/${spotifyPlayListId}/tracks`,
        { uris: trackUri },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Songs added:", response);
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  }

  return (
    <main className="bg-black h-[1080px] text-orange-400">
      <div className="App">
        <header className="App-header">
          <YoutubePlaylistTitles
            youtubePlaylistTitles={youtubePlaylistTitles}
            playListItem={playListItem}
            setPlayListItem={setPlayListItem}
            playListId={playListId}
            setPlayListId={setPlayListId}
            SearchSpotifyTrack={SearchSpotifyTrack}
          />

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
      </div>
      <Playlist
        token={token}
        tracks={tracks}
        trackUri={trackUri}
        passTrackUri={passTrackUri}
        setPassTrackUri={setPassTrackUri}
        setSpotifyPlayListId={setSpotifyPlayListId}
      />
    </main>
  );
}

export function YoutubePlaylistTitles({
  youtubePlaylistTitles,
  playListItem,
  setPlayListItem,
  playListId,
  setPlayListId,
  SearchSpotifyTrack,
}: {
  youtubePlaylistTitles: string[];
  playListItem: playListItemObj[];
  setPlayListItem: React.Dispatch<React.SetStateAction<playListItemObj[]>>;
  playListId: string;
  setPlayListId: React.Dispatch<React.SetStateAction<string>>;
  SearchSpotifyTrack: () => void;
}) {
  const YOUTUBE_API = "AIzaSyDPz_HnRfsgRz708I_83usC0VHIdlVMW9k";

  const playListItems = async (e: any) => {
    e.preventDefault();
    await axios
      .get("https://www.googleapis.com/youtube/v3/playlistItems", {
        params: {
          part: "snippet, contentDetails",
          key: YOUTUBE_API,
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
    await storeYoutubeTitles();
  };

  const storeYoutubeTitles = async () => {
    for (let i = 0; i < playListItem.length; i++) {
      youtubePlaylistTitles.push(playListItem[i].snippet.title);
    }
    console.log(youtubePlaylistTitles);
    SearchSpotifyTrack();
  };

  const urlSpitter = (e: string) => {
    const breakpoint = /\list=/;
    const splitUrl = e.split(breakpoint);
    setPlayListId(splitUrl[1]);
  };

  return (
    <div>
      <h1>Playlist links</h1>
      <form onSubmit={playListItems}>
        <input type="text" onChange={(e) => urlSpitter(e.target.value)} />
        <button type={"submit"}>Search</button>
      </form>
    </div>
  );
}
