import React, { useState } from "react";

export default function LoginCard() {
  const CLIENT_ID = "8d24557566154e98abbd389e45758e57";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const [email, setEmail] = useState("");
  return (
    <div className="flex justify-center pt-10 flex-col">
      <div className="absolute w-[600px] h-[600px] flex justify-center bg-white">
        <a
          className="absolute flex"
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </a>
        <div className="h-12 w-[400px] absolute flex">
          <input
            value={email}
            placeholder="Enter your email here"
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
