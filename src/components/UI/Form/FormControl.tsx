import React from 'react';

interface IProps {
  children: React.ReactNode;
}

const FormControl: React.FC<IProps> = ({ children }) => {
  return <div className="flex flex-col mb-2">{children}</div>;
};

export default FormControl;
