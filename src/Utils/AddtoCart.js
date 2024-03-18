
import Cookies from 'js-cookie'

import { BASE_URL } from '../AdminComponent/BaseUrl';
import custdecryptedUserId from './CustUserid';
import { useState } from 'react';



const addToCart = async (pro_id, title, catid, price) => {

    try {
      
        

        if (!Cookies.get("orderid") && !Cookies.get("custuserid")) {
            const randomUserId = Math.random().toString(36).substring(2);

            const user = {
                id: randomUserId,
                pro_id: pro_id
            }

            const response = await fetch(`${BASE_URL}/addToCart`, {
                method: "POST",
                body: JSON.stringify({
                    userId: user.id,
                    pro_id: user.pro_id,
                    pro_name: title,
                    catid: catid,
                    price: price,
                    p_qty: "1"

                }),
                headers: {
                    "Content-type": "application/json"
                }
            })

            const apiData = await response.json();
            Cookies.set("orderid", apiData[0].orderid , { expires: 365 })

        }else if (Cookies.get("custuserid") && !Cookies.get("orderid")) {


            const user = {
                id: custdecryptedUserId(),
                pro_id: pro_id
            }


            const response = await fetch(`${BASE_URL}/addToCart`, {
                method: "POST",
                body: JSON.stringify({
                    userId: user.id,
                    pro_id: user.pro_id,
                    pro_name: title,
                    catid: catid,
                    price: price,
                    p_qty: "1"

                }),
                headers: {
                    "Content-type": "application/json"
                }
            })

            const apiData = await response.json();
            Cookies.set("orderid", apiData[0].orderid , { expires: 365 })
        }else if ((Cookies.get("custuserid") && Cookies.get("orderid")) || Cookies.get("orderid")) {

            const user = {
                id: custdecryptedUserId(),
                orderid: Cookies.get("orderid"),
                pro_id: pro_id
            }



            const response = await fetch(`${BASE_URL}/addToCart`, {
                method: "POST",
                body: JSON.stringify({
                    userId: user.id,
                    orderid: user.orderid,
                    pro_id: user.pro_id,
                    pro_name: title,
                    catid: catid,
                    price: price,
                    p_qty: "1"
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })

            const apiData = await response.json();


        }


    }
    catch {

    }

}

export default addToCart;