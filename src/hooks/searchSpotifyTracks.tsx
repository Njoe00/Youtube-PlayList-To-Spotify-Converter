import { playlistItemObj } from "@/app/page";
import { searchSpotifyTrack } from "./searchSpotifyTrack";
import { addTracksToPlaylist } from "./addTracksToPlaylist";

export async function searchSpotifyTracks(playListItem: [playlistItemObj]) {
  console.log("start fetching songs", playListItem);

  await Promise.allSettled(
    playListItem.map(async (item: playlistItemObj, index: number) => {
      const itemName = item.snippet.title;
      return await searchSpotifyTrack(itemName, index);
    })
  ).then((data: any) => {
    const tracksUri: any = [];
    data.map((promiseObj: any) => {
      tracksUri.push(promiseObj.value);
    });
    addTracksToPlaylist(tracksUri);
  });
}
