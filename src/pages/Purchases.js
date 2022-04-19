import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { purchasesThunk } from '../redux/actions';
import '../style/purchases.css'

const Purchases = () => {

    const purchases = useSelector(state => state.purchases)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(purchasesThunk())
    },[dispatch]);

    let options = { year: 'numeric', month: 'long', day: 'numeric' };

    const convert = (num1) => {
        return num1.toLocaleDateString('en-US', options)
    }

    return (
        <div className='purchases'>
            <div className='link-responsive'> 
                <Link to="/" className='link'>Home</Link> 
                <i className="fa-solid fa-angles-right"></i>
                <p><b>Purchases</b></p>
            </div>
           <h2>My purchases</h2>


            {
                purchases.map(purchase => (
                    <div key={purchase.id} className="shopping">
                        <div className='date'>
                            <h4>{convert(new Date(purchase.updatedAt))}</h4>
                        </div>
                        <div>
                            {
                                purchase.cart.products.map(purch => (
                                    <div className='shopping-responsive' key={purch.id} onClick={() => navigate(`/products/${purch.id}`)}>
                                        <p className='shopping-title'>{purch.title}</p>
                                        <p className='quantity'>{purch.productsInCart.quantity}</p>
                                        <p className='shopping-price'><b>$ {purch.price}</b></p>
                                    </div>
                                ))
                            }                     
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Purchases;