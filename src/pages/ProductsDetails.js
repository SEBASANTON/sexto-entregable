import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { addFavoriteThunk, getProductsThunk, setIsLoginOpen } from '../redux/actions';
import '../style/productsDetails.css'

const ProductsDetails = () => {
    
    const dispatch = useDispatch();
    const {id} = useParams();

    const isLoginOpen = useSelector(state => state.isLoginOpen)
    
    const [productsFiltered, setProductsFiltered ] = useState([]);
    const [ quantity, setQuantity ] = useState(1);

    const products = useSelector(state =>state.products)

    useEffect(() => {
        dispatch(getProductsThunk())

    },[dispatch]);

    
    const productsFound = products.find(productsItem => productsItem.id === Number(id));
    
    useEffect(()=> {
        if(productsFound){
            axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/?category=${productsFound?.category.id}`)
                .then(res => 
                    setProductsFiltered(res.data.data.products),
                    );
        }
    },[dispatch, productsFound])

    const addFavorite = () => {
        const products = {
            id,
            quantity,
        }
            dispatch(addFavoriteThunk(products))
            .catch(error => {
                if(error.response.status === 401){
                    console.log("El carro esta vacio")
                    dispatch(setIsLoginOpen(!isLoginOpen))
                }
            })
    }

    return (
        <section className="products-detail">

            <div className='link-responsive'> 
                <Link to="/" className='link'>Home</Link> 
                <i className="fa-solid fa-angles-right"></i>
                <p><b>{productsFound?.title}</b></p>
            </div>

            <div className='productsDetail-responsive'>

                <div className='images-responsive'>
                    <img src={productsFound?.productImgs?.[0]} alt=""></img>
                </div>

                <div>
                    <div className='product-title'>
                        <h1>{productsFound?.title}</h1>
                    </div>

                    <div className="cart-choose">
                        <div>
                            <p className='t-price'>Price</p>
                            <p className='p-price'> <b>$ {productsFound?.price}</b></p>
                        </div>

                        <div className="input-container">
                            <p><label htmlFor="queantity">Quantity</label></p>
                            <button onClick={() => setQuantity(quantity-1)} disabled={quantity < 2}>-</button>
                            <input type="text" value={quantity} onChange={e => setQuantity(e.target.value)} className="input-queantity" disabled/>
                            <button onClick={() => setQuantity(quantity+1)}>+</button>
                        </div>
                    </div>

                    <button onClick={addFavorite} className="button-cart">
                        Add to cart <i className="fa-solid fa-cart-plus"></i>
                    </button>

                    <div className='product-description'>
                        <p>{productsFound?.description}</p>
                    </div>
                </div>
            </div>

            <h3>Discover similar items</h3>
            <div className='products-responsive'>
                {
                    productsFiltered.map(productsItem => (
                        <Link to={`/products/${productsItem.id}`} key ={productsItem.id} className="link">
                                <div className="products">
                                    <div className="images-hover">
                                        <img className="over" src={productsItem.productImgs[1]} alt="" />
                                        <img src={productsItem.productImgs[0]} alt="" />
                                    </div>
                                    <hr />
                                    <div className='description'>
                                    <p><b>{productsItem.title}</b></p>
                                    <p><span><b> Price</b></span></p>
                                    <p><b>$ {productsItem.price} </b></p>
                                    </div>
                                </div>
                            </Link>
                    ))
                }
            </div>
        </section>
    );
};

export default ProductsDetails;