import React, { useEffect, useRef } from 'react';
import styles from './Notifications.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Notifications({ isOpen, onClose }) {


    const popupRef = useRef(null);

    useEffect(() => {
        // Hàm kiểm tra nếu nhấn ngoài vùng popup
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose(); // Đóng popup nếu nhấn bên ngoài
            }
        };

        // Chỉ thêm sự kiện nếu popup đang mở
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup sự kiện khi component unmount hoặc popup đóng
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <div ref={popupRef} className={cx('notifications-popup', { open: isOpen })}>
            <h3>Notifications</h3>

            <div className={cx('notifications-container')}>
                <div className={cx('thisMonth')}>
                    <h2>This month</h2>
                    <div className={cx('box')}>
                        <div className={cx('images')}>
                            <img src="./images/user2.jpg" alt="" />
                        </div>
                        <div className={cx('content')}>
                            <span>
                                <a href="">archiportfoliomaker</a>
                                started following you.
                                <span className={cx('meta')}>4W</span>
                            </span>
                        </div>
                        <div className={cx('actions')}>
                            <button>Requested</button>
                        </div>
                    </div>

                    <div className={cx('box')}>
                        <div className={cx('images')}>
                            <img src="./images/user3.jpg" alt="" />
                        </div>
                        <div className={cx('content')}>
                            <span>
                                <a href="">itheme_design</a>
                                started following you.
                                <span className={cx('meta')}>4W</span>
                            </span>
                        </div>
                        <div className={cx('actions')}>
                            <button>Following</button>
                        </div>
                    </div>

                    <div className={cx('box')}>
                        <div className={cx('images')}>
                            <img src="./images/user4.jpg" alt="" />
                        </div>
                        <div className={cx('content')}>
                            <span>
                                <a href="">edc_tech_</a>
                                started following you.
                                <span className={cx('meta')}>4W</span>
                            </span>
                        </div>
                        <div className={cx('actions')}>
                            <button>Following</button>
                        </div>
                    </div>

                    <div className={cx('box')}>
                        <div className={cx('images')}>
                            <img src="./images/user5.jpg" alt="" />
                        </div>
                        <div className={cx('content')}>
                            <span>
                                <a href="">imaaduuddin</a>
                                started following you.
                                <span className={cx('meta')}>4W</span>
                            </span>
                        </div>
                        <div className={cx('actions')}>
                            <button>Following</button>
                        </div>
                    </div>
                </div>
                <div className={cx('earlier')}>
                <h2>Earlier</h2>
                <div className={cx('box')}>
                        <div className={cx('images')}>
                            <img src="./images/user6.jpg" alt="" />
                        </div>
                        <div className={cx('content')}>
                            <span>
                                <a href="">zenjoshh</a>
                                started following you.
                                <span className={cx('meta')}>4W</span>
                            </span>
                        </div>
                        <div className={cx('actions')}>
                            <button>Requested</button>
                        </div>
                    </div>

                    <div className={cx('box')}>
                        <div className={cx('images')}>
                            <img src="./images/user7.jpg" alt="" />
                        </div>
                        <div className={cx('content')}>
                            <span>
                                <a href="">riceminimalist</a>
                                started following you.
                                <span className={cx('meta')}>4W</span>
                            </span>
                        </div>
                        <div className={cx('actions')}>
                            <button>Requested</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Notifications;
