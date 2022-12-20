import React from "react";
import Navbar from "../components/Navbar";
import Favorites from "../components/Favorites";
import Playlists from "../components/Playlists";
import ReturnPageButton from "../components/ReturnPageButton";

function Library() {
  return (
    <div className="libraryContainer">
      <ReturnPageButton />
      <h1>My Library</h1>
      <div className="libraryPage">
        <Favorites />
        <Playlists />
      </div>
      <Navbar />
    </div>
  );
}

export default Library;
