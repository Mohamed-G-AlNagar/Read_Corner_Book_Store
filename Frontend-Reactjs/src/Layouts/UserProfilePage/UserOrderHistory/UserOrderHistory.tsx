import React, { useRef, useEffect } from 'react';
import { useMyOrders } from '../../../Hooks/orderHooks';
import Spinner from '../../../Components/spinner/Spinner';

interface OrderItem {
  book: {
    bookTitle: string;
  };
  quantity: number;
}

interface Order {
  orderId: number;
  orderDate: string;
  orderItems: OrderItem[];
  totalPrice: number;
  orderStatus: string;
}

const UserOrderHistory: React.FC = () => {
  const { myOrders, isLoading, error } = useMyOrders();
  const tableRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const tableElement = tableRef.current;
      const headerElement = headerRef.current;
      if (tableElement && headerElement) {
        const { top } = tableElement.getBoundingClientRect();
        headerElement.style.transform = `translateY(${Math.max(0, -top)}px)`;
      }
    };

    const tableElement = tableRef.current;
    if (tableElement) {
      tableElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (tableElement) {
        tableElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mt-4 w-100">
      <h2>Order History</h2>
      <div 
        ref={tableRef}
        className="table-responsive" 
        style={{ 
          maxHeight: '65vh', 
          overflowY: 'auto',
          position: 'relative'
        }}
      >
        <table className="table table-striped table-hover">
          <thead ref={headerRef} style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map((order: Order) => (
              <tr key={order.orderId}>
                <td className="align-middle">{order.orderId}</td>
                <td className="align-middle">{new Date(order.orderDate).toLocaleString()}</td>
                <td className="align-middle">
                  {order.orderItems.map((item, index) => (
                    <div key={index}>{item.book.bookTitle} (x{item.quantity})</div>
                  ))}
                </td>
                <td className="align-middle">${order.totalPrice.toFixed(2)}</td>
                <td className="align-middle">{order.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserOrderHistory;