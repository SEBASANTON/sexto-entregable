import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getCartThunk,
    loginThunk,
    purchasesThunk,
    setIsLoginOpen,
} from '../redux/actions';
import '../style/navbar.css';
import Cart from './Cart';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import userJohn from '../assets/userJohn.webp';
import { useNavigate } from 'react-router-dom';
import SignUp from './SignUp';

const NavBar = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);

    const isLoginOpen = useSelector(state => state.isLoginOpen);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = e => {
        e.preventDefault();
        const credentials = {
            email,
            password,
        };
        dispatch(loginThunk(credentials))
            .then(res => {
                localStorage.setItem('token', res.data.data.token);
                setLoginError('');
                dispatch(setIsLoginOpen(false));
            })
            .catch(error => {
                setLoginError('Invalid credentials');
            });
    };

    const openLoginOpen = () => {
        setIsUserOpen(false);
        dispatch(setIsLoginOpen(!isLoginOpen));
    };

    const openPurchases = () => {
        if (localStorage.getItem('token')) {
            navigate('/purchases/');
            dispatch(purchasesThunk());
        } else {
            dispatch(setIsLoginOpen(!isLoginOpen));
        }
    };

    const openCart = () => {
        if (localStorage.getItem('token')) {
            setIsCartOpen(!isCartOpen);
            dispatch(getCartThunk());
        } else {
            dispatch(setIsLoginOpen(!isLoginOpen));
        }
    };
    const logOut = () => {
        localStorage.setItem('token', '');
        dispatch(setIsLoginOpen(false));
        dispatch(setIsLoginOpen(true));
        reset();
    };
    const reset = () => {
        setEmail('');
        setPassword('');
    };

    const openSignUp = () => {
        setIsUserOpen(!isUserOpen);
        dispatch(setIsLoginOpen(!isLoginOpen));
    };

    return (
        <div className="navbar">
            <nav className="navbar-responsive">
                <Link to="/">
                    <div className="navbar-img">
                        <img src={logo} alt="" />
                    </div>
                </Link>

                <div className="navbar-button">
                    <button onClick={openLoginOpen}>
                        <i className="fa-solid fa-user"></i>
                    </button>

                    <form
                        onSubmit={login}
                        className={`login ${isLoginOpen ? 'open' : ''} `}
                    >
                        {localStorage.getItem('token') ? (
                            <>
                                <img
                                    src={userJohn}
                                    alt=""
                                    className="image-John"
                                />
                                <br />
                                <button
                                    onClick={logOut}
                                    type="button"
                                    className="button-John"
                                >
                                    <b>Log out</b>
                                </button>
                            </>
                        ) : (
                            <div className="user-enter">
                                <img
                                    src={userJohn}
                                    alt=""
                                    className="image-John"
                                />
                                <br />
                                <div className="test-data">
                                    <h4>Test data</h4>
                                    <p>
                                        <i className="fa-solid fa-envelope"></i>{' '}
                                        john@gmail.com{' '}
                                    </p>
                                    <p>
                                        <i className="fa-solid fa-lock"></i>{' '}
                                        john1234
                                    </p>
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email..."
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder="Passsword..."
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <button className="login-button">Login</button>
                                <p>{loginError}</p>
                                <div className="paragraph-login">
                                    <p>Don't have an account?</p>
                                    <button onClick={openSignUp} type="button">
                                        <b>Sign up</b>
                                    </button>
                                </div>
                            </div>
                        )}
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
            <SignUp isUserOpen={isUserOpen} setIsUserOpen={setIsUserOpen} />
        </div>
    );
};

export default NavBar;
