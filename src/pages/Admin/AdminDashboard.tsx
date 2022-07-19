import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../../API/orders';
import UserContext from '../../contexts/user';
import { IOrderDocument } from '../../interfaces/order';
import { dbPriceToClientPriceString } from '../../utils/priceFunctions';

const AdminDashboard = () => {
  const [orders, setOrders] = React.useState<IOrderDocument[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { userState } = useContext(UserContext);

  useEffect(() => {
    // Get orders from the server
    const fetchOrders = async () => {
      setLoading(true);
      const data: { count: number; orders: IOrderDocument[] } = await getOrders(
        userState.fire_token
      );
      setOrders(data.orders);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const ordersList = orders.map((order, index) => {
    return (
      <div key={index}>
        <h3>{`${order.createdAt}`}</h3>
        <ul>
          {order.products.map((item, index) => {
            return (
              <li key={`order-item-${index} -${item.product._id}`}>
                <div>{item.product.title}</div>
                <div>
                  {dbPriceToClientPriceString(item.price)} x{item.quantity}
                </div>
              </li>
            );
          })}
        </ul>
        <Link to={`/orders/${order._id}`}>Details</Link>
      </div>
    );
  });

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <Link to="/admin/products">Products</Link>
      <Link to="/admin/categories">Categories</Link>

      <h2>Orders</h2>
      {loading ? <p>Loading...</p> : ordersList}
    </div>
  );
};

export default AdminDashboard;
