import React ,{useEffect}from 'react';
import styles from '../Products/CartScreen.module.css';
import { addToCart , removeFromCart} from '../../actions/cartAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../componentsSteps/CheckoutSteps'
function PlaceOrderScreen (props) {

  const cart = useSelector(state => state.cart);
  const { cartItems,shipping,payment } = cart;
  if(!shipping.address){
    props.history.push("/shipping");
    console.log(shipping.adress)
  }
  if(!payment){
    props.history.push("/payment")
  }
  const itemsPrice = cartItems.reduce((a,c) => a + c.price*c.qte, 0);
  const shippingPrice = itemsPrice > 100 ?0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice +taxPrice;
    
    const dispatch = useDispatch();
  const placeOrderHandler = () => {
    
  }
    useEffect(() => {
      
        
    }, []);
    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping");
      }
    return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div>
        <h3>Shipping</h3>
        <div>
          {cart.shipping.address} , {cart.shipping.city}
          <br/>
          {cart.shipping.postalCode} , {cart.shipping.country}
        </div>
        <div>
          <h3>Payment</h3>
          <div>
            Payment Method: {cart.payment.paymentMethod}
          </div>
        </div>
        
      </div>
    <div className={styles.cart}>

      <br/>
        <div className={styles.cartList}>
          <ul className={styles.cartListContainer}>
            <li>
              <h3>
                Shopping Cart
              </h3>
              
              <div>
                Price
              </div>
            </li>
            {
              cartItems.length == 0 ?
                <div>
                  Cart is empty
              </div>
                :
                cartItems.map(item =>
                  <li>
                    <div className={styles.cartImage}>
                      <img src={item.image} alt="product" />
                    </div>
                    <div className={styles.cartName}>
                      <div>
                        <Link to={"/product/" + item.product}>
                          {item.name}
                        </Link>
    
                      </div>
                      <div>
                        Qty:{item.qte}
                      <select value={item.qte} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                          {[...Array(item.countInStock).keys()].map(x =>
                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                          )}
                        </select>
                      
                      </div>
                    </div>
                    <div className={styles.cartPrice}>
                      ${item.price}
                    </div>
                  </li>
                )
            }
          </ul>
    
        </div>
        <div className={styles.cartAction}>
          <ul>
            <li>
              <button
                onClick={placeOrderHandler}
              >
                  Place Order
              </button>
            </li>
            <li>
              <h3>
                Order Summary
              </h3>
            </li>
            <li>
              <div>
                items
              </div>
              <div>
                ${itemsPrice}
              </div>
            </li>
            <li>
              <div>
                Shipping
              </div>
              <div>
                ${shippingPrice}
              </div>
            </li>
            <li>
              <div>
                Tax
              </div>
              <div>
                ${taxPrice}
              </div>
            </li>
            <li>
              <div>
                Order Total
              </div>
              <div>
                ${totalPrice}
              </div>
            </li>
          </ul>
          <h3>
            Subtotal ( {cartItems.reduce((a, c) => a + c.qte, 0)} items)
            :
             $ {cartItems.reduce((a, c) => a + c.price * c.qte, 0)}
          </h3>
          <button onClick={checkoutHandler} className={styles.button} disabled={cartItems.length === 0}>
            Proceed to Checkout 
          </button>
    
        </div>
    
      </div>
      </div>
    )
}

export default PlaceOrderScreen;