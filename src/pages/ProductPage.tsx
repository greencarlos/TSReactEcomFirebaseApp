import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import NavBar from "../navigation/navbar";
import ProductComp from "../comps/ProductComp";

function ProductPage() {
  const { id } = useParams();

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const result = await response.json();
      return result;
    },
  });

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>An error has occured: {error.message}</p>;

  return (
    <>
      <NavBar />
      {data && (
        <>
          <ProductComp product={data} />
        </>
      )}
    </>
  );
}

export default ProductPage;
