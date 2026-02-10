import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { db } from "../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import ProductOrderComp from "./ProductOrderComp";

const OrderHistoryComp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        setCurrentUser(user);
        const ordersRef = collection(db, "orders");
        const data = await getDocs(ordersRef);
        const filteredData = data.docs.map((doc:any) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log("filteredData", filteredData);
        setOrders(filteredData);
      }
    });
  }, []);

  return (
    <>
      <h2 className="center">Order History</h2>
      <ul>
        {orders &&
          orders.length > 0 &&
          orders.map((order) => {
            return (
              <li key={crypto.randomUUID()}>
                <ProductOrderComp order={order} />
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default OrderHistoryComp;
