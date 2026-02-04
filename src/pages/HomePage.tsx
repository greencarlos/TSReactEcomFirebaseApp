import { useState, useEffect } from "react";
import NavBar from "../navigation/navbar";
import ProductComp from "../comps/ProductComp";
import { db } from "../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import NewProductComp from "../comps/NewProductComp";

function HomePage() {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const productsCollectionRef = collection(db, "products");

  useEffect(() => {
    const getProductList = async () => {
      try {
        setIsLoading(true);
        const data = await getDocs(productsCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setProductList(filteredData);
        setCategories(filteredData);
      } catch (err) {
        console.error("Error: ", err);
      } finally {
        setIsLoading(false);
      }
    };
    getProductList();
  }, []);

  const selectCategories = (value) => {
    if (value === "all categories") {
      setCategories(productList);
    } else {
      setCategories(
        productList.filter((product) => product.category === value)
      );
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <NavBar />
      <h1 className="header">Home Page</h1>
      <div className="categories">
        <label htmlFor="categories">Select a category: </label>
        <select
          name="categories"
          className="categories"
          onChange={(e) => selectCategories(e.target.value)}
        >
          {productList &&
            productList.length > 0 &&
            Array.from(
              new Set(
                [
                  { category: "" },
                  { category: "all categories" },
                  ...productList,
                ].map((product) => product.category)
              )
            ).map((category) => (
              <option
                key={crypto.randomUUID()}
                onClick={(e) => selectCategories(e)}
              >
                {category}
              </option>
            ))}
        </select>
      </div>
      <div className="card">
        {categories &&
          categories.map((product) => (
            <ProductComp key={crypto.randomUUID()} product={product} />
          ))}
      </div>
      <NewProductComp />
    </>
  );
}

export default HomePage;
