import React from 'react';

const SidebarItem: React.FC<{
  children: React.ReactNode;
  isShown?: boolean;
  extraDelay: number;
}> = ({ isShown = true, extraDelay = 0, children }) => {
  const delay = extraDelay + 100;
  return (
    <div
      className={`uppercase font-baloo text-xl font-medium py-5 border-b-[1px] border-slate-400 ease-in-out duration-300 ${
        isShown ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default SidebarItem;
