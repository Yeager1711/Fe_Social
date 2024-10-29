import React, { useState, useEffect, useRef } from 'react';
import styles from './Search.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'; // Import icon nút X

const cx = classNames.bind(styles);

function Search({ isOpen, onClose }) {
    const [searchQuery, setSearchQuery] = useState('');

    const postData = [
        {
            id: 8,
            user: './images/user3.jpg',
            userName: 'itheme_design',
            locationTag: 'Dubai, Các Tiểu Vương quốc Ả Rập Thống nhất',
            image: './images/iphone3.mp4',
            likes: '106,704',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam....',
            date: 'September 21',
        },
        {
            id: 7,
            user: './images/user2.jpg',
            userName: 'archiportfoliomaker',
            locationTag: 'Dubai, Các Tiểu Vương quốc Ả Rập Thống nhất',
            image: './images/iphone2.mp4',
            likes: '106,704',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam....',
            date: 'September 21',
        },
        {
            id: 4,
            user: './images/user5.jpg',
            userName: 'imaaduuddin',
            locationTag: 'Dubai, Các Tiểu Vương quốc Ả Rập Thống nhất',
            image: './images/product3.jpg',
            likes: '6,704',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam....',
            date: 'September 21',
        },
    ];

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

    const filteredPosts = postData.filter(
        post =>
            post.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description.toLowerCase().includes(searchQuery.toLowerCase())
    );


    // Hàm xóa toàn bộ nội dung tìm kiếm
    const handleClearSearch = () => {
        setSearchQuery(''); // Đặt lại searchQuery thành chuỗi rỗng
    };

    return (
        <div ref={popupRef} className={cx('Search-popup', { open: isOpen })}>
            <h3>Search</h3>

            <div className={cx('Search-container')}>
                <div className={cx('box-search')}>
                    <input
                        type="text"
                        placeholder="search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {/* Hiển thị nút "X" khi có dữ liệu trong ô tìm kiếm */}
                    {searchQuery && (
                        <button className={cx('clear-button')} onClick={handleClearSearch}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    )}
                </div>

                <div className={cx('Recent')}>
                <h2>Recent</h2>
                    {searchQuery && (
                        <>
                           
                            {filteredPosts.length > 0 ? (
                                filteredPosts.map(post => (
                                    <div key={post.id} className={cx('search-result')}>
                                        <img src={post.user} alt={post.userName} className={cx('user-image')} />
                                        <div>
                                            <strong>{post.userName}</strong>
                                            <p>{post.description}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className={cx('no-result')}>No recent searches.</p>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Search;
