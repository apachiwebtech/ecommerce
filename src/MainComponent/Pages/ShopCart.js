import React, { useEffect, useState } from 'react'
import product1 from '../../assets/frontimg/product/1.jpg'
import axios from 'axios'
import { BASE_URL } from '../../AdminComponent/BaseUrl'
import Cookies from 'js-cookie'
import custdecryptedUserId from '../../Utils/CustUserid'
import { Link } from 'react-router-dom'


const ShopCart = ({ fetchcount }) => {
  const [cart, setCart] = useState([])
  const [quantities, setQuantities] = useState({});


  const handleIncrease = (itemId) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) + 1
    }));
  };

  const handleDecrease = (itemId) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemId]: Math.max((prevQuantities[itemId] || 0) - 1, 0)
    }));
  };

  async function getcartdata() {

    const data = {
      order_id: Cookies.get(`orderid`)
    }

    axios.post(`${BASE_URL}/getcartData`, data)
      .then((res) => {
        console.log(res)

        setCart(res.data)


      })
  }

  useEffect(() => {
    getcartdata()
   
  }, [])

  const handledelete = (id) => {
    const data = {
      cart_id: id
    }

    axios.post(`${BASE_URL}/removecartitem`, data)
      .then((res) => {
        console.log(res)
        getcartdata()

        if (fetchcount) {
          fetchcount(res.data[0]);
      }
        
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const totalPrice = cart.reduce((acc, item) => {
    const itemTotal = item.price * (quantities[item.id] || 1); // Use 1 as default quantity if not 
    return acc + itemTotal;
  }, 0);


  return (
    <div>
      <div id="page" class="hfeed page-wrapper">
        <div id="site-main" class="site-main">
          <div id="main-content" class="main-content">
            <div id="primary" class="content-area">
              <div id="title" class="page-title">
                <div class="section-container">
                  <div class="content-title-heading">
                    <h1 class="text-title-heading">
                      Shopping Cart
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
                    <div class="shop-cart">
                      <div class="row">
                        <div class="col-xl-8 col-lg-12 col-md-12 col-12">
                          <form class="cart-form" action="" method="post">
                            <div class="table-responsive">
                              <table class="cart-items table" cellspacing="0">
                                <thead>
                                  <tr>
                                    <th class="product-thumbnail">Product</th>
                                    <th class="product-price">Price</th>
                                    <th class="product-quantity">Quantity</th>
                                    <th class="product-subtotal">Subtotal</th>
                                    <th class="product-remove">&nbsp;</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {cart?.map((item) => {
                                    const total = item.price * (quantities[item.id] || 1);



                                    return (
                                      <tr className="cart-item">
                                        <td className="product-thumbnail">
                                          <a href="shop-details.html">
                                            <img width="600" height="600" src={product1} className="product-image" alt="" />
                                          </a>
                                          <div className="product-name">
                                            <a href="shop-details.html">{item.pname}</a>
                                          </div>
                                        </td>
                                        <td className="product-price">
                                          <span className="price">₹{item.price}</span>
                                        </td>
                                        <td className="product-quantity">
                                          <div className="quantity">
                                            <button type="button" className="minus" onClick={() => handleDecrease(item.id)}>-</button>
                                            <input type="number" className="qty" step="1" min="0" max="" name="quantity" value={quantities[item.id] || 1} title="Qty" size="4" placeholder="" inputMode="numeric" autoComplete="off" />
                                            <button type="button" onClick={() => handleIncrease(item.id)} className="plus">+</button>
                                          </div>
                                        </td>
                                        <td className="product-subtotal">
                                          <span>₹{total}</span>
                                        </td>

                                        <td className="product-remove">
                                          <Link onClick={() => handledelete(item.id)} className="remove">×</Link>
                                          {/* <div className="cart-total">
                                            <span>Total: ₹{totalPrice}</span>
                                          </div> */}
                                        </td>
                                      </tr>
                                    );
                                  })}





                                  <tr>
                                    <td colspan="6" class="actions">
                                      <div class="bottom-cart">
                                        <div class="coupon">
                                          <input type="text" name="coupon_code" class="input-text" id="coupon-code" value="" placeholder="Coupon code" />
                                          <button type="submit" name="apply_coupon" class="button" value="Apply coupon">Apply coupon</button>
                                        </div>
                                        <h2><a href="shop-grid-left.html">Continue Shopping</a></h2>
                                        <button type="submit" name="update_cart" class="button" value="Update cart">Update cart</button>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </form>
                        </div>
                        <div class="col-xl-4 col-lg-12 col-md-12 col-12">
                          <div class="cart-totals">
                            <h2>Cart totals</h2>
                            <div>
                              <div class="cart-subtotal">
                                <div class="title">Subtotal</div>
                                <div><span>₹{totalPrice}</span></div>
                              </div>
                              <div class="shipping-totals">
                                <div class="title">Shipping</div>
                                <div>
                                  <ul class="shipping-methods custom-radio">
                                    <li>
                                      <input type="radio" name="shipping_method" data-index="0" value="free_shipping" class="shipping_method" checked="checked" /><label>Free shipping</label>
                                    </li>
                                    <li>
                                      <input type="radio" name="shipping_method" data-index="0" value="flat_rate" class="shipping_method" /><label>Flat rate</label>
                                    </li>
                                  </ul>
                                  <p class="shipping-desc">
                                    Shipping options will be updated during checkout.
                                  </p>
                                </div>
                              </div>
                              <div class="order-total">
                                <div class="title">Total</div>
                                <div><span>₹{totalPrice}</span></div>
                              </div>
                            </div>
                            <div class="proceed-to-checkout">
                              <a href="shop-checkout.html" class="checkout-button button">
                                Proceed to checkout
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="shop-cart-empty">
                      <div class="notices-wrapper">
                        <p class="cart-empty">Your cart is currently empty.</p>
                      </div>
                      <div class="return-to-shop">
                        <a class="button" href="shop-grid-left.html">
                          Return to shop
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>


      <div class="back-top button-show">
        <i class="arrow_carrot-up"></i>
      </div>


      <div class="search-overlay">
        <div class="close-search"></div>
        <div class="wrapper-search">
          <form role="search" method="get" class="search-from ajax-search" action="">
            <div class="search-box">
              <button id="searchsubmit" class="btn" type="submit">
                <i class="icon-search"></i>
              </button>
              <input id="myInput" type="text" autocomplete="off" value="" name="s" class="input-search s" placeholder="Search..." />
              <div class="search-top">
                <div class="close-search">Cancel</div>
              </div>
              <div class="content-menu_search">
                <label>Suggested</label>
                <ul id="menu_search" class="menu">
                  <li><a href="#">Furniture</a></li>
                  <li><a href="#">Home Décor</a></li>
                  <li><a href="#">Industrial</a></li>
                  <li><a href="#">Kitchen</a></li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>


      <div class="wishlist-popup">
        <div class="wishlist-popup-inner">
          <div class="wishlist-popup-content">
            <div class="wishlist-popup-content-top">
              <span class="wishlist-name">Wishlist</span>
              <span class="wishlist-count-wrapper"><span class="wishlist-count">2</span></span>
              <span class="wishlist-popup-close"></span>
            </div>
            <div class="wishlist-popup-content-mid">
              <table class="wishlist-items">
                <tbody>
                  <tr class="wishlist-item">
                    <td class="wishlist-item-remove"><span></span></td>
                    <td class="wishlist-item-image">
                      <a href="shop-details.html">
                        <img width="600" height="600" src={product1} alt="" />
                      </a>
                    </td>
                    <td class="wishlist-item-info">
                      <div class="wishlist-item-name">
                        <a href="shop-details.html">Chair Oak Matt Lacquered</a>
                      </div>
                      <div class="wishlist-item-price">
                        <span>$150.00</span>
                      </div>
                      <div class="wishlist-item-time">June 4, 2022</div>
                    </td>
                    <td class="wishlist-item-actions">
                      <div class="wishlist-item-stock">
                        In stock
                      </div>
                      <div class="wishlist-item-add">
                        <div data-title="Add to cart">
                          <a rel="nofollow" href="#" class="button">Add to cart</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="wishlist-item">
                    <td class="wishlist-item-remove"><span></span></td>
                    <td class="wishlist-item-image">
                      <a href="shop-details.html">
                        <img width="600" height="600" src={product1} alt="" />
                      </a>
                    </td>
                    <td class="wishlist-item-info">
                      <div class="wishlist-item-name">
                        <a href="shop-details.html">Pillar Dining Table Round</a>
                      </div>
                      <div class="wishlist-item-price">
                        <del aria-hidden="true"><span>$150.00</span></del>
                        <ins><span>$100.00</span></ins>
                      </div>
                      <div class="wishlist-item-time">June 4, 2022</div>
                    </td>
                    <td class="wishlist-item-actions">
                      <div class="wishlist-item-stock">
                        In stock
                      </div>
                      <div class="wishlist-item-add">
                        <div data-title="Add to cart">
                          <a rel="nofollow" href="#" class="button">Add to cart</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="wishlist-popup-content-bot">
              <div class="wishlist-popup-content-bot-inner">
                <a class="wishlist-page" href="shop-wishlist.html">
                  Open wishlist page
                </a>
                <span class="wishlist-continue" data-url="">
                  Continue shopping
                </span>
              </div>
              <div class="wishlist-notice wishlist-notice-show">Added to the wishlist!</div>
            </div>
          </div>
        </div>
      </div>


      <div class="compare-popup">
        <div class="compare-popup-inner">
          <div class="compare-table">
            <div class="compare-table-inner">
              <a href="#" id="compare-table-close" class="compare-table-close">
                <span class="compare-table-close-icon"></span>
              </a>
              <div class="compare-table-items">
                <table id="product-table" class="product-table">
                  <thead>
                    <tr>
                      <th>
                        <a href="#" class="compare-table-settings">Settings</a>
                      </th>
                      <th>
                        <a href="shop-details.html">Chair Oak Matt Lacquered</a> <span class="remove">remove</span>
                      </th>
                      <th>
                        <a href="shop-details.html">Zunkel Schwarz</a> <span class="remove">remove</span>
                      </th>
                      <th>
                        <a href="shop-details.html">Namaste Vase</a> <span class="remove">remove</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="tr-image">
                      <td class="td-label">Image</td>
                      <td>
                        <a href="shop-details.html">
                          <img width="600" height="600" src={product1} alt="" />
                        </a>
                      </td>
                      <td>
                        <a href="shop-details.html">
                          <img width="600" height="600" src="media/product/1.jpg" alt="" />
                        </a>
                      </td>
                      <td>
                        <a href="shop-details.html">
                          <img width="600" height="600" src="media/product/2.jpg" alt="" />
                        </a>
                      </td>
                    </tr>
                    <tr class="tr-sku">
                      <td class="td-label">SKU</td>
                      <td>VN00189</td>
                      <td></td>
                      <td>D1116</td>
                    </tr>
                    <tr class="tr-rating">
                      <td class="td-label">Rating</td>
                      <td>
                        <div class="star-rating">
                          <span style={{ width: "80%" }}></span>
                        </div>
                      </td>
                      <td>
                        <div class="star-rating">
                          <span style={{ width: "100%" }}></span>
                        </div>
                      </td>
                      <td></td>
                    </tr>
                    <tr class="tr-price">
                      <td class="td-label">Price</td>
                      <td><span class="amount">$150.00</span></td>
                      <td><del><span class="amount">$150.00</span></del> <ins><span class="amount">$100.00</span></ins></td>
                      <td><span class="amount">$200.00</span></td>
                    </tr>
                    <tr class="tr-add-to-cart">
                      <td class="td-label">Add to cart</td>
                      <td>
                        <div data-title="Add to cart">
                          <a href="#" class="button">Add to cart</a>
                        </div>
                      </td>
                      <td>
                        <div data-title="Add to cart">
                          <a href="#" class="button">Add to cart</a>
                        </div>
                      </td>
                      <td>
                        <div data-title="Add to cart">
                          <a href="#" class="button">Add to cart</a>
                        </div>
                      </td>
                    </tr>
                    <tr class="tr-description">
                      <td class="td-label">Description</td>
                      <td>Phasellus sed volutpat orci. Fusce eget lore mauris vehicula elementum gravida nec dui. Aenean aliquam varius ipsum, non ultricies tellus sodales eu. Donec dignissim viverra nunc, ut aliquet magna posuere eget.</td>
                      <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</td>
                      <td>The EcoSmart Fleece Hoodie full-zip hooded jacket provides medium weight fleece comfort all year around. Feel better in this sweatshirt because Hanes keeps plastic bottles of landfills by using recycled polyester.7.8 ounce fleece sweatshirt made with up to 5 percent polyester created from recycled plastic.</td>
                    </tr>
                    <tr class="tr-content">
                      <td class="td-label">Content</td>
                      <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</td>
                      <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</td>
                      <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</td>
                    </tr>
                    <tr class="tr-dimensions">
                      <td class="td-label">Dimensions</td>
                      <td>N/A</td>
                      <td>N/A</td>
                      <td>N/A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopCart