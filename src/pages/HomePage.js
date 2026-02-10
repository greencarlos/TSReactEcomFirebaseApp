import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
                const filteredData = data.docs.map((doc) => (Object.assign(Object.assign({}, doc.data()), { id: doc.id })));
                setProductList(filteredData);
                setCategories(filteredData);
            }
            catch (err) {
                console.error("Error: ", err);
            }
            finally {
                setIsLoading(false);
            }
        };
        getProductList();
    }, []);
    const selectCategories = (value) => {
        if (value === "all categories") {
            setCategories(productList);
        }
        else {
            setCategories(productList.filter((product) => product.category === value));
        }
    };
    if (isLoading)
        return _jsx("p", { children: "Loading..." });
    return (_jsxs(_Fragment, { children: [_jsx(NavBar, {}), _jsx("h1", { className: "header", children: "Home Page" }), _jsxs("div", { className: "categories", children: [_jsx("label", { htmlFor: "categories", children: "Select a category: " }), _jsx("select", { name: "categories", className: "categories", onChange: (e) => selectCategories(e.target.value), children: productList &&
                            productList.length > 0 &&
                            Array.from(new Set([
                                { category: "" },
                                { category: "all categories" },
                                ...productList,
                            ].map((product) => product.category))).map((category) => (_jsx("option", { onClick: (e) => selectCategories(e), children: category }, crypto.randomUUID()))) })] }), _jsx("div", { className: "card", children: categories &&
                    categories.map((product) => (_jsx(ProductComp, { product: product }, crypto.randomUUID()))) }), _jsx(NewProductComp, {})] }));
}
export default HomePage;
