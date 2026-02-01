import { Link } from "react-router";
import { store, clearCart } from "../store/CartStore";
import { hashTable } from "../funcs/hashTable";
import NavBar from "../navigation/navbar";
import PriceComp from "../comps/PriceComp";
import MinProductComp from "../comps/MinProductComp";

function CheckoutPage() {
  const cart = store.getState();
  const entries = Object.entries(hashTable(cart));

  const confirm = () => {
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
        <Link to="/" onClick={() => confirm()}>
          <button className="checkout">Purchase Now</button>
        </Link>
      )}
    </>
  );
}

export default CheckoutPage;
