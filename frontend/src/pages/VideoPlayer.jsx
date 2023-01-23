/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import CurrentVideosContext from "../../contexts/videosContext";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Comment from "../components/Comment";
import VideoPlay from "../components/VideoPlay";

function VideoPlayer() {
  const { selectedId } = useContext(CurrentVideosContext);

  const backUrl = import.meta.env.VITE_BACKEND_URL;

  const [videoPlayed, setVideoPlayed] = useState([]);
  const [currentVideoComments, setCurrentVideoComments] = useState([]);

  useEffect(() => {
    axios
      .get(`${backUrl}/api/videos/infos/${selectedId}`)
      .then((response) => {
        setVideoPlayed(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/api/videos/infos/${selectedId}`)
      .then((res) => res.json())
      .then((videos) => setCurrentVideoComments(videos.comment));
  }, []);
  return (
    <div className="player-page">
      <Header />
      <Navbar />
      <VideoPlay video={videoPlayed} />
      <Slider />
      <Comment currentVideoComments={currentVideoComments} />
    </div>
  );
}

export default VideoPlayer;
