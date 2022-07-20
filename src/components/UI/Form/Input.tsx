import React from 'react';

const Input = ({ ...props }) => {
  return (
    <input
      {...props}
      className="border-2 border-slate-200 p-2 w-full rounded-md"
    />
  );
};

export default Input;
