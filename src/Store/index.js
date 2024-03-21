import {configureStore} from '@reduxjs/toolkit'
import productReducer from './Products/productSlice';
import wishtListReducer from './WishList/wishListSlice';
import cartCountReducer from './Cart/cartSlice';
const store = configureStore({
    reducer : {
        products : productReducer,
        wishlist : wishtListReducer,
        cartCount : cartCountReducer,
    }
})
export default store;