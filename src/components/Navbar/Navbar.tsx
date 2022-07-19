import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext, { initialUserState } from '../../contexts/user';
import { getCategories } from '../../API/categories';
import { ICategoryDocument } from '../../interfaces/product';
import Sidebar from './Sidebar';
import { MdMenu, MdSearch } from 'react-icons/md';
import { BsCart3 } from 'react-icons/bs';
import CartIcon from './CartIcon';
import Cart from './Cart';

export interface INavbarProps {}
const Navbar: React.FC<INavbarProps> = () => {
  const [categories, setCategories] = useState<ICategoryDocument[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const userContext = useContext(UserContext);
  const { user } = userContext.userState;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

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
  console.log(`In Navbar, cart`, user.cart);

  return (
    <>
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        toggleSidebar={toggleSidebar}
        items={sidebar_items}
      />
      <Cart
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
        toggleCart={toggleCart}
      />
      <div className="bg-white fixed w-full h-navbar-height flex items-center">
        <ul className="flex justify-between w-full">
          <div className="flex items-center">
            <li>
              <button onClick={toggleSidebar}>
                <MdMenu size="1.5rem" />
              </button>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
          </div>
          <div className="flex items-center">
            <li>
              <MdSearch size="1.5rem" />
            </li>
            <li>
              <button onClick={toggleCart}>
                <CartIcon numItems={user.cart.items.length} />
              </button>
            </li>
          </div>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
