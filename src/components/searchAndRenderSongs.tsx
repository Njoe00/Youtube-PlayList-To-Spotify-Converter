import React, { useEffect } from "react";
import axios from "axios";

export default function searchAndRenderSongs({
  token,
  setTrackUri,
  trackUri,
  tracksQuery,
  youtubePlaylistTitles,
}: {
  token: string | null;
  setTrackUri: React.Dispatch<any | object[]>;
  trackUri: string;
  tracksQuery: string;
  youtubePlaylistTitles: string[];
}) {
  useEffect(() => {
    const searchItems = async (songsArray: any) => {
      songsArray.map(async (songQuery: string, index: number) => {
        try {
          const { data } = await axios.get(
            "https://api.spotify.com/v1/search",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                q: songQuery,
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
      console.log(trackUri, "line 46");
    };
    searchItems(youtubePlaylistTitles);
  }, [tracksQuery]);

  return <div></div>;
}
