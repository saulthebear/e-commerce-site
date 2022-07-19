import React from 'react';
import { BsCart3 } from 'react-icons/bs';

interface ICartIconProps {
  numItems: number;
}

const CartIcon: React.FC<ICartIconProps> = ({ numItems }) => {
  return (
    <div className="relative p-2">
      <BsCart3 size="1.5rem" />
      {numItems > 0 && (
        <span className="absolute top-0 right-0 bg-red-700 text-white rounded-full text-xs font-medium flex justify-center items-center w-4 h-4">
          {numItems}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
