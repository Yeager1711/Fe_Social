import React, { useState } from "react";
import axios from "axios";
import styles from './Login.scss';
import classNames from "classnames";
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; // Import thư viện js-cookie

const cx = classNames.bind(styles);

function Login() {
    const apiUrl = process.env.REACT_APP_LOCAL_API_URL;
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const navigator = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${apiUrl}/auth/l-account/login`, {
                username: formData.username,
                password: formData.password,
            });

            if (response.data.success) {
                // Lưu token vào cookies
                Cookies.set('access_token', response.data.tokenAuth, { expires: 1}); 

                navigator('/');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Login failed. Please try again.',
            });
            console.error("Error logging user:", error);
        }
    };

    return (
        <section className={cx('Login')}>
            <h3>Login</h3>
            <form className={cx('Login-container')} onSubmit={handleSubmit}>
                <div className={cx('box-input')}>
                    <span>Username</span>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={cx('box-input')}>
                    <span>Password</span>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <button type="submit" className={cx('btn-Login')}>
                    Login
                </button>
            </form>
        </section>
    );
}

export default Login;
