import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] via-white to-[#fdf6ff] py-16 px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Contact SurplusConnect
          </h1>
          <p className="text-lg text-gray-600">
            We’d love to hear from you — whether it's a question, feedback, or partnership opportunity.
          </p>
        </div>

        {/* Contact Info - Full Width */}
        <div className="bg-white backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 p-12 space-y-10 transition hover:shadow-3xl duration-300">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Let’s Talk</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Call Us */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-full shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2"
                  viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28l1.5 4.5-2.26 1.13a11 11 0 005.51 5.52l1.13-2.26 4.5 1.5v3.28a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Call Us</h4>
              <p className="text-gray-600">+91 9876543210</p>
              <p className="text-gray-600">+91-7644389777</p>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-4 rounded-full shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2"
                  viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Email</h4>
              <p className="text-gray-600">info@surplusconnect.com</p>
              <p className="text-gray-600">support@surplusconnect.com</p>
            </div>

            {/* Location */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-4 rounded-full shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2"
                  viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round"
                    d="M17.66 16.66L13.41 20.9a2 2 0 01-2.83 0l-4.24-4.24a8 8 0 1111.32 0z" /><path strokeLinecap="round" strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Location</h4>
              <p className="text-gray-600">123 Business Street</p>
              <p className="text-gray-600">Tech City, TC 12345</p>
            </div>
          </div>

          {/* Business Hours */}
          <div className="pt-10 border-t border-gray-100 text-center">
            <h4 className="text-xl font-semibold mb-3 text-gray-800">Operating Hours</h4>
            <ul className="text-gray-600 space-y-1 text-sm">
              <li>Monday – Friday: 9:00 AM – 6:00 PM</li>
              <li>Saturday: 10:00 AM – 4:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;