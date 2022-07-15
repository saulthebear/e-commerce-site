import React from 'react';

export interface ILoadingProps {
  children: React.ReactNode;
}

const Loading: React.FC<ILoadingProps> = ({ children }) => {
  return (
    <>
      <div>Loading indicator...</div>
      {children}
    </>
  );
};

export default Loading;
