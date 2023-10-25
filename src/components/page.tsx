import React, { useState } from "react";

export default function LoginCard({
  token,
  logout,
}: {
  token: string;
  logout: () => void;
}) {
  const CLIENT_ID = "8d24557566154e98abbd389e45758e57";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE = "playlist-modify-private playlist-modify-public";
  const SHOW_DIALOG = "true";
  const [email, setEmail] = useState("");

  return (
    <div className="flex justify-center flex-row">
      <div className="py-[14px] px-[20px] bg-spotfiy-colors flex justify-center text-black rounded-full">
        <div>
          {!token ? (
            <a
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&show_dialog=${SHOW_DIALOG}`}
            >
              Login to Spotify
            </a>
          ) : (
            <button onClick={logout}>Logout</button>
          )}
        </div>
      </div>
    </div>
  );
}
