import React, { useEffect, useState } from "react";
import axios from "axios";

// const [playlist, setPlaylist] = useState([]);

export default function Playlist({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) {
  console.log("userId", userId, "token", token);
  const createPlaylist = async (userId: string, token: string) => {
    const { data } = await axios.post(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          name: "New Playlist",
          description: "New playlist description",
          public: false,
        },
      }
    );
    console.log("line 25", data);
  };
  return <div></div>;
}
