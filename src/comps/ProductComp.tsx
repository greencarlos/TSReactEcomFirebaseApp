import { useState } from "react";
import { Rating } from "@mui/material";
import { NavLink } from "react-router";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { store, addToCart } from "../store/CartStore";
import { db } from "../../firebaseConfig";

function ProductComp({ product:any }) {
  const [productKey, setKey] = useState<string>("");
  const [productVal, setVal] = useState<string>("");

  const handleDelete = async () => {
    const productDoc = doc(db, "products", product.id);
    await deleteDoc(productDoc);
    window.location.reload();
  };

  const handleUpdate = async () => {
    const updatedVal = {};
    const productDoc = doc(db, "products", product.id);

    updatedVal[`${productKey}`] = productVal;
    await updateDoc(productDoc, updatedVal);

    setKey("");
    setVal("");
    window.location.reload();
  };

  const add = (p) => {
    store.dispatch(addToCart(p));
  };

  return (
    <div className="center">
      <div key={product.id}>
        <p>
          <strong>Title:</strong> {product.title}
        </p>
        <button onClick={() => handleDelete()}>Delete product</button>
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
        <p>
          <strong>Supply:</strong> {product.rating?.count}
        </p>
        <button onClick={() => add(product)}>Add to Cart</button>
        <br />
        <select onClick={(e) => setKey(e.target.value)}>
          {Object.keys(product).map((key) => (
            <option key={crypto.randomUUID()}>{key}</option>
          ))}
        </select>
        <input
          placeholder="Update this value"
          onChange={(e) => setVal(e.target.value)}
        />
        <button onClick={() => handleUpdate()}>Update</button>
        <p>
          <strong>Description:</strong> {product.description}
        </p>
      </div>
    </div>
  );
}

export default ProductComp;
