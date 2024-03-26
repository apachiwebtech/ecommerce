import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../AdminComponent/BaseUrl';
import custdecryptedUserId from '../../../Utils/CustUserid';
import ProfileSidebar from '../../Subcomponents/ProfileSidebar';
import Icon from '@mdi/react';
import { mdiFileEye } from '@mdi/js';
import { Link } from 'react-router-dom';

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
                            <table border="1" style={{ borderColor: "#f7f7f7" }} class="table">
                                <thead>
                                    <tr>
                                        <th style={{ width: "25%" }}>Order#</th>
                                        <th style={{ width: "30%" }}>Date Purchased</th>
                                        <th style={{ width: "20%" }}>Total</th>
                                        <th style={{ width: "15%" }}>Status</th>
                                        <th style={{ width: "10%" }}>View</th>

                                    </tr>
                                </thead>
                                <tbody >
                                    {order.map((item) => {

                                        const timestamp = item.order_date;
                                        const date = new Date(timestamp);

                                        const day = String(date.getDate()).padStart(2, '0');
                                        const month = String(date.getMonth() + 1).padStart(2, '0');
                                        const year = String(date.getFullYear()).slice();

                                        const formattedDate = `${day}-${month}-${year}`;

                                        return (
                                            <tr>
                                                <td>{item.orderno}</td>
                                                <td>
                                                    {formattedDate}
                                                </td>
                                                <td>
                                                    ₹{item.totalamt}
                                                </td>
                                                <td>
                                                    {item.ostatus === "Delivered" ?
                                                        <span className='text-success'>Delivered</span>
                                                        :
                                                        item.ostatus === "Dispatched" ?
                                                            <span className='text-success'>Dispatched</span>
                                                            :
                                                            item.ostatus === "Cancelled" ?
                                                                <span className='text-danger'>Cancelled</span> :
                                                                item.ostatus === "Confirm" ?
                                                                    <span className='text-Success'>Cancelled</span> :
                                                                    <span className='text-warning'>Pending</span>
                                                    }




                                                </td>
                                                <td>
                                                    <Link to={`/profile/order/${item.id}`}><Icon path={mdiFileEye} size={1} /></Link>
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