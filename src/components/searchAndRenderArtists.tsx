import React from "react";
import axios from "axios";

export default function SearchAndRenderArtists({
  setArtists,
  setSearchKey,
  token,
  searchKey,
  artists,
}: {
  setArtists: React.Dispatch<React.SetStateAction<never[]>>;
  setSearchKey: React.Dispatch<React.SetStateAction<string>>;
  token: string | null;
  searchKey: string;
  artists: never[];
}) {
  const searchArtists = async (e: any) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });
    setArtists(data.artists.items);
  };

  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id}>
        {artist.images.length ? (
          <img width={"25%"} src={artist.images[0].url} alt="" />
        ) : (
          <div>No Image</div>
        )}
        {artist.name}
      </div>
    ));
  };
  return (
    <div>
      <form onSubmit={searchArtists}>
        <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
        <button type={"submit"}>Search</button>
      </form>
      {renderArtists()}
    </div>
  );
}
