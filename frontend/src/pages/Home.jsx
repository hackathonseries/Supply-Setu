import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const sliderImages = ['/poster.png', '/poster1.png', '/poster2.png'];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  const heroHeadlineRef = useRef(null);
  const ctaBtnRef = useRef(null);
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);

  // Auto-play slider
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  // GSAP slide-in animation
  useEffect(() => {
    if (sliderRef.current) {
      gsap.fromTo(
        sliderRef.current.children[current],
        { autoAlpha: 0, scale: 1.05 },
        { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [current]);

  // Hero text + CTA animation
  useEffect(() => {
    if (heroHeadlineRef.current && ctaBtnRef.current) {
      gsap.fromTo(
        heroHeadlineRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power3.out' }
      );
      gsap.fromTo(
        ctaBtnRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: 'power3.out' }
      );
    }
  }, []);

  // CTA hover effect
  useEffect(() => {
    if (ctaBtnRef.current) {
      gsap.set(ctaBtnRef.current, { scale: 1 });
      ctaBtnRef.current.onmouseenter = () => {
        gsap.to(ctaBtnRef.current, { scale: 1.07, backgroundColor: '#4ADE80', color: '#fff', duration: 0.2 });
      };
      ctaBtnRef.current.onmouseleave = () => {
        gsap.to(ctaBtnRef.current, { scale: 1, backgroundColor: '#fff', color: '#4ADE80', duration: 0.2 });
      };
    }
  }, []);

  // Scroll animations
  useEffect(() => {
    [aboutRef, featuresRef, testimonialsRef].forEach((ref, idx) => {
      if (ref.current) {
        gsap.from(ref.current, {
          opacity: 0,
          y: 60,
          duration: 1,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          delay: idx * 0.2,
        });
      }
    });
  }, []);

  const goToSlide = (idx) => {
    setCurrent(idx);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
  };

  return (
    <div className="font-sans bg-[#F9FAFB] text-gray-900">
      {/* Hero Section */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-opacity-70">
        <div className="absolute inset-0 w-full h-full" ref={sliderRef}>
          {sliderImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: idx === current ? 'brightness(0.85)' : 'brightness(0.7)',
              }}
            >
              {idx === current && (
                <div className="absolute inset-0 animate-zoom bg-black/10" />
              )}
            </div>
          ))}
        </div>

        <div className="relative z-20 text-center max-w-2xl mx-auto px-4">
          <h1
            ref={heroHeadlineRef}
            className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg"
          >
            Powering Smarter Supply Chains
          </h1>
          {/* <p className="text-lg md:text-xl text-white mb-8 drop-shadow-md">
            Connect vendors. Reduce waste. Optimize logistics.
          </p> */}
          <Link
            ref={ctaBtnRef}
            to="/get-started"
            className="inline-block bg-white text-[#4ADE80] font-semibold px-6 py-3 rounded-full border-2 border-[#4ADE80] transition duration-300"
          >
            Get Started
          </Link>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {sliderImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 rounded-full border-2 border-white ${current === idx ? 'bg-[#4ADE80]' : 'bg-white/60'} transition-all duration-200`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Rest of About, Features, Testimonials (unchanged) */}
      {/* ... you can keep the rest of your sections here as-is ... */}
    </div>
  );
};

export default Home;