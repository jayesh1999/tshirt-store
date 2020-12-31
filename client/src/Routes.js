import React from "react"
import {BrowserRouter,Switch,Route} from "react-router-dom"
import Home from "./core/Home"
import Signup from "./user/Signup"
import Signin from "./user/Signin"
import PrivateRoute from "./auth/helper/PrivateRoutes"
import AdminRoute from "./auth/helper/AdminRoutes"
import UserDashBoard from "./user/UserDashBoard"
import AdminDashBoard from "./user/AdminDashBoard"
import AddCategory from "./admin/AddCategory"
import Addproduct from "./admin/AddProduct"
import ManageCategories from "./admin/ManageCategories"
import UpdateProduct from "./admin/UpdateProduct"
import ManageProducts from "./admin/ManageProducts"
import Cart from "./core/Cart"
import ManageOrders from "./admin/ManageOrders"
import UpdateOrder from "./admin/UpdateOrder"




 const Routes = ()=>{
    return(
        <BrowserRouter>
            <Switch>
               <Route exact path="/" component={Home} />
               <Route exact path="/signup" component={Signup} />
               <Route exact path="/signin" component={Signin} />
               <PrivateRoute exact path="/cart" component={Cart} />
               <PrivateRoute exact path="/user/dashboard" component={UserDashBoard} />
               <AdminRoute exact path="/admin/dashboard" component={AdminDashBoard} />
               <AdminRoute exact path="/admin/create/category" component={AddCategory} />
               <AdminRoute exact path="/admin/create/product" component={Addproduct} />
               <AdminRoute exact path="/admin/categories" component={ManageCategories} />
               <AdminRoute exact path="/admin/products" component={ManageProducts} />
               <AdminRoute exact path="/admin/product/update/:productId" component={UpdateProduct} />
               <AdminRoute exact path="/admin/order/update/:orderId" component={UpdateOrder} />
               <AdminRoute exact path="/admin/orders" component={ManageOrders} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;