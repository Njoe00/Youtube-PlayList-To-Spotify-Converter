import React, { useState } from "react";
import axios from "axios";

export default function Playlist({
  token,
  tracks,
}: {
  token: string | null;
  tracks: string;
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

  const addTracksToPlaylist = async () => {
    try {
      const response = await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        { uris: [tracks] },
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
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Playlist Name"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
      />
      <button onClick={createPlaylist}>Create Playlist</button>
      <div>
        <input
          type="text"
          placeholder="Tracks"
          value={trackName}
          onChange={(e) => setTrackName(e.target.value)}
        />
        <button onClick={addTracksToPlaylist}>Add tracks</button>
      </div>
    </div>
  );
}
