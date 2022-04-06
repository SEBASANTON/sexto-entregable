import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterCategoryThunk, filterHeadlineThunk, getCategoriesThunk, getProductsThunk } from '../redux/actions';

const Home = () => {

    const dispatch = useDispatch();

    const [headline, setHeadline ] = useState("");

    const products = useSelector(state => state.products);
    const categories = useSelector(state=> state.categories)

    useEffect(()=>{
        dispatch(getProductsThunk());
        dispatch(getCategoriesThunk());
    }, []);

    const searchProducts = e => {
        e.preventDefault();
        dispatch(filterHeadlineThunk(headline));
    }
 
    return (
        <div>
            <h1>Home</h1>

            <form onSubmit={searchProducts}>
                <input type="text"
                placeholder='search news by headline'
                value={headline} 
                onChange= { e => setHeadline(e.target.value)}
            />
                <button>Search</button>
            </form>
            

            {
                categories.map(category => (
                    <button key={category.id} onClick={()=> dispatch(filterCategoryThunk(category.id))}>
                        {category.name}
                    </button>
                ))
            }
            <ul>

                {
                    products.length === 0 ? (
                        <p>We didn't found news with the filters</p>
                    ): (
                        products.map(productsItem => (
                            <li key ={productsItem.id}>
                                <Link to={`/products/${productsItem.id}`}>{productsItem.title}</Link>
                            </li>
                        ))
                    )
                }
                
            </ul>
        </div>
    );
};

export default Home;