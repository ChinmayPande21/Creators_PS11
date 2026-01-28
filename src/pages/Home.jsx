import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Stats from '../components/Stats';
import Services from '../components/Services';
import HowItWorks from '../components/HowItWorks';
import Gallery from '../components/Gallery';
import Security from '../components/Security';
import Partners from '../components/Partners';
import UseCases from '../components/UseCases';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import About from '../components/About';
import Blog from '../components/Blog';
import FAQ from '../components/FAQ';

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <Stats />
      <Services />
      <HowItWorks />
      <Gallery />
      <Security />
      <Partners />
      <UseCases />
      <Testimonials />
      <Pricing />
      <About />
      <Blog />
      <FAQ />
    </>
  );
};

export default Home;
