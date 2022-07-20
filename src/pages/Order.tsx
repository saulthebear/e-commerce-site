import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getOrder } from '../API/orders';
import Loading from '../components/UI/Loading';
import PageHead from '../components/UI/PageHead';
import UserContext from '../contexts/user';
import { IOrderDocumentWithSession } from '../interfaces/order';
import { formatDate } from '../utils/dateFunctions';
import { dbPriceToClientPriceString } from '../utils/priceFunctions';
import { MdNavigateBefore } from 'react-icons/md';

const OrderPage: React.FC = () => {
  const orderId = useParams().orderId;
  const [orderResponse, setOrderResponse] =
    React.useState<IOrderDocumentWithSession>();
  const [loading, setLoading] = React.useState(false);
  const { userState } = useContext(UserContext);

  useEffect(() => {
    if (loading || !orderId || userState.user._id === '') return;

    const fetchOrder = async () => {
      setLoading(true);
      const responseData = await getOrder(orderId, userState.fire_token);
      console.log('Fetching order');
      console.log('responseData', responseData);
      setOrderResponse(responseData);
      setLoading(false);
    };
    fetchOrder();
  }, []);

  console.log('orderResponse', orderResponse);

  let orderStatusColor = 'bg-yellow-500';
  if (
    orderResponse?.session.status &&
    ['complete', 'paid'].includes(orderResponse?.session.status)
  ) {
    orderStatusColor = 'bg-green-600';
  }

  return (
    <div>
      <PageHead title="Order Details" />
      <div className="my-5">
        <Link
          to={`/orders`}
          className="hover:border-b-2 border-orange-700 uppercase text-sm font-medium text-orange-700 flex w-fit"
        >
          <MdNavigateBefore className="fill-orange-700 text-2xl" />
          All Orders
        </Link>
      </div>
      {loading && <Loading />}
      {!loading && orderResponse && (
        <div className="text-lg bg-slate-200 rounded-md p-5 flex flex-col">
          <div className="flex justify-between mb-3">
            <div className="flex flex-col">
              <h2 className="font-medium">Order {orderId}</h2>
              <p className="text-sm">
                {formatDate(new Date(orderResponse.order.createdAt))}
              </p>
            </div>
            <div
              className={`flex justify-center items-center w-fit h-fit text-sm px-5 py-2 rounded-full text-white uppercase font-medium ${orderStatusColor}`}
            >
              {orderResponse.session.status}
            </div>
          </div>
          <ul className="ml-5 pl-5 list-disc">
            {orderResponse.order.products.map((item, index) => {
              return (
                <li key={`order-item-${index}-${item.product._id}`}>
                  <div>
                    <span className="font-medium">{item.product.title}</span> -{' '}
                    {dbPriceToClientPriceString(item.price)} x{item.quantity}
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="text-lg font-medium mt-4">
            {dbPriceToClientPriceString(orderResponse.session.amount_total)}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
