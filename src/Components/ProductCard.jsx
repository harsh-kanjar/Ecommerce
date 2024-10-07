import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartRounded } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import productContext from '../context/products/productContext';
import CircularProgress from '@mui/material/CircularProgress';

function ProductCard(props) {
    const [cartItems, setCartItems] = useState([]);
    
    const [loading, setLoading] = useState(true); // New state for loader
    const context = useContext(productContext);
    const { snackbarOpen,setSnackbarOpen,addToCart,removeFromCart,calculateDiscount } = context;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            await props.getAllProduct();
            setLoading(false);
        };
        fetchProducts();
    }, []);

    const handleCartClick = async (productId) => {
        const cartItem = cartItems.find(item => item.product === productId);

        if (cartItem) {
            const userConfirmed = window.confirm("Are you sure you want to remove it from the cart?");
            if (userConfirmed) {
                await removeFromCart(cartItem._id);
            }
        } else {
            await addToCart(productId, 1);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Product added successfully to cart!
                </Alert>
            </Snackbar>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress /> {/* Show loader while loading */}
                </Box>
            ) : (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, margin: 2 }}>
                    {props.products.map((product) => {
                        const discount = calculateDiscount(product.price);
                        const originalPrice = product.price * (1 + discount / 100);

                        return (
                            <Card key={product._id} sx={{ width: 320, maxWidth: '100%', boxShadow: 'lg' }}>
                                <CardOverflow>
                                    <div style={{maxWidth:'200px', maxHeight:'400px',padding:'0 auto'}}>
                                        <img
                                            style={{maxWidth:'300px', maxHeight:'100%'}}
                                            src={product.featuredImage}
                                            alt={product.productName}
                                            loading="lazy"
                                        />
                                    </div>
                                </CardOverflow>
                                <CardContent>
                                    <Typography level="body-xs">{product.category}</Typography>
                                    <Link
                                        to={`/productdetails/${product._id}`}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Typography
                                            fontWeight="md"
                                            color="neutral"
                                            textColor="text.primary"
                                            overlay
                                            endDecorator={<ArrowOutwardIcon />}
                                        >
                                            {product.productName}
                                        </Typography>
                                    </Link>
                                    <Typography
                                        color='success'
                                        level="title-lg"
                                        sx={{ mt: 1, fontWeight: 'xl' }}
                                        endDecorator={
                                            <Chip component="span" size="sm" variant="soft" color="success">
                                                {discount}% off
                                            </Chip>
                                        }
                                    >
                                        <del>₹{originalPrice.toFixed(2)}/-</del>  -  ₹{product.price}/-
                                    </Typography>
                                    <Typography level="body-sm">
                                        Hurry up, only <b>{product.countOfStock}</b> left in stock!
                                    </Typography>
                                    <Typography sx={{ marginTop: 1 }} variant="p" level="body-sm" gutterBottom>Select size in cart: available in all sizes</Typography>
                                </CardContent>
                                <CardOverflow>
                                    {localStorage.getItem('token') ? (
                                        <Button onClick={() => handleCartClick(product._id)} variant="contained" startIcon={<ShoppingCartRounded />}>
                                            Add item
                                        </Button>
                                    ) : (
                                        <Button title='Login Required' variant="contained">
                                           <ShoppingCartRounded /> Add item
                                        </Button>
                                    )}
                                </CardOverflow>
                            </Card>
                        );
                    })}
                </Box>
            )}
        </>
    );
}

export default ProductCard;
