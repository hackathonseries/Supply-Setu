import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up">
            About Our
            <span className="block gradient-text">Mission</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            We're revolutionizing the street food industry by connecting vendors with suppliers through intelligent technology, 
            reducing waste, and building stronger local economies.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                We believe that every street food vendor deserves access to reliable, affordable ingredients and the tools to grow their business. 
                Our platform bridges the gap between local suppliers and street food vendors, creating a sustainable ecosystem that benefits everyone.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Empower street food vendors with reliable supply chains</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Reduce food waste through intelligent redistribution</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Build stronger local economies and communities</p>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in-right" style={{animationDelay: '0.3s'}}>
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-blue-100">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Innovation</h3>
                    <p className="text-gray-600">Technology-driven solutions for real-world problems</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Core
              <span className="block text-blue-600">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              These principles guide everything we do and every decision we make.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Community First",
                description: "We believe in building strong, sustainable communities where everyone can thrive.",
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                color: "blue"
              },
              {
                title: "Sustainability",
                description: "We're committed to reducing waste and creating environmentally responsible solutions.",
                icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                color: "green"
              },
              {
                title: "Innovation",
                description: "We constantly push boundaries to create better solutions for our users.",
                icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
                color: "purple"
              },
              {
                title: "Transparency",
                description: "We believe in open, honest communication with all our stakeholders.",
                icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
                color: "yellow"
              },
              {
                title: "Empowerment",
                description: "We give vendors and suppliers the tools they need to succeed and grow.",
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                color: "red"
              },
              {
                title: "Quality",
                description: "We maintain the highest standards in everything we do and deliver.",
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                color: "indigo"
              }
            ].map((value, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg card-hover border border-gray-100 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 bg-${value.color}-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <svg className={`w-8 h-8 text-${value.color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Our
              <span className="block text-blue-600">Leadership Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The passionate individuals driving our mission forward with expertise and dedication.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Chen",
                role: "CEO & Co-Founder",
                bio: "Former tech executive with 15+ years experience in supply chain optimization and food industry innovation.",
                image: "AC",
                delay: 0
              },
              {
                name: "Sarah Rodriguez",
                role: "CTO & Co-Founder",
                bio: "Expert in AI/ML with a passion for using technology to solve real-world problems in emerging markets.",
                image: "SR",
                delay: 200
              },
              {
                name: "Marcus Johnson",
                role: "Head of Product",
                bio: "Product strategist focused on user-centered design and creating intuitive experiences for diverse user bases.",
                image: "MJ",
                delay: 400
              },
              {
                name: "Priya Patel",
                role: "Head of Operations",
                bio: "Operations specialist with deep experience in logistics and vendor relationship management across multiple markets.",
                image: "PP",
                delay: 600
              },
              {
                name: "David Kim",
                role: "Head of Engineering",
                bio: "Full-stack engineer with expertise in scalable systems and real-time data processing for supply chain applications.",
                image: "DK",
                delay: 800
              },
              {
                name: "Maria Garcia",
                role: "Head of Partnerships",
                bio: "Partnership strategist with extensive network in the food industry and supplier relationship development.",
                image: "MG",
                delay: 1000
              }
            ].map((member, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg card-hover border border-gray-100 animate-fade-in-up"
                style={{ animationDelay: `${member.delay * 0.001}s` }}
              >
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-green-500 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                    {member.image}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
            Want to Learn More?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Get in touch with our team to discuss partnerships, opportunities, or just to learn more about our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <Link
              to="/contact"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Contact Us
            </Link>
            <Link
              to="/"
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;