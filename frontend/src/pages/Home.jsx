import React from "react";
import Hero from "../components/Hero";
import FeatureSection from "../components/FeatureSection";

const Home = () => {
  return (
    <>
      <Hero />
      <FeatureSection />
      <div id="contact">
        <div style={{ height: "100px" }} />
      </div>
    </>
  );
};

export default Home;
