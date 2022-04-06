import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getProductsThunk } from '../redux/actions';

const ProductsDetails = () => {
    
    const dispatch = useDispatch();
    const {id} = useParams();
    
    const [productsFiltered, setProductsFiltered ] = useState([]);

    const products = useSelector(state =>state.products)

    useEffect(() => {
        dispatch(getProductsThunk())
        
    },[dispatch]);
    
    const productsFound = products.find(productsItem => productsItem.id === Number(id));
    
    useEffect(()=> {
        if(productsFound){
            axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/?category=${productsFound?.category.id}`)
                .then(res => setProductsFiltered(res.data.data.products));
        }
    },[dispatch, productsFound])



    console.log(productsFiltered)

    return (
        <div>
            <h1>{productsFound?.title}</h1>
            <h3>{id}</h3>
            <img src={productsFound?.productImgs?.[2]}></img>

            <ul>
                {
                    productsFiltered.map(productsItem => (
                        <li key ={productsItem.id}>
                                <Link to={`/products/${productsItem.id}`}>{productsItem.title}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default ProductsDetails;