import React, { useState } from "react";
import axios from "axios";
import styles from './Register.scss';
import classNames from "classnames";
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Register() {
    const apiUrl = process.env.REACT_APP_LOCAL_API_URL;
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const navigator = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Passwords do not match',
            });
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/auth/r-acount/register`, {
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                username: formData.username,
                password: formData.password,
            });

            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: 'You have registered successfully!',
                }).then((result) => {
                    if(result.isConfirmed) {
                        navigator('/SocializeIt/auth/login');
                    }
                })
            }
        } catch (error) {
            if(error.response && error.response.data.error) {
                const errorMessage = error.response.data.error;
                let alertMessage = "Registration failed. Please try again.";

                if(errorMessage === "Email already exists") {
                    alertMessage = 'Email này đã được sử dụng. Vui lòng sử dụng một email khác.';
                }else if(errorMessage === "Username already exists" ) {
                    alertMessage = 'Username này đã được sử dụng !';
                }

                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: alertMessage,
                });
            }else {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: 'An unexpected error occurred. Please try again.',
                });
            }

            console.error("Error registering user:", error);
        }
    };

    return (
        <section className={cx('register')}>
            <h3>Register</h3>
            <form className={cx('register-container')} onSubmit={handleSubmit}>
                <div className={cx('flex-name')}>
                    <div className={cx('box-input')}>
                        <span>Firstname</span>
                        <input
                            type="text"
                            name="firstname"
                            placeholder="Enter your firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={cx('box-input')}>
                        <span>Lastname</span>
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Enter your lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className={cx('box-input')}>
                    <span>Email</span>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
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
                <div className={cx('box-input')}>
                    <span>Confirm Password</span>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className={cx('btn-register')}>
                    Register
                </button>
            </form>
        </section>
    );
}

export default Register;
