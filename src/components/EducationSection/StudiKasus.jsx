import React from 'react';

const StudiKasus = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden p-8 text-center">
        <div className="text-6xl text-gray-300 mb-4" aria-hidden="true">🚧</div>
        <h3 className="text-xl font-bold text-gray-500 mb-2">Segera Hadir</h3>
        <p className="text-gray-400">Studi kasus holistik integratif sedang dalam pengembangan</p>
      </div>
      
      {/* <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden p-8 text-center">
        <div className="text-6xl text-gray-300 mb-4" aria-hidden="true">📋</div>
        <h3 className="text-xl font-bold text-gray-500 mb-2">Coming Soon</h3>
        <p className="text-gray-400">Kasus-kasus nyata implementasi PAUD Holistik Integratif</p>
      </div> */}
    </div>
  );
};

export default StudiKasus;
