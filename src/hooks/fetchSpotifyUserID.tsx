import axios from "axios";

export const fetchSpotifyUserID = async () => {
  let token = sessionStorage.getItem("token");
  const data: any = await axios
    .get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      console.error("Error fetching User data:", error);
    });
  if (!data) {
    console.log(`ERROR ${data}`);
  }
  console.log(`User ID ${data.data.id}`);
  localStorage.setItem("spotify_ID", data.data.id);
};
