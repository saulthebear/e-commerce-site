import React from 'react';

export interface ISuccessProps {
  message: string;
}

const Error: React.FC<ISuccessProps> = ({ message }) => {
  if (message === '') return null;

  return (
    <>
      <div>Success: {message}</div>
    </>
  );
};

export default Error;
