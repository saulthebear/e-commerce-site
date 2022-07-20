import React from 'react';

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

const Select: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <select
      {...props}
      className="border-2 border-slate-200 p-2 w-full rounded-md"
    >
      {children}
    </select>
  );
};

export default Select;
