import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../API/orders';
import PageHead from '../components/UI/PageHead';
import UserContext from '../contexts/user';
import { IOrderDocument } from '../interfaces/order';
import { formatDate } from '../utils/dateFunctions';
import { dbPriceToClientPriceString } from '../utils/priceFunctions';
import { MdNavigateNext } from 'react-icons/md';

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
    return (
      <div key={order._id} className="bg-slate-200 p-5 rounded-md">
        <h3 className="font-medium">{formatDate(new Date(order.createdAt))}</h3>
        <ul className="ml-5 pl-5 list-disc">
          {order.products.map((item, index) => {
            return (
              <li key={`order-item-${index} -${item.product._id}`}>
                <div>
                  <span className="font-medium">{item.product.title}</span> -{' '}
                  {dbPriceToClientPriceString(item.price)} x{item.quantity}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-5">
          <Link
            to={`/orders/${order._id}`}
            className="hover:border-b-2 border-orange-700 uppercase px-3 py-1 text-sm font-medium text-orange-700 flex w-fit"
          >
            Details <MdNavigateNext className="fill-orange-700 text-2xl" />
          </Link>
        </div>
      </div>
    );
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
