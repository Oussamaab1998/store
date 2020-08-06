import React  , {useEffect,useState} from 'react';
import {useDispatch , useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { signin } from '../../actions/userActions';
import { saveProduct, listProducts,deleteProdcut } from '../../actions/productActions';


  
  
      
      const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));
    function ProductCreateScreen (props) {
        const dispatch = useDispatch();
        const productSave = useSelector(state => state.productSave);
        const { loading: loadingSave, success:successSave, error:errorSave } = productSave;


        const productDelete = useSelector(state => state.productDelete);
        const { loading: loadingDelete, success:successDelete, error:errorDelete } = productDelete;

        const productList = useSelector(state => state.productList)
        
        const { loading, products, error } = productList;
        useEffect(() => {
            if(successSave){
                setModalVisible(false);
            }
                dispatch(listProducts());
            return () => {
                //
            }
        }, [successSave,successDelete]);
        const [modalVisible, setModalVisible] = useState(false);
        const [id, setId] = useState('');
        const [name, setName] = useState('');
        const [price, setPrice] = useState('');
        const [image, setImage] = useState('');
        const [brand, setBrand] = useState('');
        const [category, setCategory] = useState('');
        const [countInStock, setCountInStock] = useState('');
        const [description, setDescription] = useState('');

        const classes = useStyles();
        const submitHandler = (e) => {
            e.preventDefault();
            dispatch(saveProduct({_id: id,name,price,image,brand,category,countInStock,description,})); 
        }
        const openModal = (product) => {
            
            setModalVisible(true);
            setId(product._id);
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
          };
        const deleteHandler = (product) => {
            dispatch(deleteProdcut(product._id));
          };
        
        return (
        <div className="Content">  
            <div className="product-header">
                <h3>Products</h3>
                <button className="button primary" onClick={() => openModal({})}>
                    Create Product
                </button>
            </div>
        {modalVisible &&
            <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create Product
                    </Typography>
                    <Typography component="h1" variant="h5">
                        {loadingSave && <div>Loading</div>}
                        {errorSave && <div>{errorSave}</div>}
                    </Typography>
                    <form onSubmit={submitHandler}  className={classes.form} noValidate>
                        <TextField
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        value={name}
                        name="name"
                        autoComplete="name"
                        autoFocus
                        />

                        <TextField
                        onChange={(e) => setPrice(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="price"
                        value={price}
                        label="price"
                        name="price"
                        autoComplete="price"
                        autoFocus
                        />
                        <TextField
                        onChange={(e) => setImage(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="image"
                        label="image"
                        value={image}
                        name="image"
                        autoComplete="image"
                        autoFocus
                        />
                        <TextField
                        onChange={(e) => setBrand(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="brand"
                        label="brand"
                        value={brand}
                        name="brand"
                        autoComplete="brand"
                        autoFocus
                        />
                        <TextField
                        onChange={(e) => setCategory(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="category"
                        label="category"
                        value={category}
                        name="category"
                        autoComplete="category"
                        autoFocus
                        />
                        <TextField
                        onChange={(e) => setCountInStock(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="countInStock"
                        label="countInStock"
                        value={countInStock}
                        name="countInStock"
                        autoComplete="countInStock"
                        autoFocus
                        />
                        <TextField
                        onChange={(e) => setDescription(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="description"
                        label="description"
                        value={description}
                        name="description"
                        autoComplete="description"
                        autoFocus
                        />
        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        >
                        {id?"Update":"Create"}
                        </Button>
                        <Button
                        onClick={() => setModalVisible(false)}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        >
                        Back
                        </Button>

                    </form>
                </div>
            </Container>
            }
            <div className="product-list">
                <table className="table">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                            <button 
                                className="button" 
                                onClick={() => openModal(product)}>
                                Edit
                            </button>{' '}
                            <button
                                className="button"
                                onClick={() => deleteHandler(product)}
                            >
                                Delete
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
          
        );
      }

    


export default ProductCreateScreen;