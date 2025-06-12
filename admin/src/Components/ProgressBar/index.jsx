import React from 'react';

const Progress = ({ value, type }) => {
  return (
    <div className='w-[100px] h-auto overflow-hidden rounded-md bg-[#f1f1f1]'>
      <span
        className={`block h-[8px] ${type === 'success' ? 'bg-green-600' : 'bg-blue-600'} ${type === 'error' &&  'bg-pink-600' } ${type === 'warning' &&  'bg-orange-400' }`}
        style={{ width: `${value}%` }}
      ></span>
    </div>
  );
};

export default Progress;
