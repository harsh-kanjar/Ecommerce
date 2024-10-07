import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsState from "./context/products/ProductsState";
import {BottomButton,Footer,Navbar} from './Components'
import {AddProduct,AllPages,Cart,Gallery,Home,Login,SignUp,MakeOrder,ProductDetails,MyOrders,Order,OrderSuccess,Products,UploadImages,UserInfo} from './Pages'
function App() {
  return (
    <>
      <ProductsState>
        <Router>
          <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/allpages" element={<AllPages />} />
              <Route exact path="/products" element={<Products />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<SignUp />} />
              <Route exact path="/user" element={<UserInfo/>} />
              <Route exact path="/makeorder" element={<MakeOrder/>} />
              <Route exact path="/cart" element={<Cart/>} />
              <Route exact path="/order" element={<Order/>} />
              <Route exact path="/myorders" element={<MyOrders/>} />
              <Route exact path="/success" element={<OrderSuccess/>} />
              <Route exact path="/productdetails/:id" element={<ProductDetails/>} />
              <Route exact path="/admin/addproduct" element={<AddProduct/>} />
              <Route exact path="/admin/imagegallery" element={<UploadImages/>} />
              <Route exact path="/admin/gallery" element={<Gallery/>} />
            </Routes>
          <BottomButton/>
          <Footer/>
        </Router>
      </ProductsState>

    </>
  );
}

export default App;