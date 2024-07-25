import React from 'react';

function StatCard({ color, text, stat, size }) {
  return (
    <div className='w-1/5 h-48 my-5 mx-3'>
      <div className={`flex flex-col justify-center items-center w-full h-full text-white p-3 bg-${color}`}>
        <h1 className={`text-${size} font-bold`}>{stat}</h1>
        <span>{text}</span>
      </div>
    </div>
  );
}

export default StatCard;
