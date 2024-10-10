import { useState } from "react"
import { BASE_URL } from "../AdminComponent/BaseUrl"
import axios from "axios";

const useBreadcrumb = () => {

    const [breaddata , setData] = useState([])


    const getbreadcrum = () =>{
        axios.get(`${BASE_URL}/getbreadcrum`)
        .then((res) => {
           setData(res.data[0])
        })
    }

    useState(() =>{
        getbreadcrum()
    })  




    return breaddata;
   
 
}


export default useBreadcrumb;
