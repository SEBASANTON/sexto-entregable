import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCartThunk, loginThunk, purchasesThunk } from '../redux/actions';
import '../style/navbar.css'
import Cart from './Cart';
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';
import userJohn from '../assets/userJohn.webp'
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isCartOpen, setIsCartOpen ] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const login = e => {
        e.preventDefault();
        const credentials = {email,password}
        dispatch(loginThunk(credentials))
        .then(res => {
            localStorage.setItem("token", res.data.data.token)
            setLoginError("");
            setIsLoginOpen(false);
        })
        .catch(error => {
            setLoginError(error.response.data.message)
        })
    }

    const openPurchases = () => {
        if(localStorage.getItem("token")){
            navigate('/purchases/')
            dispatch(purchasesThunk())
        }else{
            setIsLoginOpen(!isLoginOpen);
        }
    }

    const openCart = () =>{
        if(localStorage.getItem("token")){
            setIsCartOpen(!isCartOpen);
            dispatch(getCartThunk())
        }else{
            setIsLoginOpen(!isLoginOpen);
        }
    }
    

    return (
        <div className='navbar'>
            <nav className='navbar-responsive'>
                <Link to="/">
                <div className='navbar-img'>
                    <img src={logo} alt="" />
                </div>
                </Link>

                <div className='navbar-button'>
                    <button onClick={() => setIsLoginOpen(!isLoginOpen)} >
                        <i className="fa-solid fa-user"></i>
                    </button>


            <form onSubmit={login} className={`login ${isLoginOpen ? 'open' : ''} `}>

                {
                    localStorage.getItem("token") ? (
                        <>
                        <img src={userJohn} className="image-John"/><br/>
                        <button onClick={() => localStorage.setItem("token", "")} type="button" className='button-John'>
                            <b>Log out</b>
                        </button>
                        </>
                    ) : (
                        <div className='user-enter'>
                            <img src={userJohn} className="image-John"/><br/>
                            <div className='test-data'>
                                <h4>Test data</h4>
                                <p><i class="fa-solid fa-envelope"></i> john@gmail.com </p>
                                <p><i class="fa-solid fa-lock"></i> john1234</p>
                            </div>
                            <input 
                                type="email" 
                                placeholder='Email...' 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <input 
                                type="password"
                                placeholder='Passsword...' 
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <button>Submit</button>
                            <p>{loginError}</p>
                        </div>
                    )
                }

            </form>

                    <button onClick={openPurchases}>
                        <i className="fa-solid fa-store"></i>
                    </button>
                    
                    <button onClick={openCart}>
                        <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                </div>
            </nav>


            <Cart isOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />

        </div>
    );
};

export default NavBar;