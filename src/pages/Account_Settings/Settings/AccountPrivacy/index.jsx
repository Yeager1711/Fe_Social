import React, { useState } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import styles from './AccountPrivacy.scss';
import classNames from "classnames";

const cx = classNames.bind(styles);


function AccountPrivacy() {

    const [isActive, setIsActive] = useState(false)

    const handleToggle = () => {
        setIsActive(!isActive)
    }

    return (
        <section className={cx('AccountPrivacy')}>
            <h2>AccountPrivacy</h2>

            <div className={cx('AccountPrivacy-container')}>
                <div className={cx('box')}>
                    <div className={cx('content')}>
                        <span>Private account</span>
                        <p>When your account is public, your profile and posts can be seen by anyone, on or off SocializeIt, even if they don't have an SocializeIt account.
                            When your account is private, only the followers you approve can see what you share, including your photos or videos on hashtag and location pages, and your followers and following lists. Certain info on your profile, like your profile picture and username, is visible to everyone on and off SocializeIt. </p>
                    </div>

                    <div className={cx('btn-slide', {active: isActive})} 
                    onClick={handleToggle}> </div>
                </div>
            </div>
        </section>
    );
}

export default AccountPrivacy;