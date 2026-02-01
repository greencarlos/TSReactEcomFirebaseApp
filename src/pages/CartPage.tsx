import NavBar from "../navigation/navbar";
import { store, removeItem } from "../store/CartStore";
import { Link } from "react-router";
import { hashTable } from "../funcs/hashTable";
import MinProductComp from '../comps/MinProductComp'

function CartPage() {
  const cart = store.getState();
  const entries = Object.entries(hashTable(cart));

  const remove = (p) => {
    store.dispatch(removeItem(p));
  };

  return (
    <>
      <NavBar />
      <h1 className="header">Cart Page</h1>
      <h3 className="center">
        Total Cart price $
        {cart.length > 0
          ? Math.round(
              entries.reduce((acc, item, idx) => {
                const [count, product, price] = item[1];
                acc += count * price;
                return acc;
              }, 0)
            )
          : 0}
      </h3>
      {cart &&
        entries.map((item, idx) => {
          const [count, product, price] = item[1];
          return (
            <div key={product.id}>
              <MinProductComp product={product} count={count}/>
              <button onClick={() => remove(product.id)}>
                Delete from Cart
              </button>
            </div>
          );
        })}
      <Link to="/purchase">
        {cart.length > 0 ? (
          <button className="checkout">Checkout Products</button>
        ) : (
          <></>
        )}
      </Link>
    </>
  );
}

export default CartPage;
