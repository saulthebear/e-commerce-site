import React from 'react';

interface IPageHeadProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const PageHead: React.FC<IPageHeadProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="flex flex-col items-center mb-8 px-2 ">
      <h1 className="font-medium text-3xl uppercase mb-3">{title}</h1>
      <p className="text-center text-slate-700 max-w-lg">{description}</p>
      {children}
    </div>
  );
};

export default PageHead;
