import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Playlist({
  token,
  tracks,
  trackUri,
  passTrackUri,
  setPassTrackUri,
  setSpotifyPlayListId,
}: {
  token: string | null;
  tracks: string;
  trackUri: string[];
  passTrackUri: boolean;
  setPassTrackUri: React.Dispatch<React.SetStateAction<boolean>>;
  setSpotifyPlayListId: React.Dispatch<React.SetStateAction<string>>;
}) {
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
      setSpotifyPlayListId(response.data.id);
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
      <button onClick={createPlaylist}>Create Playlist</button>
    </div>
  );
}
