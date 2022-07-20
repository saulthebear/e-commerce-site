import React, { useContext, useEffect, useState } from 'react';
import { getUserOrders } from '../API/orders';
import PageHead from '../components/UI/PageHead';
import UserContext from '../contexts/user';
import { IOrderDocument } from '../interfaces/order';
import OrderSummary from '../components/Order/OrderSummary';

const OrdersPage = () => {
  const [orders, setOrders] = useState<IOrderDocument[]>([]);
  const { userState } = useContext(UserContext);

  useEffect(() => {
    const fetchOrders = async () => {
      const responseData = await getUserOrders(
        userState.user._id,
        userState.fire_token
      );
      setOrders(responseData.orders);
    };
    fetchOrders();
  }, []);

  const renderedOrders = orders.map((order) => {
    return <OrderSummary key={order._id} order={order} />;
  });

  return (
    <div>
      <PageHead title="Your Orders" />
      {orders.length <= 0 && (
        <p className="w-full text-center">
          You don&apos;t have any orders yet.
        </p>
      )}
      <div className="flex flex-col gap-5">{renderedOrders}</div>
    </div>
  );
};

export default OrdersPage;
