import {configureStore} from '@reduxjs/toolkit'
import productReducer from './Products/productSlice';
import wishtListReducer from './WishList/wishListSlice';
const store = configureStore({
    reducer : {
        products : productReducer,
        wishlist : wishtListReducer,
    }
})
export default store;