import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoleData } from '../Store/Role/role-action';
import decryptedUserId from '../Utils/UserID';
import { BASE_URL, IMG_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import Loader from './Loader';



const Collection = () => {

    const [cat, setCatData] = useState([])
    const [error, setError] = useState({})
    const [image, setImage] = useState()
    const [uid, setUid] = useState([])
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [cid, setCid] = useState("")
    const [loader, setLoader] = useState(false)
    const [value, setValue] = useState({
        title: "" || uid.title,
    })

    useEffect(() => {
        setValue({
            title: uid.title,
            
        })
    }, [uid])

    const validateForm = () => {
        let isValid = true
        const newErrors = {}

        if (!value.title) {
            isValid = false;
            newErrors.title = "title is required"
        }

        if (uid.image == undefined && !image) {
            isValid = false;
            newErrors.logo = "image is required";
        }

        setError(newErrors)
        return isValid
    }



    async function getcatData() {
        axios.get(`${BASE_URL}/collection_data`)
            .then((res) => {
                console.log(res.data)
                setCatData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getcatData()
    }, [])



    const handleClick = (id) => {
        setCid(id)
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: true,
        }));
    };
    const handleCancel = (id) => {
        // Hide the confirmation dialog without performing the delete action
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    };


    const handleUpload = async (e) => {
        const file = e.target.files[0]
        setImage(file)
        console.log(file);
    }


    const handleDelete = (id) => {
        const data = {
            cat_id: id
        }

        axios.post(`${BASE_URL}/collection_delete`, data)
            .then((res) => {
                getcatData()

            })
            .catch((err) => {
                console.log(err)
            })

        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    }

    const handleUpdate = (id) => {
        setValue({
            description: ""
        })
        setLoader(true)
        axios.post(`${BASE_URL}/collection_update`, { u_id: id })
            .then((res) => {
                setUid(res.data[0])
                setLoader(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }



// console.log(value.title, "rrr")

const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
        const formdata = new FormData();

        setLoader(true);
        formdata.append('title', value.title);
        if (image) {
            formdata.append('image', image);
        } else {
            formdata.append('image', uid.image);
        }
        console.log([...formdata]);
        formdata.append('u_id', uid.id);
        formdata.append('user_id', decryptedUserId())

        axios.post(`${BASE_URL}/add_collection`, formdata)
            .then((res) => {
                alert(res.data.message); 
                getcatData();
                setLoader(false);
                setValue({
                    title: "",
                });
                setImage('');
                setUid([]);
            })
            .catch((err) => {
                console.log(err);
            });
    }
};


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))

        if (value.slug) {
            axios.post(`${BASE_URL}/check_againslug`, { slug: value.slug })
                .then((res) => {
                    console.log(res)
                })
        }

    }

    const columns = [
        {
            field: 'index',
            headerName: 'ID',
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            flex: 1,
            filterable: false,
        },
        { field: 'title', headerName: 'Title', flex: 2 },
        {
            field: 'image', headerName: 'image', flex: 2, renderCell: (param) => {
                return (
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", display: "flex", overflow: "hidden", alignItems: "center", justifyContent: "center" }}>

                        <img src={`${IMG_URL}/Collection/${param.row.image}`} alt='image' />
                    </div>
                )
            }
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        {roleaccess >= 2 && <EditIcon sx={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.id)} />}
                        {roleaccess > 3 && <DeleteIcon style={{ color: "red" }} onClick={() => handleClick(params.row.id)} />}
                    </>
                )
            }
        },
    ];

    const rowsWithIds = cat.map((row, index) => ({ index: index + 1, ...row }));

    const roledata = {
        role: Cookies.get(`role`),
        pageid: 16
    }

    const dispatch = useDispatch()
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);


    useEffect(() => {
        dispatch(getRoleData(roledata))
    }, [])



    return (

        <div class="container-fluid page-body-wrapper position-relative col-lg-10" >
            <InnerHeader />
            {loader && <Loader />}
            {roleaccess > 1 ? <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-5 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Collection</h4>

                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">Title<span className='text-danger'>*</span></label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.title} placeholder="Title" name='title' onChange={onhandleChange} />
                                            {error.title && <span className='text-danger'>{error.title}</span>}
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">Image<span className='text-danger'>*</span></label>
                                            <input type="file" class="form-control" id="exampleInputUsername1" onChange={handleUpload} name="image" placeholder="Enter.." />
                                            {error.logo && <span className='text-danger'>{error.logo}</span>}

                                        </div>
                                        <div>
                                            <img style={{ width: "200px" }} src={`${IMG_URL}/Collection/${uid.image}`} alt="" />
                                        </div>
                                        {roleaccess > 2 && <>  <button type="submit" class="btn btn-primary mr-2">Submit</button>
                                            <button type='button' onClick={() => {
                                                window.location.reload()
                                            }} class="btn btn-light">Cancel</button></>}

                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">Collection</h4>
                                            <p class="card-description">
                                                List Of Collection
                                            </p>
                                        </div>

                                    </div>
                                    <div>
                                        <DataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            getRowId={(row) => row.id}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { pageSize: 10, page: 0 },
                                                },
                                            }}
                                        />

                                        {confirmationVisibleMap[cid] && (
                                            <div className='confirm-delete'>
                                                <p>Are you sure you want to delete?</p>
                                                <button onClick={() => handleDelete(cid)} className='btn btn-sm btn-primary'>OK</button>
                                                <button onClick={() => handleCancel(cid)} className='btn btn-sm btn-danger'>Cancel</button>
                                            </div>
                                        )}
                                    </div>


                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div> : <h1>No Access</h1>}

        </div>

    )
}

export default Collection