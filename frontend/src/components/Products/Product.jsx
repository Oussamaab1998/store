import React  ,{useEffect,useState} from 'react';
import Button from '@material-ui/core/Button';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import {useSelector,useDispatch} from 'react-redux';
import styles from '../Products/Product.module.css';
import { detailsProduct } from '../../actions/productActions';





function Product (props) {
    const [qte, setQte] = useState(0);
    const productDetails = useSelector((state) => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(product.image);
      dispatch(detailsProduct(props.match.params.id));
      
      return () => {
        
      }
    }, []);
    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qte=" + qte)
    }
    const handleBackButton = () => {
        props.history.push("/");
    }


    

    return loading? <div>Loading ...</div>:
        error? <div>{error}</div>:
        (
        <div className={styles.orm}>
                
            <div className={styles.backDiv}>
               
            <Button
                className={styles.backButton}
                variant="outlined"
                color="primary"
                onClick={handleBackButton}
                startIcon={<KeyboardBackspaceIcon />}
                >
                Home
            </Button>
            
            </div>
            
            
            
            
                
                <div className={styles.productImage}>
                <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="440"
                width="200"
                image={product.image} 
                title="Contemplative Reptile"
                />
    
                   
                </div>
                <div className={styles.productDetails}>
                    <h1>{product.name}</h1>
                    
                    <h2>{product.rating} Stars (5 Reviews)</h2>
                    <h2>Price:{product.price}$</h2>
                    <h2>Description:{product.descritpion}</h2>
    
                </div>
    
               
                <div className={styles.cardPaying}>
                    <Card>
                    <CardContent>
                        <Typography  color="textPrimary" gutterBottom>
                            Price : {product.price}$
                        </Typography>
                        <Typography variant="body2" component="p">
                            Status:{product.countInStock >0? " In Stock":" Not In Stock"}
                            <br />
                            <span>Qte:</span>
                            <Select  className={styles.selectMenu} value={qte} onChange={(e) =>{setQte(e.target.value)}}>
                                {[...Array(product.countInStock).keys()].map(x=>
                                    <option key={x+1} option value={x+1}> {x+1} </option>
                                    )}
                                
                            </Select>
                        </Typography>
                        </CardContent>
                        {product.countInStock>0 &&
                        <CardActions>
                        <Button onClick={handleAddToCart} variant="contained" color="primary" className={styles.addToCartButton}>
                         Add to Cart
                        </Button>
                        </CardActions>
                        }   
                    </Card>
                </div>
                
            
            
            
            
      </div>)
    
       
}
export default Product;