import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ProfileSidebar from '../../Subcomponents/ProfileSidebar';
import { getCartCount } from '../../../Store/Cart/cart-action';
import { getWishList, removeFromWishList } from '../../../Store/WishList/wishlist-actions';
import custdecryptedUserId from '../../../Utils/CustUserid';
import axios from 'axios';
import { BASE_URL } from '../../../AdminComponent/BaseUrl';

const ProfileOrder = () => {

    const [order, setOrder] = useState([])


    async function getOrderData() {
        const data = {
            user_id: custdecryptedUserId()
        }
        axios.post(`${BASE_URL}/profile_order`, data)
            .then((res) => {
                setOrder(res.data)
            })
    }

    useEffect(() => {
        getOrderData()
    }, [])

    return (
        <div className='row p-5'>
   
            <div className='col-lg-4 col-md-4 col-12'>
                <ProfileSidebar />
            </div>
            <div className='col-lg-8 col-md-4 col-12'>
                <div className='row'>
                    <div className='p-3'>
                        <h2>ADD ADRESS :</h2>
                    </div>
                </div>








                <div class="tab-pane border" id="orders" role="tabpanel">
                    <div class="my-account-orders">
                        <div class="table-responsive">
                            <table border="1" style={{borderColor :"#f7f7f7"}} class="table">
                                <thead>
                                    <tr>
                                        <th style={{ width: "10%" }}>Order#</th>
                                        <th  style={{ width: "50%" }}>Date Purchased</th>
                                        <th  style={{ width: "20%" }}>Total</th>
                                        <th  style={{ width: "20%" }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {order.map((item) => {
                                        return (
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>
                                                    {item.created_date}
                                                </td>
                                                <td>
                                                    {item.totalamt}
                                                </td>
                                                <td>
                                                    {item.ostatus}
                                                </td>

                                            </tr>
                                        )
                                    })}


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>






            </div>
        </div>


    )
}

export default ProfileOrder