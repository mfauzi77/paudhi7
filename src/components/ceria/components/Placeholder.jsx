import React from 'react';

const Placeholder = ({ title }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-300 mb-4">
          {title || 'Coming Soon'}
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          This feature is under development
        </p>
      </div>
    </div>
  );
};

export default Placeholder;
