import React, { useState } from 'react';

import './login.styles.scss';

const Login: React.FC = () => {
    const [forgotPasswd, setForgotPasswd] = useState(false);
    
    const forgotPassword = () => {
        setForgotPasswd(!forgotPasswd);
    };

    const frameFp = () => {
        return (
            <div>
            <h1>Forgot Password</h1>
            </div>
        );
    }

    const frameLogin = () => {
        return (
            <div id="LoginForm">
            <form action='' method='POST'>
                <label>
                    <p>Username</p>
                    <input type='text' name='username' />
                </label>
                <label>
                    <p>Password</p>
                    <input type='password' name='password' />
                </label>
                <div>
                    <button type='submit'>Login</button>
                    <a href='#' onClick={forgotPassword}>Forgot Password?</a>
                </div>
            </form>
            </div>
        );
    }
    
    return (
        forgotPasswd ? frameFp() : frameLogin()
    );
};

export default Login;