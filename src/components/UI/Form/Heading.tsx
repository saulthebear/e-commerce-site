import React from 'react';

const FormHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <h1 className="uppercase text-center font-medium mb-3">{children}</h1>;
};

export default FormHeading;
