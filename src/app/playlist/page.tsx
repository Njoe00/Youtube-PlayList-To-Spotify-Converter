import React, { useState } from "react";
import axios from "axios";

export default function Playlist({ token }: { token: string | null }) {
  const [playlistName, setPlaylistName] = useState("");

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

      console.log("Playlist created:", response.data);
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
      <button onClick={createPlaylist}>Create Spotify Playlist</button>
    </div>
  );
}
