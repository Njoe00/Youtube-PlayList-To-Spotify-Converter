import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Playlist({
  token,
  tracks,
  trackUri,
  passTrackUri,
  setPassTrackUri,
}: {
  token: string | null;
  tracks: string;
  trackUri: string[];
  passTrackUri: boolean;
  setPassTrackUri: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [playlistName, setPlaylistName] = useState("");
  const [trackName, setTrackName] = useState("");
  const [playlistId, setPlaylistId] = useState("");

  const createPlaylist = async () => {
    try {
      const response = await axios.post(
        "https://api.spotify.com/v1/me/playlists",
        {
          name: playlistName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setPlaylistId(response.data.id);
      console.log("Playlist created:", response.data);
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  useEffect(() => {
    const addTracksToPlaylist = async (trackUri: string[]) => {
      try {
        const response = await axios.post(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
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
      setPassTrackUri(false);
    };
    addTracksToPlaylist(trackUri);
  }, [passTrackUri]);

  return (
    <div>
      <input
        type="text"
        placeholder="Playlist Name"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
      />
      <button onClick={createPlaylist}>Create Playlist</button>
    </div>
  );
}
