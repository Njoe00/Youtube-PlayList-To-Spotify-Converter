import React, { useEffect, useState } from "react";
import axios from "axios";

const [playlist, setPlaylist] = useState([]);

const createPlaylist = async (e: any) => {
  e.preventDefault();
  const { data } = await axios.post(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    }
  );
  setPlaylist(data);
};
export default function Playlist() {
  return <div></div>;
}
