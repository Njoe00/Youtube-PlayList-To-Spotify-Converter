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
  const SHOW_DIALOG = false;
  const [email, setEmail] = useState("");

  return (
    <div className="flex justify-center pt-10 flex-col">
      <div className="w-[600px] h-[600px] flex justify-center text-orange-400">
        <div className="">
          {!token ? (
            <a
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&show_dialog${SHOW_DIALOG}`}
            >
              Login to Spotify
            </a>
          ) : (
            <button onClick={logout}>Logout</button>
          )}
        </div>
        {/* <div className="h-12 w-[400px] absolute flex">
          <input
            value={email}
            placeholder="Enter your email here"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div> */}
      </div>
    </div>
  );
}
