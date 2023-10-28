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
  console.log(token);

  async function searchSpotifyTrack(playListItem: [playListItemObj]) {
    console.log("start fetching songs", playListItem);
    playListItem.map(async (item: playListItemObj, index: number) => {
      const itemName = item.snippet.title;
      try {
        await axios
          .get("https://api.spotify.com/v1/search", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              q: itemName,
              type: "track",
            },
          })
          .then((data) => {
            if (data.data.tracks.items === 0) {
              console.log(`Couldn't find "${itemName}"`);
            }
            console.log(data, "spotify Data");
            console.log(data.data.tracks.items[index].uri, "spotify URI");

            setTrackUri((trackUri: []) => [
              ...trackUri,
              data.data.tracks.items[index].uri,
            ]);
          });
      } catch (error) {
        console.error("Error finding tracks:", error);
      }
    });
    console.log("finish fetching songs");
  }

  async function addTracksToPlaylist() {
    console.log(trackUri, "trackURI");
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
      console.error("Error adding songs to playlist:", error);
    }
  }

  return (
    <main className="bg-black h-[1080px] text-orange-400">
      <div className="App">
        <header className="App-header">
          <YoutubePlaylistTitles
            playListItem={playListItem}
            setPlayListItem={setPlayListItem}
            playListId={playListId}
            setPlayListId={setPlayListId}
            searchSpotifyTrack={searchSpotifyTrack}
            addTracksToPlaylist={addTracksToPlaylist}
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
  playListItem,
  setPlayListItem,
  playListId,
  setPlayListId,
  searchSpotifyTrack,
  addTracksToPlaylist,
}: {
  playListItem: playListItemObj[];
  setPlayListItem: React.Dispatch<React.SetStateAction<playListItemObj[]>>;
  playListId: string | undefined;
  setPlayListId: React.Dispatch<React.SetStateAction<string | undefined>>;
  searchSpotifyTrack: any;
  addTracksToPlaylist: any;
}) {
  const YOUTUBE_API = "AIzaSyDPz_HnRfsgRz708I_83usC0VHIdlVMW9k";

  const fetchPlaylist = async () => {
    const response: any = await axios
      .get("https://www.googleapis.com/youtube/v3/playlistItems", {
        params: {
          part: "snippet, contentDetails",
          key: YOUTUBE_API,
          maxResults: 100,
          playlistId: playListId,
        },
      })
      .catch((error) => {
        console.error("Error fetching YouTube data:", error);
      });
    return response.data.items;
  };

  const handleClick = async () => {
    const playlist = await fetchPlaylist();
    setPlayListItem(playlist);
    await searchSpotifyTrack(playlist);
    await addTracksToPlaylist();
  };

  const urlSpitter = (e: string) => {
    const breakpoint = /\list=/;
    const splitUrl = e.split(breakpoint);
    setPlayListId(splitUrl[1]);
  };

  return (
    <div>
      <h1>Playlist links</h1>
      <input type="text" onChange={(e) => urlSpitter(e.target.value)} />
      <button onClick={handleClick}>Search</button>
    </div>
  );
}
// curl --request GET \
//   --url 'https://api.spotify.com/v1/tracks?ids=7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B' \
//   --header 'Authorization: Bearer BQDiAoyy60v-v-yfRMd899m8WGdtXr5dPh0luaNcFAE1gA2UVprXZYawh1wtNGGEpjRKpKzItpIlnR3QH8jhIlwv28kVySTl6-WzKijz2vataFI2i_jAqXc6YZvs0Wl3RWxNPsvXBXePmRkbab8dj7ppjlUd6ZiRaAYALEruwP6CeCM_QGfbiQ3x1GBMzaqYCJt3qaH0TF3KpmBtSvm1KH2emgyE5Jy568x2k3rdpq7VK4ASzA&token_type'
