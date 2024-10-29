import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from './Account_Settings.scss';
import classNames from "classnames/bind";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faLock, faStar, faComment, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Account() {
    return (
        <section className={cx('account')}>
            <div className={cx('wrapper-flex')}>
                {/* Sidebar Settings */}
                <div className={cx('settings')}>
                    <h3>Settings</h3>
                    <p>Who can see your content</p>
                    <ul>
                        <li>
                            <NavLink
                                to="settings/v2/account_privacy"
                                className={({ isActive }) => cx({ active: isActive })}>
                                    <FontAwesomeIcon icon={faLock} />
                                Account privacy
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="settings/v2/close_friends"
                                className={({ isActive }) => cx({ active: isActive })}>
                                    <FontAwesomeIcon icon={faStar} />
                                Close Friends
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="settings/v2/blocked_accounts"
                                className={({ isActive }) => cx({ active: isActive })}>
                                    <FontAwesomeIcon icon={faBan} />
                                Blocked
                            </NavLink>
                        </li>
                        {/* Add more settings links here */}
                    </ul>
                    <p>How others can interact with you</p>
                    <ul>
                        <li>
                            <NavLink
                                to="settings/comments"
                                className={({ isActive }) => cx({ active: isActive })}>
                                    <FontAwesomeIcon icon={faComment} />
                                Comments
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="settings/likes_count"
                                className={({ isActive }) => cx({ active: isActive })}>
                                    <FontAwesomeIcon icon={faHeart} />
                                Like and share counts
                            </NavLink>
                        </li>

                    </ul>
                    <p>More info and support</p>
                    <ul>
                        <li>
                            <NavLink
                                to="settings/help/account_status"
                                className={({ isActive }) => cx({ active: isActive })}>
                                    <FontAwesomeIcon icon={faUser} />
                                Account Status
                            </NavLink>
                        </li>

                    </ul>
                </div>

                {/* Dynamic Content Area */}
                <div className={cx('details-settings')}>
                    <Outlet />
                </div>
            </div>
        </section>
    );
}

export default Account;
