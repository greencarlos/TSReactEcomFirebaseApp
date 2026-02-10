import { useState, useEffect } from "react";
import { Link } from "react-router";
import { store, clearCart } from "../store/CartStore";
import { hashTable } from "../funcs/hashTable";
import { db } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import NavBar from "../navigation/navbar";
import PriceComp from "../comps/PriceComp";
import MinProductComp from "../comps/MinProductComp";

function CheckoutPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const auth = getAuth();
  const cart = store.getState();
  const entries = Object.entries(hashTable(cart));

  useEffect(() => {
    onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        setCurrentUser(user);
        const orderRef = collection(db, "orders");
        await addDoc(orderRef, { date: new Date().getTime(), uid: user.uid, cart: [...cart] });
      }
    });
  }, []);

  const handleClick = async () => {
    store.dispatch(clearCart());
    alert("Thank you for your purchase!");
  };

  return (
    <>
      <NavBar />
      <h1 className="center">Purchase Page</h1>
      <PriceComp />
      {cart &&
        entries.map((item, idx) => {
          const [count, product, price] = item[1];

          return (
            <div key={product.id}>
              <MinProductComp product={product} count={count} />
            </div>
          );
        })}
      {cart.length > 0 && (
        <Link to="/" onClick={() => handleClick()}>
          <button className="checkout">Purchase Now</button>
        </Link>
      )}
    </>
  );
}

export default CheckoutPage;
