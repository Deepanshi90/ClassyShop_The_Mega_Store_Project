import React from 'react';

const Badge = (props) => {
  return (
    <section
      className={`inline-block py-1 px-4 text-[11px] rounded-full capitalize 
        ${props.status === "pending" ? 'bg-[#ff5252] text-white' : ''}
        ${props.status === "confirm" ? 'bg-green-500 text-white' : ''}
        ${props.status === "delivered" ? 'bg-green-700 text-white' : ''}`}
    >
      {props.status}
    </section>
  );
};

export default Badge;
