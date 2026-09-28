import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const Order = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {

    if (!token) {
      return
    }

    try {

      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        {
          headers: { token }
        }
      )

      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  const statusHandler = async (event, orderId) => {

    try {

      const response = await axios.post(
        backendUrl + '/api/order/status',
        {
          orderId,
          status: event.target.value
        },
        {
          headers: { token }
        }
      )

      if (response.data.success) {

        toast.success('Order status updated')

        await fetchAllOrders()

      } else {

        toast.error(response.data.message)

      }

    } catch (error) {

      console.log(error)
      toast.error(error.message)

    }

  }


  useEffect(() => {
    fetchAllOrders()
  }, [token])


  return (
  <div>

    {/* Page Header */}
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-2xl font-semibold text-gray-800">
          Orders
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Manage customer orders and delivery status
        </p>
      </div>

      <div className="text-sm text-gray-500">
        {orders.length} order{orders.length !== 1 ? 's' : ''}
      </div>
    </div>


    {/* Orders List */}
    <div className="flex flex-col gap-4">

      {orders.map((order, index) => (

        <div
          key={index}
          className="overflow-hidden transition-shadow duration-200 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md"
        >

          {/* Order Header */}
          <div className="flex flex-col gap-2 px-5 py-4 border-b border-gray-200 sm:flex-row sm:items-center sm:justify-between bg-gray-50">

            <div>
              <p className="text-xs text-gray-400">
                Order ID
              </p>

              <p className="text-sm font-medium text-gray-700">
                #{order._id}
              </p>
            </div>

            <div className="text-sm text-gray-500">
              {new Date(order.date).toLocaleDateString()}
            </div>

          </div>


          {/* Order Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.5fr_1fr_140px] gap-6 p-5">


            {/* Products */}
            <div>

              <p className="mb-3 text-xs font-semibold tracking-wide text-gray-400 uppercase">
                Products
              </p>

              <div className="flex flex-col gap-2">

                {order.items.map((item, itemIndex) => (

                  <div
                    key={itemIndex}
                    className="text-sm text-gray-700"
                  >
                    <p className="font-medium">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Quantity: {item.quantity} · Size: {item.size}
                    </p>
                  </div>

                ))}

              </div>

            </div>


            {/* Customer */}
            <div>

              <p className="mb-3 text-xs font-semibold tracking-wide text-gray-400 uppercase">
                Customer
              </p>

              <p className="font-medium text-gray-800">
                {order.address.firstName} {order.address.lastName}
              </p>

              <p className="mt-2 text-sm text-gray-600">
                {order.address.street}
              </p>

              <p className="text-sm text-gray-600">
                {order.address.city}, {order.address.state}
              </p>

              <p className="text-sm text-gray-600">
                {order.address.country} - {order.address.zipcode}
              </p>

              <p className="mt-2 text-sm text-gray-600">
                {order.address.phone}
              </p>

            </div>


            {/* Payment / Order Info */}
            <div>

              <p className="mb-3 text-xs font-semibold tracking-wide text-gray-400 uppercase">
                Order Info
              </p>

              <div className="flex flex-col gap-2 text-sm">

                <p>
                  <span className="text-gray-500">
                    Items:
                  </span>{' '}
                  {order.items.length}
                </p>

                <p>
                  <span className="text-gray-500">
                    Method:
                  </span>{' '}
                  {order.paymentMethod}
                </p>

                <p>
                  <span className="text-gray-500">
                    Payment:
                  </span>{' '}

                  <span
                    className={
                      order.payment
                        ? 'text-green-600 font-medium'
                        : 'text-orange-500 font-medium'
                    }
                  >
                    {order.payment ? 'Done' : 'Pending'}
                  </span>
                </p>

              </div>

            </div>


            {/* Amount + Status */}
            <div className="flex flex-col lg:items-end">

              <p className="mb-2 text-xs font-semibold tracking-wide text-gray-400 uppercase">
                Total
              </p>

              <p className="mb-4 text-xl font-semibold text-gray-800">
                {currency}{order.amount}
              </p>

              <label className="mb-1 text-xs text-gray-500">
                Order Status
              </label>

              <select
                onChange={(event) =>
                  statusHandler(event, order._id)
                }
                value={order.status}
                className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg cursor-pointer lg:w-auto focus:outline-none focus:ring-2 focus:ring-blue-100"
              >

                <option value="Order Placed">
                  Order Placed
                </option>

                <option value="Packing">
                  Packing
                </option>

                <option value="Shipped">
                  Shipped
                </option>

                <option value="Out for Delivery">
                  Out for Delivery
                </option>

                <option value="Delivered">
                  Delivered
                </option>

              </select>

            </div>

          </div>

        </div>

      ))}


      {/* Empty State */}
      {orders.length === 0 && (

        <div className="py-12 text-center bg-white border border-gray-200 rounded-xl">

          <p className="text-gray-500">
            No orders found.
          </p>

        </div>

      )}

    </div>

  </div>
)
}

export default Order