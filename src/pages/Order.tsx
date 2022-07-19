import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrder } from '../API/orders';
import UserContext from '../contexts/user';
import { IOrderDocumentWithSession } from '../interfaces/order';
import { dbPriceToClientPriceString } from '../utils/priceFunctions';

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

  return (
    <div>
      <h1>Order {orderId}</h1>
      {loading && <p>Loading...</p>}
      {!loading && orderResponse && (
        <div>
          <h3>{`${orderResponse.order.createdAt}`}</h3>
          <h4>Items:</h4>
          {orderResponse.order.products.map((item, index) => {
            return (
              <div key={`order-item-${index} -${item.product._id}`}>
                <div>{item.product.title}</div>
                <div>
                  {dbPriceToClientPriceString(item.price)} x{item.quantity}
                </div>
              </div>
            );
          })}
          <div>
            Total:{' '}
            {dbPriceToClientPriceString(orderResponse.session.amount_total)}
          </div>
          <p>Status: {orderResponse.session.payment_status}</p>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
