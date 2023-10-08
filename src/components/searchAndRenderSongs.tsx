<<<<<<< HEAD
import React, { useEffect } from "react";
=======
import React, { useState, useEffect } from "react";
>>>>>>> 72c2d8a (adding function to setState for search query by maping array to tracksQuery, then adding a loop to the API call to pass to the stings to the query. Finally, adding a state to track the URIs and adding them the state)
import axios from "axios";

export default function searchAndRenderSongs({
<<<<<<< HEAD
=======
  setSearchKey,
>>>>>>> 72c2d8a (adding function to setState for search query by maping array to tracksQuery, then adding a loop to the API call to pass to the stings to the query. Finally, adding a state to track the URIs and adding them the state)
  token,
  setTrackUri,
  trackUri,
  tracksQuery,
  songsArray,
}: {
  token: string | null;
  setTrackUri: React.Dispatch<any | object[]>;
  trackUri: string;
  tracksQuery: string;
  songsArray: string[];
}) {
  useEffect(() => {
    const searchItems = async (songsArray: any) => {
<<<<<<< HEAD
      songsArray.map(async (songQuery: string, index: number) => {
=======
      songsArray.map(async (string: string, index: number) => {
>>>>>>> 72c2d8a (adding function to setState for search query by maping array to tracksQuery, then adding a loop to the API call to pass to the stings to the query. Finally, adding a state to track the URIs and adding them the state)
        try {
          const { data } = await axios.get(
            "https://api.spotify.com/v1/search",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
<<<<<<< HEAD
                q: songQuery,
=======
                q: string,
>>>>>>> 72c2d8a (adding function to setState for search query by maping array to tracksQuery, then adding a loop to the API call to pass to the stings to the query. Finally, adding a state to track the URIs and adding them the state)
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
<<<<<<< HEAD
=======
          console.log(trackUri);
>>>>>>> 72c2d8a (adding function to setState for search query by maping array to tracksQuery, then adding a loop to the API call to pass to the stings to the query. Finally, adding a state to track the URIs and adding them the state)
          console.log("song query succesful:", data);
        } catch (error) {
          console.error("Error finding tracks:", error);
        }
      });
<<<<<<< HEAD
      console.log(trackUri);
=======
>>>>>>> 72c2d8a (adding function to setState for search query by maping array to tracksQuery, then adding a loop to the API call to pass to the stings to the query. Finally, adding a state to track the URIs and adding them the state)
    };
    searchItems(songsArray);
  }, [tracksQuery]);

<<<<<<< HEAD
  return <div></div>;
=======
  // const renderTracks = () => {
  //   return itemSearch.map((data: spotifyTracksObj, id: number) => (
  //     <div className="text-orange-600 text-lg" key={id}>
  //       {data ? (
  //         <>
  //           <img alt="" width={"25%"} src={data.album.images[0].url} />
  //           {data.name}
  //         </>
  //       ) : (
  //         <div> "No Songs Available"</div>
  //       )}
  //     </div>
  //   ));
  // };
  return (
    <div>
      {/* <button onClick={}>Click me to pass title arrays</button> */}
      {/* <form onSubmit={searchItems}>
        <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
        <button type={"submit"}>search tracks</button>
      </form> */}
      {/* {renderTracks()} */}
    </div>
  );
>>>>>>> 72c2d8a (adding function to setState for search query by maping array to tracksQuery, then adding a loop to the API call to pass to the stings to the query. Finally, adding a state to track the URIs and adding them the state)
}
