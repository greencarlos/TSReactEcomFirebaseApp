import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { db } from "../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import ProductComp from "./ProductComp";

const OrderHistoryComp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user: User) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);

  const getOrders = async () => {
    const ordersRef = collection(db, "orders");
    const data = await getDocs(ordersRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log("currentUser", currentUser);
    console.log("filteredData", filteredData);
    setOrders(filteredData);
  };

  return (
    <>
      <h2 className="center">Order History</h2>
      <ul>
        {orders.length > 0 &&
          orders.map((order) => {
            if (order.id === currentUser.id) {
              return order.cart.map((item) => (
                <li key={crypto.randomUUID()}>
                  <ProductComp product={item} />
                </li>
              ));
            }
          })}
      </ul>
    </>
  );
};

export default OrderHistoryComp;
