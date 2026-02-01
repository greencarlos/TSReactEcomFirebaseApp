import { store } from "../store/CartStore";
import {hashTable} from '../funcs/hashTable' 

function PriceComp() {
  const cart = store.getState();
  const entries = Object.entries(hashTable(cart));

  return (
    <h3 className="center">
      Total Cart price $
      {hashTable
        ? Math.round(
            entries.reduce((acc, item, idx) => {
              const [count, product, price] = item[1];
              acc += count * price;
              return acc;
            }, 0)
          )
        : 0}
    </h3>
  );
}

export default PriceComp;
