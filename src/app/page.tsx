'use client';

import { useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import DoubleDownArrow from '../components/DoubleDownArrow';
import WhyNeed from '../components/WhyNeed';
import NewsSection from '../components/NewsSection';
import StepCarousel from '../components/HowITWorks';
import PickVibe from '../components/PickVibe';
import FindTribe from '../components/FindTribe';
import WhatsappSection from '@/components/ui/WhatsappSection';
import Footer from '../components/Footer';

export default function Home() {
  // 🔊 only one video ID lives here
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="bg-black">
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      {/* pass control props to any section that holds a video */}
      <HeroSection
        videoId="hero"
        activeVideo={activeVideo}
        setActiveVideo={setActiveVideo}
      />

      <DoubleDownArrow />
      <WhyNeed />

      <NewsSection
        videoId="news"
        activeVideo={activeVideo}
        setActiveVideo={setActiveVideo}
      />

      <StepCarousel />
      <PickVibe />
      <FindTribe />
      <WhatsappSection />
      <Footer />
    </div>
  );
}
