import Link from "next/link";

export default function TitleCard({
  playListItem,
  setPlayListItem,
  setPlayListId,
  setSpotifyPlayListId,
  playListId,
  spotifyPlayListId,
}: {
  playListItem: any;
  setPlayListItem: any;
  setPlayListId: any;
  setSpotifyPlayListId: any;
  playListId: any;
  spotifyPlayListId: any;
}) {
  return (
    <div className="flex flex-col font-serif xl:items-start xl:text-start items-center text-center xl:pl-32 pt-32 z-50">
      <h1 className="text-[90px] text-7xl flex-row font-[1000] min-h-fit min-w-fit">
        The Power <br />
        of Good Music
      </h1>
      <button className="text-xl m-4 text-white bg-primary-color w-[250px] h-[50px] font-light rounded-full transition delay-150 duration-200 hover:bg-main-text-color ease-in-out">
        <a href="http://localhost:3000/converter"></a>
        <Link
          href={{
            pathname: "/converter",
            query: {
              playListItem: playListItem,
              setPlayListItem: setPlayListItem,
              setPlayListId: setPlayListId,
              setSpotifyPlayListId: setSpotifyPlayListId,
              playListId: playListId,
              spotifyPlayListId: spotifyPlayListId,
            },
          }}
        >
          Click here to start now
        </Link>
      </button>
    </div>
  );
}
