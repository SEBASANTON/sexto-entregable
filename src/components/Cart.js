import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteCartThunk } from '../redux/actions';
import '../style/cart.css'

const Cart = ({isOpen}) => {

    const cart = useSelector(state => state.cart)

    const navigate = useNavigate();

    const dispatch = useDispatch();

    console.log(cart)

  /*   let total = cart.price + cart.productsInCart?.quantity

    console.log(cart[0]?.price) */

    const totals = cart.map(car => car.price * car.productsInCart?.quantity ) 
    const total = totals.reduce((a, b) => a + b, 0);
    console.log(total) 


    return (
        <div>
        <div className={`cart-modal ${isOpen? 'open' :''}`}>
            <h2>SHOPPING CART</h2>
            {
                cart.map(car => (
                    <div key={car.id} className="shopp-product">
                        <div className='cart-responsive'>
                            <div className='info-cart'>
                                <p>{car.brand}</p>
                            </div>
                            <button onClick={() => dispatch(deleteCartThunk(car.productsInCart.productId))} className="button-delete">
                                <i className="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                        <div onClick={() => navigate(`/products/${car.productsInCart.productId}`)} className="title-cart">
                            <p><b>{car.title}</b></p>
                        </div>
                        <p className='quantity'>{car.productsInCart.quantity}</p>
                        <p>Total: <span className='total-product'><b> $ {car.productsInCart.quantity * car.price}</b></span></p>
                        <hr />
    
                    </div>
                ))
            }
        </div>
        <div className={`purchase ${isOpen? 'open-purchase' :''}`}>
            <div className='price-responsive'>
                <p>Total: </p>
                <p><b>$ {total}</b></p>
            </div>
            <button>Checkout</button>
        </div>
        </div>
    );
};

export default Cart;