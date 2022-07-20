import React from 'react';

const Textarea = ({ ...props }) => {
  return (
    <textarea
      {...props}
      className="border-2 border-slate-200 p-2 w-full rounded-md"
    />
  );
};

export default Textarea;
