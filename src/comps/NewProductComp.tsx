import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface Product {
  title?: string;
  category?: string;
  price?: number;
  rating?: number;
  supply?: string;
  description?: string;
}

function NewProductComp() {
  const [newProduct, setNewProduct] = useState<Product>({
    title: "",
    category: "",
    price: 0,
    rating: 0,
    supply: "",
    description: "",
  });
  const productCollectionRef = collection(db, "products");

  const handleOnChange = (key:string, val:any) => {
    const newState = { ...newProduct, [key]: val };
    setNewProduct(newState);
  };

  const handleSubmit = async () => {
    await addDoc(productCollectionRef, newProduct);
    setNewProduct({}); // this is intentional to clear newProduct
    window.location.reload();
  };

  return (
    <div className="center">
      <h3>Enter a new Product:</h3>
      <input
        placeholder="New Product Title..."
        type="string"
        onChange={(e) => handleOnChange("title", e.target.value)}
      />

      <br />

      <input
        placeholder="New Product Category..."
        type="string"
        onChange={(e) =>
          handleOnChange("category", e.target.value.toLowerCase())
        }
      />

      <br />

      <input
        placeholder="New Product Price..."
        type="number"
        onChange={(e) => handleOnChange("price", e.target.value)}
      />

      <br />

      <input
        placeholder="New Product Rating..."
        type="number"
        onChange={(e) => handleOnChange("rating", e.target.value)}
      />

      <br />

      <input
        placeholder="New Product Supply..."
        type="number"
        onChange={(e) => handleOnChange("supply", e.target.value)}
      />

      <br />

      <input
        placeholder="New Product Description..."
        type="string"
        onChange={(e) => handleOnChange("description", e.target.value)}
      />

      <br />

      <button onClick={() => handleSubmit()}>Submit new product</button>
    </div>
  );
}

export default NewProductComp;
