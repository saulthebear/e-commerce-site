import React from 'react';

export interface ILoadingProps {
  children?: React.ReactNode;
}

const Loading: React.FC<ILoadingProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center space-x-2 animate-pulse mt-3">
        <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
        <div className="w-5 h-5 bg-blue-400 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
      </div>
      {children}
    </div>
  );
};

export default Loading;
