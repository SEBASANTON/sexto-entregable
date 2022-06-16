import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userJohn from '../assets/userJohn.webp'
import { createUserThunk, setIsLoginOpen } from '../redux/actions';


const SignUp = ({isUserOpen, setIsUserOpen}) => {

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const role = "admin";

    const [createError, setCreateError] = useState("");

    const dispatch = useDispatch();
    const isLoginOpen = useSelector(state => state.isLoginOpen);


    const checkIn = e => {
        e.preventDefault();
        const information = {
            email,
            firstName,
            lastName,
            password,
            phone,
            role,
        }
        dispatch(createUserThunk(information))
        .then(res => {
            setIsUserOpen(!isUserOpen);
            dispatch(setIsLoginOpen(!isLoginOpen));
            reset();
            setCreateError("")
        })
        .catch( error => {
            setCreateError("Invalid or existing email, please enter another one.")
        }
        )
    }
    
    const LogIn = () => {
        setIsUserOpen(!isUserOpen);
        dispatch(setIsLoginOpen(!isLoginOpen));
    }

    const reset = () =>{
        setEmail("");
        setFirstName("");
        setLastName("");
        setPassword("");
        setPhone("")
    }



    return (
        <form onSubmit={checkIn}>
        <div className={`login ${isUserOpen? 'open' :''}`}>
            <div className='user-enter'>
                <img src={userJohn} alt="" className="image-John"/><br/>
                <input 
                    type="email" 
                    placeholder='Email...' 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder='First Name...' 
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder='Last Name...' 
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder='Passsword...' 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <input 
                    type="number"
                    placeholder='Phone (10 characters)...' 
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
                <p>{createError}</p>
                <button className='login-button'>Sign up</button>
                <div className='paragraph-login'>
                    <p>Have an account?</p>
                    <button onClick={LogIn} type='button'> <b>Log in</b></button>
                </div>
            </div>
        </div>
        </form>
            
    );
};

export default SignUp;