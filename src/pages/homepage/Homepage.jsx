import React, { useEffect, useState } from "react";
import {
  getRecommendationsApi,
  getSongsApi,
  getTopArtistsApi,
  getTrendingSongsApi,
} from "../../apis/Api";
import HeroSlider from "../../components/HeroSlider";
import HomePageSection from "../../components/HomePageSection";

const Homepage = () => {
  const authToken = localStorage.getItem("token");

  const [topArtists, setTopArtists] = useState([]);
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [aiRecommendedSongs, setAiRecommendedSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artistsRes, trendingRes, songsRes, aiRecommendedRes] =
          await Promise.all([
            getTopArtistsApi(),
            getTrendingSongsApi(1), //static page number for now
            getSongsApi(1), //static page number for now
            getRecommendationsApi({
              selected_song: "Hello",
            }),
          ]);

        setTopArtists(artistsRes.data.data.artist);
        setTrendingSongs(trendingRes.data.data.song);
        setRecommendedSongs(songsRes.data.data.song);
        setAiRecommendedSongs(aiRecommendedRes.data.recommended_songs);
      } catch (err) {
        setError("An error occurred while fetching data.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authToken]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-11 p-4">
          <HeroSlider items={recommendedSongs} type="normal" />
          {/* <HeroSlider items={aiRecommendedSongs} type="ai" /> */}
          <HomePageSection
            title="Recommended Songs"
            items={aiRecommendedSongs}
            type="song"
            recommendation="ai"
          />
          <HomePageSection
            title="Trending Songs"
            items={trendingSongs}
            type="song"
            recommendation="normal"
          />
          <HomePageSection
            title="Top Artists"
            items={topArtists}
            type="artist"
            recommendation="normal"
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
