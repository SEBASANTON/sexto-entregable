import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterCategoryThunk, filterHeadlineThunk, getCategoriesThunk, getProductsThunk } from '../redux/actions';
import '../style/home.css'

const Home = () => {

    const dispatch = useDispatch();

    const [headline, setHeadline ] = useState("");
    const [isFilters, setIsFilters] = useState(false);

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
        <div className="home">
            <form onSubmit={searchProducts} className="search">
                <input type="text"
                placeholder='What are you looking for?'
                value={headline} 
                onChange= { e => setHeadline(e.target.value)}
                />
                <button>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
            
            <div className='filter-button'>
                <button  onClick={() => setIsFilters(!isFilters)}>
                    <i className="fa-solid fa-filter"></i> Filters
                </button>
            </div>
            
            <div className={`filters ${isFilters ? 'open' : ''} `}>
                <button className="close" onClick={() => setIsFilters(false)}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <p>Category</p>
                <hr />
                {
                    categories.map(category => (
                        <button key={category.id} onClick={()=> dispatch(filterCategoryThunk(category.id), setIsFilters(false))}>
                            {category.name}
                        </button>

                    ))
                }

            </div>

            <div className='products-responsive'>

                {
                    products.length === 0 ? (
                        <p>We didn't found news with the filters</p>
                    ): (
                        products.map(productsItem => (
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
                    )
                }
                
            </div>
        </div>
    );
};

export default Home;