import React, { useState } from "react";
import styles from './Home.scss';
import classNames from "classnames";
import 'aos/dist/aos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faShare } from '@fortawesome/free-solid-svg-icons';

import DetailModalComments from '~/components/Layouts/Popup/Details/Comments'

const cx = classNames.bind(styles);

function Home() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);

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
            comments: [
                {
                    user: './images/user2.jpg',
                    username: 'parvizsharifiy28',
                    comment: '15-pro legend 🔥',
                    time: '3w',
                    likes: 25
                },
                {
                    user: './images/user2.jpg',
                    username: 'iandreamosca_',
                    comment: 'Natural titanium team!',
                    time: '3w',
                    likes: 116
                },
                {
                    user: './images/user2.jpg',
                    username: 'aizul_ordep',
                    comment: 'Can someone fulfill my dream of having an iPhone? 🙏🎉 please I am from Angola',
                    time: '1w',
                    likes: 1
                }
            ]
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
            comments: [
                {
                    user: './images/user2.jpg',
                    username: 'parvizsharifiy28',
                    comment: '15-pro legend 🔥',
                    time: '3w',
                    likes: 25
                },
                {
                    user: './images/user2.jpg',
                    username: 'iandreamosca_',
                    comment: 'Natural titanium team!',
                    time: '3w',
                    likes: 116
                },
                {
                    user: './images/user2.jpg',
                    username: 'aizul_ordep',
                    comment: 'Can someone fulfill my dream of having an iPhone? 🙏🎉 please I am from Angola',
                    time: '1w',
                    likes: 1
                }
            ]
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
            comments: [
                {
                    user: './images/user2.jpg',
                    username: 'parvizsharifiy28',
                    comment: '15-pro legend 🔥',
                    time: '3w',
                    likes: 25
                },
                {
                    user: './images/user2.jpg',
                    username: 'iandreamosca_',
                    comment: 'Natural titanium team!',
                    time: '3w',
                    likes: 116
                },
                {
                    user: './images/user2.jpg',
                    username: 'aizul_ordep',
                    comment: 'Can someone fulfill my dream of having an iPhone? 🙏🎉 please I am from Angola',
                    time: '1w',
                    likes: 1
                }
            ]
        },
        {
            id: 5,
            user: './images/user4.jpg',
            userName: 'edc_tech_',
            locationTag: 'Dubai, Các Tiểu Vương quốc Ả Rập Thống nhất',
            image: './images/product4.jpg',
            likes: '1,106,704',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam....',
            date: 'September 21',
            comments: [
                {
                    user: './images/user2.jpg',
                    username: 'parvizsharifiy28',
                    comment: '15-pro legend 🔥',
                    time: '3w',
                    likes: 25
                },
                {
                    user: './images/user2.jpg',
                    username: 'iandreamosca_',
                    comment: 'Natural titanium team!',
                    time: '3w',
                    likes: 116
                },
                {
                    user: './images/user2.jpg',
                    username: 'aizul_ordep',
                    comment: 'Can someone fulfill my dream of having an iPhone? 🙏🎉 please I am from Angola',
                    time: '1w',
                    likes: 1
                },
                {
                    user: './images/user2.jpg',
                    username: 'parvizsharifiy28',
                    comment: '15-pro legend 🔥',
                    time: '3w',
                    likes: 25
                },
                {
                    user: './images/user2.jpg',
                    username: 'iandreamosca_',
                    comment: 'Natural titanium team!',
                    time: '3w',
                    likes: 116
                },
                {
                    user: './images/user2.jpg',
                    username: 'aizul_ordep',
                    comment: 'Can someone fulfill my dream of having an iPhone? 🙏🎉 please I am from Angola',
                    time: '1w',
                    likes: 1
                },
                {
                    user: './images/user2.jpg',
                    username: 'parvizsharifiy28',
                    comment: '15-pro legend 🔥',
                    time: '3w',
                    likes: 25
                },
                {
                    user: './images/user2.jpg',
                    username: 'iandreamosca_',
                    comment: 'Natural titanium team!',
                    time: '3w',
                    likes: 116
                },
                {
                    user: './images/user2.jpg',
                    username: 'aizul_ordep',
                    comment: 'Can someone fulfill my dream of having an iPhone? 🙏🎉 please I am from Angola',
                    time: '1w',
                    likes: 1
                },
                {
                    user: './images/user2.jpg',
                    username: 'parvizsharifiy28',
                    comment: '15-pro legend 🔥',
                    time: '3w',
                    likes: 25
                },
                {
                    user: './images/user2.jpg',
                    username: 'iandreamosca_',
                    comment: 'Natural titanium team!',
                    time: '3w',
                    likes: 116
                },
                {
                    user: './images/user2.jpg',
                    username: 'aizul_ordep',
                    comment: 'Can someone fulfill my dream of having an iPhone? 🙏🎉 please I am from Angola',
                    time: '1w',
                    likes: 1
                }
            ]
        },
        {
            id: 3,
            user: './images/user2.jpg',
            userName: 'archiportfoliomaker',
            locationTag: 'Dubai, Các Tiểu Vương quốc Ả Rập Thống nhất',
            image: './images/product2.jpg',
            likes: '206,704',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam....',
            date: 'September 21',
            comments: [
                {
                    user: './images/user2.jpg',
                    username: 'parvizsharifiy28',
                    comment: '15-pro legend 🔥',
                    time: '3w',
                    likes: 25
                },
                {
                    user: './images/user2.jpg',
                    username: 'iandreamosca_',
                    comment: 'Natural titanium team!',
                    time: '3w',
                    likes: 116
                },
                {
                    user: './images/user2.jpg',
                    username: 'aizul_ordep',
                    comment: 'Can someone fulfill my dream of having an iPhone? 🙏🎉 please I am from Angola',
                    time: '1w',
                    likes: 1
                }
            ]
        },
        {
            id: 6,
            user: './images/user2.jpg',
            userName: 'archiportfoliomaker',
            locationTag: 'Dubai, Các Tiểu Vương quốc Ả Rập Thống nhất',
            image: './images/product5.jpg',
            likes: '1,704',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam....',
            date: 'September 21',
            comments: [
                {
                    user: './images/user2.jpg',
                    username: 'parvizsharifiy28',
                    comment: '15-pro legend 🔥',
                    time: '3w',
                    likes: 25
                },
                {
                    user: './images/user2.jpg',
                    username: 'iandreamosca_',
                    comment: 'Natural titanium team!',
                    time: '3w',
                    likes: 116
                },
                {
                    user: './images/user2.jpg',
                    username: 'aizul_ordep',
                    comment: 'Can someone fulfill my dream of having an iPhone? 🙏🎉 please I am from Angola',
                    time: '1w',
                    likes: 1
                }
            ]
        },
        {
            id: 1,
            user: './images/user6.jpg',
            userName: 'zenjoshh',
            locationTag: 'Dubai, Các Tiểu Vương quốc Ả Rập Thống nhất',
            image: './images/iphone1.mp4',
            likes: '106,704',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam....',
            date: 'September 21',
            comments: [
                {
                    user: './images/user2.jpg',
                    username: 'parvizsharifiy28',
                    comment: '15-pro legend 🔥',
                    time: '3w',
                    likes: 25
                },
                {
                    user: './images/user2.jpg',
                    username: 'iandreamosca_',
                    comment: 'Natural titanium team!',
                    time: '3w',
                    likes: 116
                },
                {
                    user: './images/user2.jpg',
                    username: 'aizul_ordep',
                    comment: 'Can someone fulfill my dream of having an iPhone? 🙏🎉 please I am from Angola',
                    time: '1w',
                    likes: 1
                }
            ]
        },
        {
            id: 7,
            user: './images/user2.jpg',
            userName: 'archiportfoliomaker',
            locationTag: 'Dubai, Các Tiểu Vương quốc Ả Rập Thống nhất',
            image: './images/product6.jpg',
            likes: '704',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam....',
            date: 'September 21',
            comments: [
                {
                    user: './images/user2.jpg',
                    username: 'parvizsharifiy28',
                    comment: '15-pro legend 🔥',
                    time: '3w',
                    likes: 25
                },
                {
                    user: './images/user2.jpg', username: 'iandreamosca_',
                    comment: 'Natural titanium team!',
                    time: '3w',
                    likes: 116
                },
                {
                    user: './images/user2.jpg',
                    username: 'aizul_ordep',
                    comment: 'Can someone fulfill my dream of having an iPhone? 🙏🎉 please I am from Angola',
                    time: '1w',
                    likes: 1
                }
            ]
        },
        {
            id: 2,
            user: './images/user7.jpg',
            userName: 'riceminimalist',
            locationTag: 'Dubai, Các Tiểu Vương quốc Ả Rập Thống nhất',
            image: './images/product1.jpg',
            likes: '106,704',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam....',
            date: 'September 21',
            comments: [
                {
                    user: './images/user2.jpg',
                    username: 'parvizsharifiy28',
                    comment: '15-pro legend 🔥',
                    time: '3w',
                    likes: 25
                },
                {
                    user: './images/user2.jpg',
                    username: 'iandreamosca_',
                    comment: 'Natural titanium team!',
                    time: '3w',
                    likes: 116
                },
                {
                    user: './images/user2.jpg',
                    username: 'aizul_ordep',
                    comment: 'Can someone fulfill my dream of having an iPhone? 🙏🎉 please I am from Angola',
                    time: '1w',
                    likes: 1
                }
            ]
        },
    ]

    const handleCommentClick = (post) => {
        setCurrentPost(post);
        setModalOpen(true);
    }

    return (
        <div className={cx('home-container')}>
            {/* Story section */}
            <div className={cx('story-section')}>
                <div className={cx('story-item')}>
                    <img src="https://inuvdp.com/wp-content/uploads/2024/03/apple-vector-1.jpg" alt="Story" />
                    <p>User Name 1</p>
                </div>
                <div className={cx('story-item')}>
                    <img src="https://inuvdp.com/wp-content/uploads/2024/03/apple-vector-1.jpg" alt="Story" />
                    <p>User Name 2</p>
                </div>
                <div className={cx('story-item')}>
                    <img src="https://inuvdp.com/wp-content/uploads/2024/03/apple-vector-1.jpg" alt="Story" />
                    <p>User Name 3</p>
                </div>
                <div className={cx('story-item')}>
                    <img src="https://inuvdp.com/wp-content/uploads/2024/03/apple-vector-1.jpg" alt="Story" />
                    <p>User Name 4</p>
                </div>

                <div className={cx('story-item')}>
                    <img src="https://inuvdp.com/wp-content/uploads/2024/03/apple-vector-1.jpg" alt="Story" />
                    <p>User Name 5</p>
                </div>

                <div className={cx('story-item')}>
                    <img src="https://inuvdp.com/wp-content/uploads/2024/03/apple-vector-1.jpg" alt="Story" />
                    <p>User Name 6</p>
                </div>
            </div>

            {/* Main content section */}
            <div className={cx('main-content')}>
                {postData && postData.map(post => (
                    <div className={cx('post')} key={post.id}>
                        <div className={cx('post-header')}>
                            <img src={post.user} alt="User Avatar" className={cx('avatar')} />
                            <div>
                                <span>{post.userName} {post.id}</span>
                                <p>{post.locationTag}</p>
                            </div>
                        </div>
                        <div className={cx('post-product')}>
                            {post.image.endsWith('.mp4') ? (
                                <video className={cx('product-video')} src={post.image} controls />
                            ) : (
                                <img className={cx('product-image')} src={post.image} alt={post.description} />
                            )}
                        </div>
                        <div className={cx('post-actions')}>
                            <FontAwesomeIcon icon={faHeart} />
                            <FontAwesomeIcon icon={faComment} onClick={() => handleCommentClick(post)} />
                            <FontAwesomeIcon icon={faShare} />
                        </div>
                        <span className={cx('total-likes')}>{post.likes} likes</span>
                        <span className={cx('liked-by')}>Được yêu thích bởi: <a href="yeager_1711">yeager_1711</a> và những người khác</span>
                        <p>{post.description}</p>
                    </div>
                ))}

            </div>

            <DetailModalComments
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                postData={currentPost}
            />

        </div>
    );
}

export default Home;
