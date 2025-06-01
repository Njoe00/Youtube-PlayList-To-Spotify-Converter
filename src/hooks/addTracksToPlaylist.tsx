import axios from "axios";

export async function addTracksToPlaylist(tracksUri: any) {
  console.log(tracksUri, "trackURI");
  let spotifyPlaylistID = localStorage.getItem("spotify_playlist_ID");
  let token = sessionStorage.getItem("token");
  try {
    const response = await axios.post(
      `https://api.spotify.com/v1/playlists/${spotifyPlaylistID}/tracks`,
      { uris: tracksUri },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Songs added:", response);
  } catch (error) {
    console.error("Error adding songs to playlist:", error);
  }
}
