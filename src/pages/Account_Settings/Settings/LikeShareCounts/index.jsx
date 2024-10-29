import React, { useState } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import styles from './LikeShareCounts.scss';
import classNames from "classnames";

const cx = classNames.bind(styles);

function LikeShareCounts() {
    const [isActive, setIsActive] = useState(false);

    const handleToggleActive = () => {
        setIsActive(!isActive)
    }
    return (
        <section className={cx('LikeShareCounts')}>
            <h2>Like and share counts</h2>

            <div className={cx('LikeShareCounts-container')}>
                <div className={cx('title')}>
                        <span>Hide like & share counts</span>
                        <button className={cx('btn-slide', {active: isActive})}
                        onClick={handleToggleActive}
                        ></button>
                </div>

                <div className={cx('content')}>
                    <p>On SocializeIt, the number of likes on posts from other accounts will be hidden. You can hide the number of likes on your own posts and reels by going to Advanced settings before sharing.</p>
                    <p>On Threads, the number of likes, views, reposts and quotes on posts from other profiles will be hidden. You can hide these on your own posts from the menu for each post.</p>
                </div>
            </div>
        </section>
    );
}

export default LikeShareCounts;