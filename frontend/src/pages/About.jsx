import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Poster Section */}
      <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        <img
          src="/about.png" // Replace with your actual banner image path
          alt="About Banner"
          className="w-full h-full object-cover object-center brightness-75"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
            Empowering Local Vendors
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Creating sustainable connections between suppliers and street food heroes.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 animate-fade-in-up">
            Our Mission
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            We bridge the gap between street food vendors and local suppliers with smart logistics, reducing waste and fostering local economies.
          </p>
        </div>
      </section>

      {/* Mission Details */}
      <section className="py-16 bg-white px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <h3 className="text-3xl font-bold text-gray-800">Why We Exist</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              From food trucks to local markets, vendors form the soul of street culture. We provide them with a trusted, easy-to-use digital solution to connect directly with reliable, cost-effective suppliers — empowering growth at every level.
            </p>
            <ul className="space-y-4 text-left">
              {[
                'Intelligent supply chain for affordability & access',
                'Eco-driven waste reduction models',
                'Building transparent, fair trade practices'
              ].map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl animate-fade-in-right">
            <img
              src="/about12.png" // Replace with your actual image
              alt="Our Mission Visual"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6 bg-gradient-to-tr from-gray-50 to-blue-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10 animate-fade-in-up">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { title: "Community", desc: "We strengthen the heartbeat of local food culture.", color: "blue" },
              { title: "Sustainability", desc: "We actively reduce food waste and emissions.", color: "green" },
              { title: "Innovation", desc: "We use tech to drive scalable solutions.", color: "indigo" },
              { title: "Transparency", desc: "Honest connections build trust in supply chains.", color: "yellow" },
              { title: "Empowerment", desc: "We equip vendors with tools for independence.", color: "red" },
              { title: "Impact", desc: "We measure success by change, not just numbers.", color: "purple" }
            ].map((value, idx) => (
              <div key={idx} className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300">
                <div className={`w-12 h-12 rounded-full bg-${value.color}-100 text-${value.color}-600 flex items-center justify-center mx-auto mb-4`}>
                  <span className="font-bold text-lg">{value.title[0]}</span>
                </div>
                <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                <p className="text-gray-600 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default About;