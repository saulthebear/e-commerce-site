import React from 'react';

export interface IErrorProps {
  error: string;
}

const Error: React.FC<IErrorProps> = ({ error }) => {
  if (error === '') return null;

  return (
    <>
      <div>Error: {error}</div>
    </>
  );
};

export default Error;
