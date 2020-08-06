import {CARTE_ADD_ITEM,CARTE_REMOVE_ITEM,CART_SAVE_SHIPPING, CART_SAVE_PAYMENT} from '../constants/cartConstants';
import Axios from "axios"
import Cookie from "js-cookie";
const addToCart = ( productId,qte) => async (dispatch, getState) => {

    try {
        const {data} = await Axios.get("/api/products/" + productId);
        dispatch({type: CARTE_ADD_ITEM,payload:{
            product : data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qte
        }});

        const { cart:{cartItems}} = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems)); 
    } catch {
        
    }
}


const removeFromCart = (productId) =>  (dispatch,getState) => {
    dispatch({
        type: CARTE_REMOVE_ITEM , payload:productId
    });
    const { cart:{cartItems}} = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems)); 
}

const saveShipping = (data) =>  (dispatch) => {
    dispatch({type: CART_SAVE_SHIPPING,payload:data});

}
const savePayment = (data) =>  (dispatch) => {
    dispatch({type: CART_SAVE_PAYMENT,payload:data});

}

export  {addToCart,removeFromCart,saveShipping,savePayment};