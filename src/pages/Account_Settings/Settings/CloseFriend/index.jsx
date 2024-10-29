import React, { useState } from "react";
import styles from './CloseFriend.scss';
import classNames from "classnames";

const cx = classNames.bind(styles);

function CloseFriend() {
    const [searchQuery, setSearchQuery] = useState('');

    const postData = [
        {
            id: 8,
            user: './images/user3.jpg',
            userName: 'itheme_design',
            nickName: '_design',
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
            nickName: '_foliomaker',
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
            nickName: '_adudin',
            locationTag: 'Dubai, Các Tiểu Vương quốc Ả Rập Thống nhất',
            image: './images/product3.jpg',
            likes: '6,704',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam....',
            date: 'September 21',

        },
        {
            id: 5,
            user: './images/user4.jpg',
            userName: 'edc_tech_',
            nickName: '_edc',
            locationTag: 'Dubai, Các Tiểu Vương quốc Ả Rập Thống nhất',
            image: './images/product4.jpg',
            likes: '1,106,704',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam....',
            date: 'September 21',

        },


        {
            id: 1,
            user: './images/user6.jpg',
            userName: 'zenjoshh',
            nickName: '_zenjoshh',
            locationTag: 'Dubai, Các Tiểu Vương quốc Ả Rập Thống nhất',
            image: './images/iphone1.mp4',
            likes: '106,704',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam....',
            date: 'September 21',

        },

        {
            id: 2,
            user: './images/user7.jpg',
            userName: 'riceminimalist',
            nickName: '_riceminimalist',
            locationTag: 'Dubai, Các Tiểu Vương quốc Ả Rập Thống nhất',
            image: './images/product1.jpg',
            likes: '106,704',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam....',
            date: 'September 21',
        },
    ]

    // Lọc dữ liệu dựa trên searchQuery
    const filteredQuery = postData.filter(
        post =>
            post.userName.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
            post.nickName.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    return (
        <section className={cx('CloseFriend')}>
            <h2>Close friends</h2>

            <div className={cx('CloseFriend-container')}>
                <p className="title">We don't send notifications when you edit your close friends list.</p>

                <div className={cx('box-search')}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className={cx('wrapper-friends')}>
                    {searchQuery === '' ? (
                        postData.map(post => (
                            <div key={post.id} className={cx('friend-item')}>
                                <img src={post.user} alt={post.userName} className={cx('user-image')} />
                                <div>
                                    <strong>{post.userName}</strong>
                                    <p>{post.nickName}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <>
                            {/* Hiển thị dữ liệu đã lọc */}
                            {filteredQuery.length > 0 ? (
                                filteredQuery.map(post => (
                                    <div key={post.id} className={cx('search-result')}>
                                        <img src="./images/user3.jpg" alt={post.userName} className={cx('user-image')} />
                                        <div>
                                            <strong>{post.userName}</strong>
                                            <p>{post.nickName}</p>
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
        </section>
    );
}

export default CloseFriend;
