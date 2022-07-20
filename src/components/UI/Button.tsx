import React from 'react';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<IProps> = ({ children, ...props }) => {
  const className = `${props.className || ''} uppercase py-1 px-3 rounded-full`;
  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};

export default Button;
