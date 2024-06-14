import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoleData } from '../Store/Role/role-action';
import decryptedUserId from '../Utils/UserID';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import Loader from './Loader';

const AboutUS = () => {


    const [errors, setErrors] = useState({})
    const [loader, setLoader] = useState(false)
    const [uid, setUid] = useState([])
    const [specification, setSpecification] = useState('')
    const [value, setValue] = useState({
        abouttitle: "",
        aboutdescription: ""

    })

    useEffect(() => {
        setValue({
            abouttitle: uid.top_title,
        })
    }, [uid])

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!value.abouttitle) {
            isValid = false;
            newErrors.abouttitle = "Title is required";
        }
        if (!specification) {
            isValid = false;
            newErrors.desc = "Description is required";
        }





        setErrors(newErrors);
        setTimeout(() => {
            setErrors("")
        }, 5000);
        return isValid;


    }



    async function fetchdata() {
  
        axios.get(`${BASE_URL}/getabout`,)
            .then((res) => {
                setUid(res.data[0])
                setLoader(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }





    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            setLoader(true)

            const data = {
                abouttitle: value.abouttitle,
                aboutdescription: specification,
                user_id: decryptedUserId(),
            }

            axios.post(`${BASE_URL}/update_about`, data)
                .then((res) => {
                    alert(res.data)
                    setLoader(false)

                    // window.location.pathname = '/webapp/aboutus'

                    fetchdata()

                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }




    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }





    const roledata = {
        role: Cookies.get(`role`),
        pageid: 3
    }

    const dispatch = useDispatch()
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);



    useEffect(() => {
        dispatch(getRoleData(roledata))
        fetchdata()
    }, [])

    return (

        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            {loader && <Loader />}

            {roleaccess > 1 ? <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add About Us</h4>

                                    <form class="forms-sample" onSubmit={handleSubmit}>

                                        <div className='row'>

                                            <div class="form-group col-lg-12">
                                                <label for="exampleInputUsername1">About Title</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" placeholder="about Title" value={value.abouttitle} name='abouttitle' onChange={onhandleChange} />
                                                {errors.abouttitle && <div className="text-danger">{errors.abouttitle}</div>}
                                            </div>
                                            <div class="form-group col-lg-12">
                                            <label for="exampleInputUsername1">Description</label>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    style={{height : "1000px"}}
                                                    data={uid.top_desc}
                                                    onReady={(editor) => {
                                                        editor.editing.view.change((writer) => {
                                                            writer.setStyle("min-height", "400px", editor.editing.view.document.getRoot());
                                                        });
                                                    }}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setSpecification(data)
                                                    }}
                                                    onBlur={(event, editor) => {
                                                        // console.log('Blur.', editor);
                                                    }}
                                                    onFocus={(event, editor) => {
                                                        // console.log('Focus.', editor);
                                                    }}
                                                />
                                                        {errors.desc && <div className="text-danger">{errors.desc}</div>}
                                            </div>




                                        </div>




                                        {roleaccess > 2 && <> <button type="submit" class="btn btn-primary mr-2">Submit</button>
                                            <button type='button' onClick={() => {
                                                window.location.reload()
                                            }} class="btn btn-light">Cancel</button></>}


                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div> : <h1>No Access</h1>}

        </div>

    )
}

export default AboutUS ;