import React, { useEffect, useState } from 'react'
import InnerHeader from './InnerHeader'
import { Autocomplete, Radio, TextField } from '@mui/material';
import { BASE_URL } from './BaseUrl';
import axios from 'axios';

function RoleAssignment() {

    const [selectedOption, setSelectedOption] = useState(null);
    const [role, setRoleData] = useState([])
    const [rolePages, setRolePages] = useState([])
    const [roleId, setRoleId] = useState(false)

    // Function to handle changes in the enable/disable state for an ID
    const handleRadioChange = (event, indexToUpdate) => {
        const newAccessid = +event.target.value;
        const updatedData = rolePages.map((item, index) => {
            if (index === indexToUpdate) {
                return { ...item, accessid: newAccessid };
            }
            return item;
        });
        setRolePages(updatedData);
    };


    async function getRoleData() {
        axios.get(`${BASE_URL}/role_data`)
            .then((res) => {
                setRoleData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getRoleData()
    }, [])

    const HandleChange = (selectedValue) => {
        if (selectedValue) {
            setRoleId(true)
            const selectedId = selectedValue.id;
            setSelectedOption(selectedValue);
            // Now you have the selected id, you can use it in your application logic
            getRolePages(selectedId)
        } else {
            setRoleId(false)
            setSelectedOption(null);
        }
        setRolePages([])
    };

    async function getRolePages(rid) {
        axios.post(`${BASE_URL}/role_pages`, { role_id: rid })
            .then((res) => {
                console.log(res.data, ">>>>>")
                setRolePages(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (

        <div class="container-fluid page-body-wrapper">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Select Role</h4>
                                    <form class="forms-sample pt-3" >
                                        <div class="form-group">
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                options={role}
                                                value={selectedOption}
                                                getOptionLabel={(option) => option.title}
                                                getOptionSelected={(option, value) => option.id === value.id}
                                                sx={{ width: "100%", border: "none", borderRadius: "5px" }}
                                                renderInput={(params) => <TextField {...params} />}
                                                onChange={(event, value) => HandleChange(value)}
                                                name="category"
                                            />
                                        </div>
                                        {roleId === true && <div class="form-group" >

                                            <table class="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            Role Rights
                                                        </th>
                                                        <th>
                                                            Hide
                                                        </th>

                                                        <th>
                                                            Show
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {rolePages.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    {item.pageid}
                                                                </td>
                                                                <td>
                                                                    <Radio
                                                                        checked={item.accessid === 0}
                                                                        onChange={(e) => handleRadioChange(e, index)}
                                                                        value={0}
                                                                        name={`radio-buttons-${item.pageid}`}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Radio
                                                                        checked={item.accessid === 1}
                                                                        onChange={(e) => handleRadioChange(e, index)}
                                                                        value={1}
                                                                        name={`radio-buttons-${item.pageid}`}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoleAssignment