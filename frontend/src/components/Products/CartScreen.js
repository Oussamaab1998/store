import React ,{useEffect}from 'react';
import styles from '../Products/CartScreen.module.css';
import { addToCart , removeFromCart} from '../../actions/cartAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
function CartScreen (props) {
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const  productId = props.match.params.id;
    const qte = props.location.search? Number(props.location.search.split("=")[1]):1;
    
    const dispatch = useDispatch();
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
      }
    useEffect(() => {
      console.log(cartItems); 
        if (productId){
          
            dispatch(addToCart(productId, qte));
        }
        
    }, []);
    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping");
      }
    return (
    
    <div className={styles.cart}>
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
                        Qty:
                      <select value={item.qte} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                          {[...Array(item.countInStock).keys()].map(x =>
                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                          )}
                        </select>
                        <button type="button" className={styles.button} onClick={() => removeFromCartHandler(item.product)} >
                          Delete
                        </button>
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
    )
}

export default CartScreen;