import React, { useEffect } from "react";
import axios from "axios";

function searchAndRenderSongs({
  token,
  setTrackUri,
  trackUri,
  tracksQuery,
  youtubePlaylistTitles,
  setPassTrackUri,
  passTitles,
  setPassTitles,
}: {
  token: string | null;
  setTrackUri: React.Dispatch<any | object[]>;
  trackUri: string[];
  tracksQuery: string;
  youtubePlaylistTitles: string[];
  setPassTrackUri: React.Dispatch<React.SetStateAction<boolean>>;
  passTitles: boolean;
  setPassTitles: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return <div></div>;
}
