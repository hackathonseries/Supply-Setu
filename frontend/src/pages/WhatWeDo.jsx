import React from 'react';

const WhatWeDo = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-green-800">What We Do</h2>
      <ul className="mt-4 list-disc list-inside text-gray-700 space-y-2">
        <li>Connect street food vendors with verified local suppliers.</li>
        <li>Predict demand using AI for better ingredient planning.</li>
        <li>Facilitate microcredit and vendor financing.</li>
        <li>Enable redistribution of unused ingredients to avoid waste.</li>
        <li>Support vendors with digital dashboards and alerts.</li>
      </ul>
    </div>
  );
};

export default WhatWeDo;