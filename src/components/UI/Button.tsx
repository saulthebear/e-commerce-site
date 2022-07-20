import React from 'react';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: 'sm' | 'lg';
}

const Button: React.FC<IProps> = ({ children, size = 'sm', ...props }) => {
  const lgClasses = 'px-7 py-3';
  const smClasses = 'px-3 py-1';
  const activeSizeClasses = size === 'lg' ? lgClasses : smClasses;
  const className = `${
    props.className || ''
  } ${activeSizeClasses} uppercase rounded-full`;
  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};

export default Button;
