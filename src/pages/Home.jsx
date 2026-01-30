import React from "react";
import Hero from "../components/Hero";
import Pricing from "../components/Pricing";
import Insurance from "../components/Insurance";
import DigitalPayment from "../components/DigitalPayment";
import Lending from "../components/Lending";

const Home = () => {
  return (
    <>
      <Hero />
      <div id="features">
        <Pricing />
      </div>
      <div id="pricing">
        <Insurance />
      </div>
      <DigitalPayment />
      <Lending />
      <div id="contact">
        <div style={{ height: "100px" }} />
      </div>
    </>
  );
};

export default Home;
