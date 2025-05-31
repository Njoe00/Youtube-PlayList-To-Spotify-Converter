import axios from "axios";

export const searchSpotifyTrack = async (itemName: string, index: number) => {
  let token = sessionStorage.getItem("token");
  const data: any = await axios
    .get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: itemName,
        type: "track",
      },
    })
    .catch((error) => {
      console.error("Error fetching YouTube data:", error);
    });
  if (data.data.tracks.items === 0) {
    console.log(`Couldn't find "${itemName}"`);
  }
  console.log(data.data.tracks.items[index].uri, "spotify URI");

  return data.data.tracks.items[index].uri;
};
