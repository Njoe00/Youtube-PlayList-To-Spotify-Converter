import React from "react";

export default function LoginCard({
  token,
  logout,
}: {
  token: string | null;
  logout: () => void;
}) {
  const CLIENT_ID = "8d24557566154e98abbd389e45758e57";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE = "playlist-modify-private playlist-modify-public";
  const SHOW_DIALOG = "true";

  return (
    <div className="flex flex-row ">
      <div>
        {!token ? (
          <button className="text-xl transition delay-150 duration-200 hover:bg-main-text-color ease-in-out text-white bg-primary-color w-[100px] h-[50px] font-light rounded-full mr-10 ">
            <a
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&show_dialog=${SHOW_DIALOG}`}
            >
              Login
            </a>
          </button>
        ) : (
          <button
            className="text-xl text-white bg-primary-color w-[100px] h-[50px] font-light rounded-full mr-10 hover:bg-black ease-in-out"
            onClick={logout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
