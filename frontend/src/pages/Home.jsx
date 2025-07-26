import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const problemRef = useRef(null);
  const solutionRef = useRef(null);
  const teamRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const elements = [problemRef.current, solutionRef.current, teamRef.current];
    elements.forEach(el => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up">
            Revolutionizing
            <span className="block gradient-text">Street Food</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Discover how we're solving real challenges in the street food industry through innovative technology and community-driven solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <Link
              to="/login"
              className="btn-primary text-lg px-8 py-4 animate-pulse-glow"
            >
              Login
            </Link>
            <Link
              to="/products"
              className="btn-secondary text-lg px-8 py-4"
            >
              Browse Products
            </Link>
          </div>
        </div>
        
        {/* Floating elements for visual interest */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-20 w-16 h-16 bg-yellow-200 rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-16 w-12 h-12 bg-purple-200 rounded-full opacity-20 animate-float" style={{animationDelay: '1.5s'}}></div>
      </section>

      {/* The Problem Section */}
      <section ref={problemRef} className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 opacity-0 transform translate-y-10 transition-all duration-1000">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                The Challenge for
                <span className="block text-red-600">Street Food Vendors</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Every day, street food vendors face the same frustrating cycle: unpredictable ingredient costs, 
                last-minute supplier cancellations, and the heartbreaking waste of perfectly good food. 
                They struggle to plan their menus, manage their inventory, and maintain consistent quality 
                while competing with rising costs and limited access to reliable suppliers.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Unpredictable pricing</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Supply chain delays</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Food waste</span>
                </div>
              </div>
            </div>
            
            <div className="relative opacity-0 transform translate-x-10 transition-all duration-1000 delay-300">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-red-100">
                <div className="aspect-video bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Daily Struggles</h3>
                    <p className="text-gray-600">Vendors face unpredictable costs, delays, and waste</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution Section */}
      <section ref={solutionRef} className="py-20 px-6 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 opacity-0 transform translate-y-10 transition-all duration-1000">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              A Smarter Way to
              <span className="block text-green-600">Connect and Grow</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We've built an integrated ecosystem that empowers vendors and streamlines the supply chain. 
              Our platform enables seamless connections, real-time tracking, and waste reduction.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 opacity-0 transform translate-y-10 transition-all duration-1000 delay-300">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Effortless Procurement</h3>
                    <p className="text-gray-600">Vendors list their needs, and suppliers see aggregated demand in real-time.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Delivery Tracking</h3>
                    <p className="text-gray-600">Full transparency with live tracking, ETAs, and delivery logs.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Surplus Exchange</h3>
                    <p className="text-gray-600">A marketplace for vendors to sell leftover materials at discounted rates, reducing waste and recovering costs.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Daily Stock Broadcasts</h3>
                    <p className="text-gray-600">Suppliers can instantly notify all vendors of available stock and special offers.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative opacity-0 transform translate-x-10 transition-all duration-1000 delay-500">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-green-100">
                <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Solutions</h3>
                    <p className="text-gray-600">AI-powered demand prediction and real-time supply chain optimization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section ref={teamRef} className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 opacity-0 transform translate-y-10 transition-all duration-1000">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Team Behind
              <span className="block text-green-600">the Mission</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Meet the passionate individuals who are revolutionizing the street food industry through technology and innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Chen",
                role: "Project Lead & Backend Architect",
                contribution: "Designed the core database architecture and the live delivery tracking system.",
                delay: 0
              },
              {
                name: "Sarah Rodriguez",
                role: "Frontend Developer & UX Designer",
                contribution: "Crafted the intuitive user interface and seamless mobile experience for vendors.",
                delay: 200
              },
              {
                name: "Marcus Johnson",
                role: "AI/ML Engineer",
                contribution: "Developed the demand prediction algorithms and supply chain optimization models.",
                delay: 400
              },
              {
                name: "Priya Patel",
                role: "Product Manager",
                contribution: "Led user research and product strategy to ensure market fit and user satisfaction.",
                delay: 600
              },
              {
                name: "David Kim",
                role: "DevOps Engineer",
                contribution: "Built the scalable infrastructure and deployment pipeline for reliable service delivery.",
                delay: 800
              }
            ].map((member, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg card-hover border border-gray-100 opacity-0 glass"
                style={{ transitionDelay: `${member.delay}ms` }}
              >
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{member.contribution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-blue-600/90"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
            Ready to Transform
            <span className="block">Your Business?</span>
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Join thousands of vendors and suppliers who are already benefiting from our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <Link
              to="/login"
              className="bg-white hover:bg-gray-100 text-green-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-pulse-glow"
            >
              Login
            </Link>
            <Link
              to="/contact"
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            >
              Learn More
            </Link>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-white/10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      </section>

    </div>
  );
};

export default Home;