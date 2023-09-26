import React from "react";
import axios from "axios";

type spotifyTracksObj = {
  name: string;
  album: { images: [{ url: string }] };
};
export default function searchAndRenderSongs({
  itemSearch,
  searchKey,
  setSearchKey,
  setItemSearch,
  token,
}: {
  itemSearch: never[];
  searchKey: string;
  setSearchKey: React.Dispatch<any>;
  setItemSearch: React.Dispatch<any>;
  token: string | null;
}) {
  const searchItems = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchKey,
          type: "track",
        },
      });
      if (data.tracks.items <= 0) {
        return console.log(`Couldn't find "${searchKey}"`);
      }
      setItemSearch(data.tracks.items);
      console.log("song query succesful:", data);
    } catch (error) {
      console.error("Error finding tracks:", error);
    }
  };
  const renderTracks = () => {
    return itemSearch.map((data: spotifyTracksObj, id: number) => (
      <div className="text-orange-600 text-lg" key={id}>
        {data ? (
          <>
            <img alt="" width={"25%"} src={data.album.images[0].url} />
            {data.name}
          </>
        ) : (
          <div> "No Songs Available"</div>
        )}
      </div>
    ));
  };
  return (
    <div>
      <form onSubmit={searchItems}>
        <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
        <button type={"submit"}>Search</button>
      </form>
      {renderTracks()}
    </div>
  );
}
