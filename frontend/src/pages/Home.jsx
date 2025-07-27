import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Placeholder images (replace with real images later)
const sliderImages = [
  '/poster.png',
  '/poster1.png',
  '/poster2.png',
];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  const heroHeadlineRef = useRef(null);
  const ctaBtnRef = useRef(null);
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);

  // Hero slider auto-play
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  // GSAP hero slider animation
  useEffect(() => {
    if (sliderRef.current) {
      gsap.fromTo(
        sliderRef.current.children[current],
        { autoAlpha: 0, scale: 1.05 },
        { autoAlpha: 1, scale: 1, duration: 0.1, ease: 'power2.out' }
      );
    }
  }, [current]);

  // GSAP micro-interactions for CTA
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

  // GSAP scroll animations
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

  // Manual slider navigation
  const goToSlide = (idx) => {
    setCurrent(idx);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
  };

  return (
    <div className="font-sans bg-[#F9FAFB] text-gray-900">
      {/* Hero Section with GSAP Slider */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden bg-opacity-70">
        <div className="absolute inset-0 w-full h-full" ref={sliderRef}>
          {sliderImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: idx === current ? 'brightness(0.85)' : 'brightness(0.7)' }}
            >
              {/* Subtle parallax/zoom effect on active image */}
              {idx === current && (
                <div className="absolute inset-0 animate-zoom bg-black/10" />
              )}
            </div>
          ))}
        </div>
        <div className="relative z-20 text-center max-w-2xl mx-auto px-4 blur(8px)">
          
          
          
        </div>
        {/* Slider navigation dots */}
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

      {/* About Section */}
      <section ref={aboutRef} className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-20 h-20 bg-gradient-to-br from-[#4ADE80] to-[#60A5FA] rounded-2xl flex items-center justify-center mb-6">
              <span className="text-3xl text-white font-bold">SH</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Us</h2>
            <p className="text-lg text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur.</p>
            <p className="text-md text-gray-500">We connect vendors and suppliers for a smarter, more sustainable supply chain. Our platform streamlines procurement, delivery, and surplus exchange.</p>
          </div>
          <div className="flex justify-center items-center">
            <div className="w-64 h-64 bg-gray-100 rounded-3xl flex items-center justify-center shadow-inner">
              {/* Placeholder for about image/icon */}
              <span className="text-6xl text-gray-300">📦</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 px-4 bg-gradient-to-br from-[#F9FAFB] to-[#E0F2FE]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '📝', title: 'Smart Procurement', desc: 'List and fulfill raw material needs efficiently.' },
              { icon: '🚚', title: 'Live Tracking', desc: 'Track deliveries in real-time with ETA and logs.' },
              { icon: '♻️', title: 'Surplus Exchange', desc: 'Buy and sell surplus materials at discounted rates.' },
              { icon: '📢', title: 'Daily Broadcasts', desc: 'Suppliers broadcast stock and offers instantly.' },
            ].map((f, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-md flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 feature-card">
                <div className="text-5xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Testimonials</h2>
          <div className="relative">
            <div className="bg-gradient-to-br from-[#4ADE80]/10 to-[#60A5FA]/10 rounded-2xl p-10 shadow-lg">
              <p className="text-xl text-gray-700 italic mb-4">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. This platform changed the way I manage my business!"</p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-[#4ADE80] rounded-full flex items-center justify-center text-white font-bold text-lg">A</div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Amit Kumar</div>
                  <div className="text-gray-500 text-sm">Vendor, Delhi</div>
                </div>
              </div>
            </div>
            {/* Add more testimonials as needed */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;