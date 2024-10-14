import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL, IMG_URL } from '../../AdminComponent/BaseUrl'
import { useNavigate, useParams } from 'react-router-dom'
import custdecryptedUserId from '../../Utils/CustUserid'
import Cookies from 'js-cookie'

const Checkout = () => {
  const [state, setState] = useState([])
  const [cart, setCart] = useState([])
  const [errors, setErrors] = useState({})
  const [token, settoken] = useState({})
  const [shipping, setshipping] = useState({})
  const [show, setshow] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState('cod');


  const [value, setValue] = useState({
    firstname: "",
    lastname: "",
    country: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    postcode: "",
    orderNotes: "",
    mobile: "",

    sfirstname: "",
    slastname: "",
    scountry: "",
    saddress: "",
    slandmark: "",
    scity: "",
    sstate: "",
    spostcode: "",
    smobile: "",


  })

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
    // Here you can do whatever you want with the selected value, like sending it to the server or performing some action.
  };




  const validateForm = () => {
    let isValid = true
    const newErrors = {}

    if (!value.firstname) {
      isValid = false;
      newErrors.firstname = "firstname is required";
    }
    if (!value.lastname) {
      isValid = false;
      newErrors.lastname = "lastname is required";
    }
    if (!value.country) {
      isValid = false;
      newErrors.country = "country is required";
    }
    if (!value.address) {
      isValid = false;
      newErrors.address = "address is required";
    }
    if (!value.city) {
      isValid = false;
      newErrors.city = "city is required";
    }
    if (!value.mobile) {
      isValid = false;
      newErrors.mobile = "mobile is required";
    }
    if (!value.state) {
      isValid = false;
      newErrors.state = "state is required";
    }
    if (!value.postcode) {
      isValid = false;
      newErrors.postcode = "postcode is required";
    }


    if (!value.sfirstname) {
      isValid = false;
      newErrors.sfirstname = "firstname is required";
    }
    if (!value.slastname) {
      isValid = false;
      newErrors.slastname = "lastname is required";
    }
    if (!value.scountry) {
      isValid = false;
      newErrors.scountry = "country is required";
    }
    if (!value.saddress) {
      isValid = false;
      newErrors.saddress = "address is required";
    }
    if (!value.scity) {
      isValid = false;
      newErrors.scity = "city is required";
    }
    if (!value.sstate) {
      isValid = false;
      newErrors.sstate = "state is required";
    }
    if (!value.spostcode) {
      isValid = false;
      newErrors.spostcode = "postcode is required";
    }
    if (!value.smobile) {
      isValid = false;
      newErrors.smobile = "mobile is required";
    }




    setErrors(newErrors)
    return isValid


  }

  const { orderid } = useParams()

  async function getcartdata() {

    const data = {
      order_id: orderid
    }

    axios.post(`${BASE_URL}/getcartData`, data)
      .then((res) => {
        console.log(res)

        setCart(res.data)

      })
  }

  const vendor_id = cart.map((item) => item.v_id)
  let unique_vendor_id = [...new Set(vendor_id)].join(',');




  async function getState() {

    axios.get(`${BASE_URL}/state`)
      .then((res) => {
        setState(res.data)
      })
  }
  async function api() {

    axios.post(`${BASE_URL}/api`)
      .then((res) => {
        settoken(res.data.data)

      })
  }
  async function get_shipping_rate() {
    if (validateForm()) {
      const data = {
        "token": token,
        "order_id": orderid,
        "spincode": value.spostcode,
      }
      axios.post(`${BASE_URL}/get_shipping_rate`, data)
        .then((res) => {
          setshipping(res.data.data)
          setshow(true)
        })
    }
  }

  useEffect(() => {
    api()
    getState()
    getcartdata()
  }, [])




  const navigate = useNavigate()


  const handlepayment = () => {

  };

  const onhandlesubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {

      const paydata = {
        user_id: localStorage.getItem('Name'),
        price: totalPrice,
        phone: "9326476448",
        name: custdecryptedUserId()
      }
      const data = {
        firstname: value.firstname,
        lastname: value.lastname,
        country: value.country,
        address: value.address,
        landmark: value.landmark,
        city: value.city,
        state: value.state,
        postcode: value.postcode,
        orderNotes: value.orderNotes,
        mobile: value.mobile,
        vendor_id: unique_vendor_id,
        sfirstname: value.sfirstname || value.firstname,
        slastname: value.slastname || value.lastname,
        scountry: value.scountry || value.country,
        saddress: value.saddress || value.address,
        slandmark: value.slandmark || value.landmark,
        scity: value.scity || value.city,
        sstate: value.sstate || value.state,
        spostcode: value.spostcode || value.postcode,
        smobile: value.smobile || value.mobile,
        order_id: orderid,
        totalamt: totalPrice,
        paymode: selectedPayment,
        token: token,

        user_id: custdecryptedUserId()
      }
      // ---?>  payment log

      selectedPayment != 'cod' ? (

        axios.post(`${BASE_URL}/payment`, paydata)
          .then((res) => {
            // ---?>  payment log

            if (res.data.success == true) {

              axios.post(`${BASE_URL}/place_order`, data)
                .then((res) => {
                  console.log(res)


                  if (res.data) {
                    alert("order placed")
                    Cookies.remove(`orderid`)
                    navigate('/thankyou')
                    Cookies.set('orderno', res.data[0].orderno, { expires: 1 });
                  }


                })


              window.location.href = res.data.url
            }


          })

      ) : (
        axios.post(`${BASE_URL}/place_order`, data)
          .then((res) => {
            console.log(res)


            if (res.data) {
              alert("order placed")
              Cookies.remove(`orderid`)
              navigate('/thankyou')
              Cookies.set('orderno', res.data[0].orderno, { expires: 1 });
            }


          })
      )


    }
  }

  // alert(value.mobile)



  async function fetchAddress() {
    const data = {
      user_id: custdecryptedUserId()
    }
    axios.post(`${BASE_URL}/fetch_address`, data)
      .then((res) => {
        if (res.data.length !== 0) {
          setValue({
            firstname: res.data[0].firstname,
            lastname: res.data[0].lastname,
            country: res.data[0].country,
            address: res.data[0].address,
            city: res.data[0].city,
            state: res.data[0].state,
            postcode: res.data[0].pincode,
            mobile: res.data[0].mobile,
          })
        }



      })
  }

  useEffect(() => {
    fetchAddress()
  }, [])

  const onhandlechange = async (e) => {
    await setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  }

  const handlecheckbox = () => {

    setValue({
      firstname: value.firstname,
      lastname: value.lastname,
      country: value.country,
      address: value.address,
      city: value.city,
      state: value.state,
      mobile: value.mobile,
      postcode: value.postcode,
      sfirstname: value.firstname,
      slastname: value.lastname,
      scountry: 1,
      saddress: value.address,
      scity: value.city,
      sstate: value.state,
      spostcode: value.postcode,
      smobile: value.mobile,

    })
  }

  const totalPrice = cart.reduce((acc, item) => {
    const itemTotal = item.price * item.pqty; // Use 1 as default quantity if not
    return acc + itemTotal;
  }, 0);


  // const navigate = useNavigate()








  return (
    <div>
      <div id="site-main" class="site-main">
        <div id="main-content" class="main-content">
          <div id="primary" class="content-area">
            <div id="title" class="page-title">
              <div class="section-container">
                <div class="content-title-heading">
                  <h1 class="text-title-heading">
                    Checkout
                  </h1>
                </div>
                <div class="breadcrumbs">
                  <a href="index.html">Home</a><span class="delimiter"></span><a href="shop-grid-left.html">Shop</a><span class="delimiter"></span>Shopping Cart
                </div>
              </div>
            </div>



            <div id="content" class="site-content" role="main">



              <div class="section-padding">
                <div class="section-container p-l-r">
                  <div class="shop-checkout">
                    <form name="checkout" method="post" class="checkout" onSubmit={onhandlesubmit} action="" autocomplete="off">
                      <div class="row">
                        <div class="col-xl-8 col-lg-7 col-md-12 col-12">



                          <div className='row'>
                            <div class="customer-details col-lg-6 col-md-6 col-12">
                              <div class="billing-fields">
                                <h3>Billing details</h3>
                                <div class="billing-fields-wrapper">
                                  <div className='row'>
                                    <p class="form-row form-row-first validate-required col-lg-6 col-md-6 col-12">
                                      <label>First name <span class="required" title="required">*</span></label>
                                      <span class="input-wrapper"><input type="text" class="input-text" name="firstname" value={value.firstname} onChange={onhandlechange} /></span>
                                      {errors.firstname && <span className='text-danger'>{errors.firstname}</span>}
                                    </p>
                                    <p class="form-row form-row-last validate-required col-lg-6 col-md-6 col-12">
                                      <label>Last name <span class="required" title="required">*</span></label>
                                      <span class="input-wrapper"><input type="text" class="input-text" name="lastname" value={value.lastname} onChange={onhandlechange} /></span>
                                      {errors.lastname && <span className='text-danger'>{errors.lastname}</span>}
                                    </p>
                                  </div>

                                  <div className='row '>
                                    <p class="form-row form-row-last validate-required col-lg-6 col-md-6 col-12">
                                      <label>Mobile <span class="required" title="required">*</span></label>
                                      <span class="input-wrapper"><input type="number" class="input-text" name="mobile" value={value.mobile} onChange={onhandlechange} /></span>
                                      {errors.mobile && <span className='text-danger'>{errors.mobile}</span>}
                                    </p>
                                    <p class="form-row form-row-wide validate-required col-lg-6">
                                      <label>Country / Region <span class="required" title="required">*</span></label>
                                      <span class="input-wrapper">
                                        <select name="country" class="country-select custom-select" value={value.country} onChange={onhandlechange}>
                                          <option value="">Select a country / region…</option>
                                          <option value="1">India</option>

                                        </select>
                                      </span>
                                      {errors.country && <span className='text-danger'>{errors.country}</span>}
                                    </p>

                                  </div>
                                  <p class="form-row address-field validate-required form-row-wide">
                                    <label>Address <span class="required" title="required">*</span></label>
                                    <span class="input-wrapper">
                                      <input type="text" value={value.address} class="input-text" name="address" placeholder="House number and street name" onChange={onhandlechange} />
                                    </span>
                                    {errors.address && <span className='text-danger'>{errors.address}
                                    </span>}
                                  </p>
                                  <p class="form-row address-field form-row-wide">
                                    <label>Landmark&nbsp;<span class="optional">(optional)</span></label>
                                    <span class="input-wrapper">
                                      <input type="text" class="input-text" name="landmark" placeholder="Apartment, suite, unit, etc. (optional)" onChange={onhandlechange} />
                                    </span>

                                  </p>
                                  <p class="form-row address-field validate-required form-row-wide">
                                    <label for="billing_city" class="">Town / City <span class="required" title="required">*</span></label>
                                    <span class="input-wrapper">
                                      <input type="text" class="input-text" value={value.city} name="city" onChange={onhandlechange} />
                                    </span>
                                    {errors.city && <span className='text-danger'>{errors.city}
                                    </span>}
                                  </p>
                                  <div className='row'>
                                    <p class="form-row address-field validate-required validate-state form-row-wide col-lg-6 col-6">
                                      <label>State <span class="required" title="required">*</span></label>
                                      <span class="input-wrapper">
                                        <select name="state" value={value.state} class="state-select custom-select" onChange={onhandlechange}>
                                          <option value="">Select a state </option>
                                          {state.map((item) => {
                                            return (
                                              <option value={item.id} key={item.id}>{item.name}</option>
                                            )
                                          })}


                                        </select>
                                      </span>
                                      {errors.state && <span className='text-danger'>{errors.state}
                                      </span>}
                                    </p>
                                    <p class="form-row address-field validate-required validate-postcode form-row-wide col-lg-6 col-6">
                                      <label>Postcode / ZIP <span class="required" title="required">*</span></label>
                                      <span class="input-wrapper">
                                        <input type="text" class="input-text" value={value.postcode} name="postcode" onChange={onhandlechange} />
                                      </span>
                                      {errors.postcode && <span className='text-danger'>{errors.postcode}
                                      </span>}
                                    </p>
                                  </div>

                                </div>
                              </div>

                            </div>

                            <div class="shipping-fields col-lg-6 col-md-6 col-12">

                              <div class="shipping-address">
                                <div className='d-flex align-items-center justify-content-between'>
                                  <h3>Shipping Address</h3>
                                  <p class="form-row form-row-wide ship-to-different-address">
                                    <label class="checkbox d-flex align-items-center">
                                      <input class="input-checkbox" type="checkbox" name="ship_to_different_address" value="1" onChange={handlecheckbox} />
                                      <span>Same as a billing address</span>
                                    </label>
                                  </p>
                                </div>
                                <div className='row'>
                                  <p class="form-row form-row-first validate-required col-lg-6 col-md-6 col-12">
                                    <label>First name <span class="required" title="required">*</span></label>
                                    <span class="input-wrapper"><input type="text" class="input-text" name="sfirstname" value={value.sfirstname} onChange={onhandlechange} /></span>
                                    {errors.sfirstname && <span className='text-danger'>{errors.sfirstname}
                                    </span>}
                                  </p>
                                  <p class="form-row form-row-last validate-required col-lg-6 col-md-6 col-12">
                                    <label>Last name <span class="required" title="required">*</span></label>
                                    <span class="input-wrapper"><input type="text" class="input-text" name="slastname" value={value.slastname} onChange={onhandlechange} /></span>
                                    {errors.slastname && <span className='text-danger'>{errors.slastname}
                                    </span>}
                                  </p>
                                </div>
                                <div className='row'>
                                  <p class="form-row form-row-last validate-required col-lg-6 col-md-6 col-12">
                                    <label>Mobile <span class="required" title="required">*</span></label>
                                    <span class="input-wrapper"><input type="number" class="input-text" name="smobile" value={value.smobile} onChange={onhandlechange} /></span>
                                    {errors.smobile && <span className='text-danger'>{errors.smobile}</span>}
                                  </p>

                                  <p class="form-row form-row-wide address-field validate-required col-lg-6 col-md-6 col-12">
                                    <label for="shipping_country" class="">Country / Region <span class="required" title="required">*</span></label>
                                    <span class="input-wrapper">
                                      <select name="scountry" defaultValue="1" class="state-select custom-select" value={value.scountry} onChange={onhandlechange}>
                                        <option value="">Select a country / region…</option>
                                        <option value="1" selected>India</option>

                                      </select>
                                    </span>
                                    {errors.scountry && <span className='text-danger'>{errors.scountry}
                                    </span>}
                                  </p>
                                </div>
                                <p class="form-row address-field validate-required form-row-wide">
                                  <label>Address <span class="required" title="required">*</span></label>
                                  <span class="input-wrapper">
                                    <input type="text" class="input-text" name="saddress" placeholder="House number and street name" value={value.saddress} onChange={onhandlechange} />
                                  </span>
                                  {errors.saddress && <span className='text-danger'>{errors.saddress}
                                  </span>}
                                </p>
                                <p class="form-row address-field form-row-wide">
                                  <label>Landmark &nbsp;<span class="optional">(optional)</span></label>
                                  <span class="input-wrapper">
                                    <input type="text" class="input-text" name="slandmark" placeholder="Apartment, suite, unit, etc. (optional)" value={value.slandmark} onChange={onhandlechange} />
                                  </span>

                                </p>
                                <p class="form-row address-field validate-required form-row-wide">
                                  <label>Town / City <span class="required" title="required">*</span></label>
                                  <span class="input-wrapper"><input type="text" class="input-text" name="scity" onChange={onhandlechange} value={value.scity} /></span>
                                  {errors.scity && <span className='text-danger'>{errors.scity}
                                  </span>}
                                </p>
                                <div className='row'>
                                  <p class="form-row address-field validate-required validate-state form-row-wide col-lg-6 col-6">
                                    <label>State <span class="required" title="required">*</span></label>
                                    <span class="input-wrapper">
                                      <select name="sstate" class="state-select custom-select" value={value.sstate} onChange={onhandlechange}>
                                        <option value="">Select a state </option>
                                        {state.map((item) => {
                                          return (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                          )
                                        })}


                                      </select>
                                    </span>
                                    {errors.sstate && <span className='text-danger'>{errors.sstate}
                                    </span>}
                                  </p>
                                  <p class="form-row address-field validate-required validate-postcode form-row-wide col-lg-6 col-6">
                                    <label>Postcode / ZIP <span class="required" title="required">*</span></label>
                                    <span class="input-wrapper">
                                      <input type="text" class="input-text" name="spostcode" value={value.spostcode} onChange={onhandlechange} />
                                    </span>
                                    {errors.spostcode && <span className='text-danger'>{errors.spostcode}
                                    </span>}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>




                          <div class="additional-fields">
                            <p class="form-row notes">
                              <label>Order notes <span class="optional">(optional)</span></label>
                              <span class="input-wrapper">
                                <textarea name="orderNotes" class="input-text" placeholder="Notes about your order, e.g. special notes for delivery." rows="2" cols="5" onChange={onhandlechange}></textarea>
                              </span>
                            </p>
                          </div>
                        </div>

                       { show ? (
                         <div class="col-xl-4 col-lg-5 col-md-12 col-12">
                         <div class="checkout-review-order">
                           <div class="checkout-review-order-table">
                             <div class="review-order-title">Hide</div>
                             <div class="cart-items">
                               {cart.map((item) => {


                                 return (
                                   <div class="cart-item">
                                     <div class="info-product">
                                       <div class="product-thumbnail">
                                         <img width="600" height="600" src={`${IMG_URL}/productimg/` + item.image1} alt="" />
                                       </div>
                                       <div class="product-name">
                                         {item.pname}
                                         <strong class="product-quantity">QTY : {item.pqty}</strong>
                                       </div>
                                     </div>
                                     <div class="product-total">
                                       <span>₹{item.price}</span>
                                     </div>
                                   </div>
                                 )
                               })}


                             </div>
                             <div class="cart-subtotal">
                               <h2>Subtotal</h2>
                               <div class="subtotal-price">
                                 <span>₹{totalPrice}</span>
                               </div>
                             </div>
                             <div class="shipping-totals shipping">
                               <h2>Shipping</h2>
                               <div data-title="Shipping">
                                 <ul class="shipping-methods custom-radio">
                                   <li>
                                     <input type="radio" name="shipping_method" data-index="0" value="free_shipping" class="shipping_method" checked="checked" /><label>Free shipping</label>
                                   </li>
                                   {/* <li>
                                                                           <input type="radio" name="shipping_method" data-index="0" value="flat_rate" class="shipping_method" /><label>Flat rate</label>
                                                                       </li> */}
                                 </ul>
                               </div>
                             </div>
                             <div class="order-total">
                               <h2>Total</h2>
                               <div class="total-price">
                                 <strong>
                                   <span>₹{totalPrice}</span>
                                 </strong>
                               </div>
                             </div>
                           </div>
                           <div id="payment" class="checkout-payment">

                             <ul className="payment-methods methods custom-radio">
                               <li hidden className="payment-method">
                                 <input
                                   className="form-check-input"
                                   type="radio"
                                   name="exampleRadios"
                                   id="exampleRadios1"
                                   value="bank-transfer"
                                   checked={selectedPayment === 'bank-transfer'}
                                   onChange={handlePaymentChange}
                                   disabled
                                 />
                                 <label className="form-check-label" htmlFor="exampleRadios1">
                                   Direct bank transfer
                                 </label>
                                 <div className="payment-box">
                                   <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                                 </div>
                               </li>
                               <li hidden className="payment-method">
                                 <input
                                   className="form-check-input"
                                   type="radio"
                                   name="exampleRadios"
                                   id="exampleRadios2"
                                   value="check"
                                   checked={selectedPayment === 'check'}
                                   onChange={handlePaymentChange}

                                 />
                                 <label className="form-check-label" htmlFor="exampleRadios2">
                                   Check payments
                                 </label>
                                 <div className="payment-box">
                                   <p>Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</p>
                                 </div>
                               </li>
                               <li className="payment-method">
                                 <input
                                   className="form-check-input"
                                   type="radio"
                                   name="exampleRadios"
                                   id="exampleRadios3"
                                   value="cod"
                                   checked={selectedPayment === 'cod'}
                                   onChange={handlePaymentChange}
                                 />
                                 <label className="form-check-label" htmlFor="exampleRadios3">
                                   Cash on delivery
                                 </label>
                                 <div className="payment-box">
                                   <p>Pay with cash upon delivery.</p>
                                 </div>
                               </li>
                               <li className="payment-method">
                                 <input
                                   className="form-check-input"
                                   type="radio"
                                   name="exampleRadios"
                                   id="exampleRadios4"
                                   value="paypal"
                                   checked={selectedPayment === 'paypal'}
                                   onChange={handlePaymentChange}
                                 />
                                 <label className="form-check-label" htmlFor="exampleRadios4">
                                   Online
                                 </label>
                                 <div className="payment-box">
                                   <p>Pay via any UPI app or card.</p>
                                 </div>
                               </li>
                             </ul>
                             <div class="form-row place-order">
                               <div class="terms-and-conditions-wrapper">
                                 <div class="privacy-policy-text"></div>
                               </div>
                               <button type="submit" class="button alt" name="checkout_place_order" value="Place order">Place order</button>
                             </div>
                           </div>
                         </div>
                       </div>
                       ) : (
                        <div class="col-xl-4 col-lg-5 col-md-12 col-12">
                        <div class="checkout-review-order">
                          <div class="checkout-review-order-table">
                            <div class="review-order-title">Product</div>
                            <div class="cart-items">
                              {cart.map((item) => {


                                return (
                                  <div class="cart-item">
                                    <div class="info-product">
                                      <div class="product-thumbnail">
                                        <img width="600" height="600" src={`${IMG_URL}/productimg/` + item.image1} alt="" />
                                      </div>
                                      <div class="product-name">
                                        {item.pname}
                                        <strong class="product-quantity">QTY : {item.pqty}</strong>
                                      </div>
                                    </div>
                                    <div class="product-total">
                                      <span>₹{item.price}</span>
                                    </div>
                                  </div>
                                )
                              })}


                            </div>
                            <div class="cart-subtotal">
                              <h2>Subtotal</h2>
                              <div class="subtotal-price">
                                <span>₹{totalPrice}</span>
                              </div>  
                            </div>
                          </div>

                              <button type="button" onClick={get_shipping_rate} class="button alt w-100 p-2 bg-dark text-light" name="checkout_place_order" value="Place order">Confirm Order</button>
                        </div>
                      </div>
                       )
                       }
                      </div>
                    </form>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
