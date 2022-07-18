import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext, { initialUserState } from '../../contexts/user';
import { getCategories } from '../../API/categories';
import { ICategoryDocument } from '../../interfaces/product';
import { NavbarDisplay } from './NavbarDisplay';

export interface INavbarProps {}
const Navbar: React.FC<INavbarProps> = () => {
  const [categories, setCategories] = useState<ICategoryDocument[]>([]);

  useEffect(() => {
    // Get categories from the server
    const fetchCategories = async () => {
      const data: { count: number; categories: ICategoryDocument[] } =
        await getCategories();
      setCategories(data.categories);
    };
    fetchCategories();
  }, []);

  const sidebar_items = categories.map((category) => {
    return (
      <Link to={`/category/${category._id}`} key={category._id}>
        {category.title}
      </Link>
    );
  });

  return <NavbarDisplay items={sidebar_items} />;
};

export default Navbar;
