import { Rating } from "@mui/material";
import { NavLink } from "react-router";
import { store, addToCart } from "../store/CartStore";

function ProductComp({ product }) {
  const add = (p) => {
    store.dispatch(addToCart(p));
  };

  return (
    <div className="center">
      <div key={product.id}>
        <p>
          <strong>Title:</strong> {product.title}
        </p>
        <p className="price">
          <strong>Price:</strong> {Math.round(product.price) + ".95"}{" "}
          <s>{Math.round(product.price * 1.3) + ".95"}</s>
        </p>
        <p>
          <strong>Category:</strong> {product.category}
        </p>
        <NavLink to={`/product/${product.id}`}>
          Product Details
          <br />
          <img
            src={product.image || "../assets/images-not-found.webp"}
            alt={product.title}
          />
        </NavLink>
        <br />
        <Rating
          name="product-rating"
          defaultValue={product.rating?.rate}
          precision={0.1}
        />
        <br />
        <button onClick={() => add(product)}>Add to Cart</button>
        <p>
          <strong>Description:</strong> {product.description}
        </p>
        <p>
          <strong>Supply:</strong> {product.rating?.count}
        </p>
      </div>
    </div>
  );
}

export default ProductComp;
