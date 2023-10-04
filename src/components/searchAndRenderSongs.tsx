import React, { useState, useEffect } from "react";
import axios from "axios";

type spotifyTracksObj = {
  name: string;
  album: { images: [{ url: string }] };
};
export default function searchAndRenderSongs({
  token,
  setTrackUri,
  trackUri,
  tracksQuery,
  songsArray,
}: {
  itemSearch: never[];
  searchKey: string;
  setSearchKey: React.Dispatch<any>;
  setItemSearch: React.Dispatch<any>;
  token: string | null;
  setTrackUri: React.Dispatch<any | object[]>;
  trackUri: string;
  tracksQuery: string;
  songsArray: string[];
}) {
  useEffect(() => {
    const searchItems = async (songsArray: any) => {
      songsArray.map(async (string: string, index: number) => {
        try {
          const { data } = await axios.get(
            "https://api.spotify.com/v1/search",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                q: string,
                type: "track",
              },
            }
          );

          if (data.tracks.items === 0) {
            return console.log(`Couldn't find "${tracksQuery}"`);
          }
          setTrackUri((trackUri: []) => [
            ...trackUri,
            data.tracks.items[index].uri,
          ]);
          console.log("song query succesful:", data);
        } catch (error) {
          console.error("Error finding tracks:", error);
        }
      });
      console.log(trackUri);
    };
    searchItems(songsArray);
  }, [tracksQuery]);

  return <div></div>;
}
