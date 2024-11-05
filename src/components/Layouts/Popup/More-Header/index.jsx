import React from "react";
import styles from './More-header.scss'
import classNames from "classnames";

// icons React
import { CiSettings } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { IoSunnyOutline } from "react-icons/io5";

import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function MoreHeader({ onClose }) {

    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('access_token');

        navigate('/SocializeIt/auth/login', { replace: true });

        if (onClose) {
            onClose();
        }
    }


    // check access token
    const access_token = Cookies.get('access_token');

    return (
        <div className={cx('MoreHeader')}>

            <span className={cx('action-button')}><CiSettings /> settings</span>
            <span className={cx('action-button')}><IoSunnyOutline /> Switch appearance</span>
            {access_token && (
                <span className={cx('wapper-actionButton')}>
                    <span className={cx('action-button')}><CiBookmark /> Saved</span>


                    <span className={cx('action-button')} onClick={handleLogout}><IoIosLogOut /> Logout</span>
                </span>
            )}
        </div>
    );
}

export default MoreHeader;