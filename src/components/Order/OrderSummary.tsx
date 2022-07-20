import React from 'react';
import { Link } from 'react-router-dom';
import { IOrderDocument } from '../../interfaces/order';
import { formatDate } from '../../utils/dateFunctions';
import { dbPriceToClientPriceString } from '../../utils/priceFunctions';
import { MdNavigateNext } from 'react-icons/md';

const OrderSummary: React.FC<{ order: IOrderDocument }> = ({ order }) => {
  const total = order.products.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <div className="bg-slate-200 p-5 rounded-md">
      <h3 className="font-medium">{formatDate(new Date(order.createdAt))}</h3>
      <p className="ml-5 mt-2">{dbPriceToClientPriceString(total)}</p>
      {/* <ul className="ml-5 pl-5 list-disc">
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
      </ul> */}
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
};

export default OrderSummary;
