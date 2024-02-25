import React from "react";

import Playlist from "../../components/playlist";
import YoutubePlaylistTitles from "../../components/youtubeplaylist";

export default function MusicCard({
  playListItem,
  setPlayListItem,
  setPlayListId,
  searchSpotifyTracks,
  token,
  setSpotifyPlayListId,
  playListId,
  spotifyPlayListId,
  musicCardRef,
  addTracksToPlaylist,
}: {
  spotifyPlayListId: any;
  playListId: any;
  playListItem: any;
  setPlayListItem: any;
  setPlayListId: any;
  searchSpotifyTracks: any;
  token: any;
  setSpotifyPlayListId: any;
  musicCardRef: React.RefObject<HTMLElement | undefined>;
  addTracksToPlaylist: any;
}) {
  return (
    <div
      ref={musicCardRef as React.RefObject<HTMLDivElement>}
      className="bg-white text-main-text-color w-full h-screen justify-center flex flex-col items-center"
    >
      <div className="text-center">
        <h1 className="text-primary-color mb-6">SERVICES</h1>
        <h2 className="text-4xl font-bold flex justify-center text-center flex-row pb-64">
          Take Your Music Game To <br /> The Next Level
        </h2>
      </div>
      {spotifyPlayListId ? (
        <YoutubePlaylistTitles
          playListItem={playListItem}
          setPlayListItem={setPlayListItem}
          playListId={playListId}
          setPlayListId={setPlayListId}
          searchSpotifyTracks={searchSpotifyTracks}
        />
      ) : (
        <Playlist
          addTracksToPlaylist={addTracksToPlaylist}
          token={token}
          setSpotifyPlayListId={setSpotifyPlayListId}
        />
      )}
    </div>
  );
}
