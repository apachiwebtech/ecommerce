import { json } from "react-router-dom";
import { BASE_URL } from "../../AdminComponent/BaseUrl";
import { wishListActions } from "./wishListSlice";

export const addToWishList = (data) => {

    console.log(data);
    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL}/addToWishList`, {
                method: "POST",
                body: JSON.stringify({
                    userId: data.userId,
                    productId: data.id,
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })

            const apidata = await response.json();
            console.log(apidata);

            getWishList()

        } catch (error) {
            console.log(error)
        }
    }
}

export const getWishList = (data) => {


    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL}/getUserWishList`, {
                method: "POST",
                body: JSON.stringify({
                    userId: data,
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });

            const apiData = await response.json();
            dispatch(wishListActions.getWishList(apiData));
            console.log(apiData)
        } catch (error) {
            console.log(error)
        }

    }
}

export const removeFromWishList = (data) => {
    console.log(data, "from  deleteeeeeeeee");

    return async (dipatch) => {
        try {
            const response = await fetch(`${BASE_URL}/removeWishItem`, {
                method: "POST",
                body: JSON.stringify({
                    userId: data.userId,
                    productId: data.id,
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })
            const apiData = await response.json();

            console.log(apiData, "delete wish")
        } catch (error) {

        }
    }
}