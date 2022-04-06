import axios from 'axios';
import React, { useState } from 'react';
import '../style/navbar.css'
const NavBar = () => {

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    localStorage.setItem("number","10")

    const login = e => {
        e.preventDefault();
        const credentials = {email,password}
        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login/', credentials)
            .then(res => localStorage.setItem("token", res.data.data.token))
            /* .catch(error => {
                console.log(error.response)
            }) */
    }

    return (
        <div className='navbar'>
            <nav>
                <strong>Products App</strong>
                <button onClick={() => setIsLoginOpen(!isLoginOpen)}>
                    Login
                </button>

            </nav>

            <form onSubmit={login} className={`login ${isLoginOpen ? 'open' : ''} `}>
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
            </form>
            
        </div>
    );
};

export default NavBar;