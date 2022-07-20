import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../../API/orders';
import OrderSummary from '../../components/Order/OrderSummary';
import PageHead from '../../components/UI/PageHead';
import UserContext from '../../contexts/user';
import { IOrderDocument } from '../../interfaces/order';

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
    return <OrderSummary key={index} order={order} />;
  });

  return (
    <div>
      <PageHead title="Admin Dashboard">
        <Link to="/admin/products">Products</Link>
        <Link to="/admin/categories">Categories</Link>
      </PageHead>

      <h2 className="w-full text-center font-medium text-2xl mb-5">
        All Orders
      </h2>
      <div className="flex flex-col gap-5">
        {loading ? <p>Loading...</p> : ordersList}
      </div>
    </div>
  );
};

export default AdminDashboard;
