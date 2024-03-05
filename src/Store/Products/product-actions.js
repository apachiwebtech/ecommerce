import { productActions } from "./productSlice";
import { BASE_URL } from "../../Utils/BaseUrl";
export const getProducts = ()=>{
    return async (dispatch) =>{
        try{
            const response = await fetch(`${BASE_URL}/products`);

            const data = await response.json();

            dispatch(productActions.getProducts({
                products : data || [],
            }))
        }catch(error){
            console.error(error);

        }
    }
}