import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
    if (isPending)
        return _jsx("p", { children: "Loading..." });
    if (error)
        return _jsxs("p", { children: ["An error has occured: ", error.message] });
    return (_jsxs(_Fragment, { children: [_jsx(NavBar, {}), data && (_jsx(_Fragment, { children: _jsx(ProductComp, { product: data }) }))] }));
}
export default ProductPage;
