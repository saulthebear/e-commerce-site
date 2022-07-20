import React, { ReactNode } from 'react';

const Label: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <label className="font-medium text-sm mb-1">{children}</label>;
};

export default Label;
