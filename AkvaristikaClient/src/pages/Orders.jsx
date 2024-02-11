import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";
import { UserContext } from "../context/UserContext";
import NotFoundPage from "./NotFoundPage";

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const [readyPage, setReadyPage] = useState(false);
  const [rehydrate, setRehydrate] = useState(false);
  const { username, ready } = useContext(UserContext);
  const deleteOrder = (id) => {
    axios
      .delete("http://localhost:3500/deleteOrder", {
        params: { id: id },
      })
      .then((res) => {
        setRehydrate(!rehydrate);
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3500/getOrders");
        const ordersi = response.data;
        const updatedOrders = await Promise.all(
          ordersi.map(async (order) => {
            const updatedItems = await Promise.all(
              order.items.map(async (item) => {
                const ceoitem = await axios.get(
                  "http://localhost:3500/getItem",
                  {
                    params: { id: item._id },
                  }
                );
                return ceoitem.data;
              })
            );
            return { ...order, items: updatedItems };
          })
        );
        setOrders(updatedOrders);
        setReadyPage(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [rehydrate]);

  if (readyPage) {
    if (ready) {
      if (username) {
        if (username.role == "Admin") {
          return (
            <div className="glava" style={{ minHeight: "70vh" }}>
              {orders?.map((order, index) => (
                <div>
                  <table className="rwd-table">
                    <tbody>
                      <tr>
                        <th>{order.usernameUser}</th>
                        <th>{order.price}</th>
                        <th>
                          <svg
                            onClick={() => deleteOrder(order._id)}
                            fill="#000000"
                            width="30px"
                            height="30px"
                            viewBox="0 0 14 14"
                            role="img"
                            focusable="false"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill="green"
                              d="M13 4.1974q0 .3097-.21677.5265L7.17806 10.329l-1.0529 1.0529q-.21677.2168-.52645.2168-.30968 0-.52645-.2168L4.01935 10.329 1.21677 7.5264Q1 7.3097 1 7t.21677-.5265l1.05291-1.0529q.21677-.2167.52645-.2167.30968 0 .52645.2167l2.27613 2.2839 5.07871-5.0864q.21677-.2168.52645-.2168.30968 0 .52645.2168l1.05291 1.0529Q13 3.8877 13 4.1974z"
                            />
                          </svg>
                          <svg
                            onClick={() => deleteOrder(order._id)}
                            fill="red"
                            width="30px"
                            height="30px"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M4.293,18.293,10.586,12,4.293,5.707A1,1,0,0,1,5.707,4.293L12,10.586l6.293-6.293a1,1,0,1,1,1.414,1.414L13.414,12l6.293,6.293a1,1,0,1,1-1.414,1.414L12,13.414,5.707,19.707a1,1,0,0,1-1.414-1.414Z" />
                          </svg>
                        </th>
                      </tr>

                      {order.items.map((item) => (
                        <tr>
                          <td data-th="Movie Title">{item?.name}</td>
                          <td data-th="Gross">{item?.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          );
        } else {
          return <NotFoundPage />;
        }
      } else {
        return <NotFoundPage />;
      }
    }
  } else {
    return <LoadingPage />;
  }
};

export default Orders;
