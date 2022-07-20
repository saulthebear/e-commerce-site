import React from 'react';
import { Link } from 'react-router-dom';
import PageHead from '../UI/PageHead';
import { MdNavigateBefore } from 'react-icons/md';

const Unauthorized = () => {
  return (
    <div className="bg-red-700 text-white p-10 rounded-lg">
      <PageHead title="Unauthorized" />
      <p className="text-center">
        You do not have permission to access this page.
      </p>
      <Link to="/" className="flex justify-center items-center mt-10 ">
        <MdNavigateBefore className="fill-white text-2xl" />
        Home
      </Link>
    </div>
  );
};

export default Unauthorized;
