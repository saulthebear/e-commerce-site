import React from 'react';
import { Link } from 'react-router-dom';
import PageHead from '../components/UI/PageHead';
import { MdNavigateBefore } from 'react-icons/md';

const CheckoutSuccess = () => {
  return (
    <div className="w-full text-center">
      <PageHead title="Success!" />
      <div className="w-full text-center">Your order has been placed.</div>
      <div className="flex justify-center items-center mt-5">
        <Link
          to="/orders"
          className="hover:border-b-2 border-orange-700 uppercase text-sm font-medium flex text-orange-700 w-fit"
        >
          <MdNavigateBefore className="fill-orange-700 text-2xl" />
          View your orders
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
