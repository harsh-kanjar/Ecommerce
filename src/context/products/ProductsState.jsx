import productContext from "./productContext";
import { useState } from "react";

function ProductsState(props) {
    const host = "https://server-1-ftit.onrender.com"
    // const host = "http://localhost:5000";
    const productsInitial = [];
    const cartInitial = [];
    const [price,setPrice] = useState(0);
    // Fetch all products using fetch api
    const getAllProduct = async () => {
        // Api call
        const response = await fetch(`${host}/api/v1/product/getallproducts`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        });
        const json = await response.json();
        console.log(json);
        setProducts(json);
        // ------------------------------------
    };

    // Fetch cart
    const getAllCartItems = async () => {
        const response = await fetch(`${host}/api/v1/product/getcartproducts`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        });
        const json = await response.json();
        console.log(json);
        setProducts(json);
        // ------------------------------------
    };

     // Function to add product via API
     const addProduct = async (productData) => {
        try {
            const response = await fetch(`${host}/api/v1/product/addproduct`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token'),
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server responded with:", errorText);
                throw new Error(`Server error: ${response.status} - ${response.statusText}`);
            }

            const product = await response.json();
            setProducts(products.concat(product));
            console.log("Product added successfully:", product);
        } catch (error) {
            console.error("An error occurred while adding the product:", error);
        }
    };

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    
    const addToCart = async (productId, quantity) => {
        try {
            const response = await fetch(`${host}/api/v1/product/addtocart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token'),
                },
                body: JSON.stringify({ productId, quantity }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server responded with:", errorText);
                throw new Error(`Server error: ${response.status} - ${response.statusText}`);
            }

            setSnackbarOpen(true);  // Open Snackbar on success
            const data = await response.json();
            console.log("Product added to cart successfully:", data.cartItem);
            setTimeout(() => setSnackbarOpen(false), 3000);
        } catch (error) {
            console.error("An error occurred while adding the product to the cart:", error);
        }
    };

    const removeFromCart = async (cartItemId) => {
        try {
            const response = await fetch(`${host}/api/v1/product/removefromcart/${cartItemId}`, {
                method: "DELETE",
                headers: {
                    "auth-token": localStorage.getItem('token'),
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server responded with:", errorText);
                throw new Error(`Server error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Product removed from cart successfully:", data.cartItem);
        } catch (error) {
            console.error("An error occurred while removing the product from the cart:", error);
        }
    };

    const calculateDiscount = (price) => {
        if (price > 5000) return 20;
        if (price > 2000) return 15;
        if (price > 1000) return 10;
        if (price > 500) return 5;
        return 0;
    };

    
    const [products, setProducts] = useState(productsInitial);
    const [cartProducts, setCartProducts] = useState(productsInitial);

    return (
        <productContext.Provider
            value={{ host,products, getAllProduct, addProduct, setPrice, price, getAllCartItems , addToCart ,snackbarOpen,setSnackbarOpen, removeFromCart,calculateDiscount }}
        >
            {props.children}
        </productContext.Provider>
    );
}
export default ProductsState