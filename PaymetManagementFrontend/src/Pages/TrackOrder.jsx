import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../Context/ShopContext.jsx";
import Title from "../Components/Title";

const TrackOrder = () => {
  const { orderId } = useParams();

  const { backendUrl, token, currency } = useContext(ShopContext);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadOrder = async () => {
    try {
      if (!token) {
        return;
      }

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        {
          headers: { token },
        },
      );

      if (response.data.success) {
        const foundOrder = response.data.orders.find(
          (item) => item._id === orderId,
        );

        setOrder(foundOrder || null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrder();

    const interval = setInterval(() => {
      loadOrder();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [token, orderId]);

  if (loading) {
    return (
      <div className="pt-16 border-t">
        <p>Loading order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="pt-16 border-t">
        <Title text1="TRACK" text2="ORDER" />

        <p className="mt-8 text-gray-500">Order not found.</p>
      </div>
    );
  }

  const statuses = [
    "Order Placed",
    "Packing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  const currentStatusIndex = statuses.indexOf(order.status);

  return (
    <div className="pt-16 border-t">
      <Title text1="TRACK" text2="ORDER" />

      {/* Order Information */}

      <div className="p-6 mt-8 border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-medium">Order Status</p>

            <p className="mt-1 text-gray-500">{order.status}</p>
          </div>

          <div>
            <p className="text-lg font-medium">Total</p>

            <p className="mt-1 text-gray-500">
              {currency}
              {order.amount}
            </p>
          </div>
        </div>
      </div>

      {/* Tracking Timeline */}

      <div className="p-6 mt-10 border">
        <h2 className="mb-8 text-xl font-medium">Order Tracking</h2>

        <div className="flex flex-col">
          {statuses.map((status, index) => {
            const completed = index <= currentStatusIndex;

            const isCurrent = index === currentStatusIndex;

            return (
              <div key={status} className="flex items-start">
                {/* Circle + Line */}

                <div className="flex flex-col items-center mr-5">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      completed
                        ? "bg-green-500 border-green-500"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {completed && <span className="text-xs text-white">✓</span>}
                  </div>

                  {index !== statuses.length - 1 && (
                    <div
                      className={`w-0.5 h-14 ${
                        index < currentStatusIndex
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>

                {/* Status Text */}

                <div className="pb-10">
                  <p
                    className={`font-medium ${
                      isCurrent
                        ? "text-green-600"
                        : completed
                          ? "text-gray-800"
                          : "text-gray-400"
                    }`}
                  >
                    {status}
                  </p>

                  {isCurrent && (
                    <p className="mt-1 text-sm text-gray-500">
                      Current order status
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Items */}

      <div className="p-6 mt-8 border">
        <h2 className="mb-5 text-xl font-medium">Order Items</h2>

        {order.items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-5 py-4 border-b last:border-b-0"
          >
            <img src={item.image[0]} alt={item.name} className="w-16 sm:w-20" />

            <div>
              <p className="font-medium">{item.name}</p>

              <p className="mt-1 text-sm text-gray-500">
                {currency}
                {item.price}
              </p>

              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>

              <p className="text-sm text-gray-500">Size: {item.size}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackOrder;
