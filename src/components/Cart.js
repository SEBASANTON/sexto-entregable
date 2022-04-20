import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPurchasesThunk, deleteCartThunk, purchasesThunk } from '../redux/actions';
import '../style/cart.css'

const Cart = ({isOpen,setIsCartOpen}) => {


    const street = "Green St.1456"
    const colony = "Southwest"
    const zipCode = 12345
    const city = "USA"
    const references = "Some references"


    const cart = useSelector(state => state.cart)

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const totals = cart.map(car => car.price * car.productsInCart?.quantity ) 
    const total = totals.reduce((a, b) => a + b, 0);
    
    const addPurchases = () => {
        const locations = {
            street,
            colony,
            zipCode,
            city,
            references,
        }
        if(cart.length > 0){
            navigate('/purchases/')
            dispatch(addPurchasesThunk(locations))
            dispatch(purchasesThunk())
            setIsCartOpen(!isOpen)
        }
    }

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
            <button onClick={addPurchases}>
                Checkout
            </button>
        </div>
        </div>
    );
};

export default Cart;