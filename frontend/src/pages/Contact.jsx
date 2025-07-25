import React from 'react';

const Contact = () => {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-green-700">Contact Us</h2>
      <form className="mt-4 space-y-4">
        <input type="text" placeholder="Your Name" className="w-full p-2 border rounded" />
        <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
        <textarea placeholder="Message" className="w-full p-2 border rounded h-24" />
        <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;