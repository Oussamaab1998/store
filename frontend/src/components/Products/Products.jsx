import React, {useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './Products.module.css';
import {Link} from 'react-router-dom';
import { listProducts } from '../../actions/productActions';

export default function Products(props) { 
  
  
  
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
    
    return () => {
      
    }
  }, [])



  return loading ? <div>Loading ...</div> :
         error ? <div>{error}</div> :
         
      
      products.map(product =>
      
      <Card key={product._id}  className={styles.card}> 
      <Link className={styles.link} underline='none'  to={'/product/' + product._id}>
        <CardActionArea>
          
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="240"
            image={product.image} 
            title="Contemplative Reptile"
          />  
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {product.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            ${product.price}
            </Typography>
          </CardContent>
        </CardActionArea>
        </Link>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
        
      </Card>
      
      )
      
      
     
   
  
}