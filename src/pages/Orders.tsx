import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../API/orders';
import UserContext from '../contexts/user';
import { IOrderDocument } from '../interfaces/order';
import { dbPriceToClientPriceString } from '../utils/priceFunctions';

const OrdersPage = () => {
  const [orders, setOrders] = useState<IOrderDocument[]>([]);
  const { userState } = useContext(UserContext);

  useEffect(() => {
    const fetchOrders = async () => {
      const responseData = await getUserOrders(
        userState.user._id,
        userState.fire_token
      );
      console.log('responseData', responseData);
      setOrders(responseData.orders);
    };
    fetchOrders();
  }, []);

  const renderedOrders = orders.map((order) => {
    return (
      <div key={order._id}>
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
      <h1>Your Orders</h1>
      {orders.length <= 0 && <p>You have no orders</p>}
      {renderedOrders}
    </div>
  );
};

export default OrdersPage;
