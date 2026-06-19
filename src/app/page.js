'use client';

import { useEffect } from 'react';
import AOS from 'aos';

import LoadingScreen from '@/components/LoadingScreen';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import Process from '@/components/Process';
import Pricing from '@/components/Pricing';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import CustomCursor from '@/components/CustomCursor';

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }, []);

  return (
    <>
      <CustomCursor />
      <LoadingScreen />
      <Header />
      <Hero />
      <Services />
      <Portfolio />
      <Stats />
      <Testimonials />
      <Process />
      <Pricing />
      <About />
      <Contact />
      <Footer />
      <BackToTop />
    </>
  );
}
