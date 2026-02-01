import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import NavBar from "../navigation/navbar";
import ProductComp from "../comps/ProductComp";

function HomePage() {
  const [categories, setCategories] = useState<string>([]);
  const [products, setProducts] = useState([]);

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const result = await response.json();
      setProducts(result);
      return result;
    },
  });

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>An error has occured: {error.message}</p>;

  const selectCategories = (evt) => {
    if (evt.target.value === "all categories") {
      setProducts(data);
    } else {
      setProducts(
        data.filter((product) => product.category === evt.target.value)
      );
    }
  };

  return (
    <>
      <NavBar />
      <h1 className="header">Home Page</h1>
      <p className="center">{isFetching ? "Updating..." : ""}</p>
      <div className="categories">
        <label htmlFor="categories">Select a category: </label>
        <select
          name="categories"
          className="categories"
          onChange={(e) => selectCategories(e)}
        >
          <option>all categories</option>
          {data && data.length > 0 &&
            Array.from(new Set(data.map((product) => product.category))).map(
              (category, i) => (
                <option key={crypto.randomUUID()}>{category}</option>
              )
            )}
        </select>
      </div>
      <div className="card">
        {products &&
          products.map((product, idx) => (
            <ProductComp key={crypto.randomUUID()} product={product} />
          ))}
      </div>
    </>
  );
}

export default HomePage;
