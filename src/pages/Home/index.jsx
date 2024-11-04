import React, { useEffect, useState } from "react";
import styles from './Home.scss';
import classNames from "classnames";
import 'aos/dist/aos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faShare } from '@fortawesome/free-solid-svg-icons';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

import DetailModalComments from '~/components/Layouts/Popup/Details/Comments';
import PostActions from '~/components/Layouts/Popup/PostAction'

import axios from "axios";
import Cookies from "js-cookie";

const cx = classNames.bind(styles);
const apiUrl = process.env.REACT_APP_LOCAL_API_URL;

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPostData, setSelectedPostData] = useState(null);
    const [postArticle, setPostArticle] = useState([]);

    const closeCommentsModal = () => {
        setSelectedPostData(null);
        setIsModalOpen(false);
    };


    useEffect(() => {
        const fetchPostArticle = async () => {
            try {
                const response = await axios.get(`${apiUrl}/post/g_postArticleAll/getAll_Article`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`
                    },
                });
                setPostArticle(response.data.data || []);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPostArticle();
    }, []);

    const openCommentsModal = (post) => {
        setSelectedPostData(post);
        setIsModalOpen(true);
    };

    const formatTimeAgo = (createAt) => {
        const createTime = new Date(createAt);
        const now = new Date();
        const diffInSeconds = Math.floor((now - createTime) / 1000);

        if (diffInSeconds < 60) {
            return `${diffInSeconds}s`;
        } else if (diffInSeconds < 3600) {
            return `${Math.floor(diffInSeconds / 60)}m`;
        } else if (diffInSeconds < 86400) {
            return `${Math.floor(diffInSeconds / 3600)}h`;
        } else if (diffInSeconds < 2592000) {
            return `${Math.floor(diffInSeconds / 86400)}d`;
        } else if (diffInSeconds < 31536000) {
            return `${Math.floor(diffInSeconds / 2592000)}mo`;
        } else {
            return `${Math.floor(diffInSeconds / 31536000)}y`;
        }
    };

    return (
        <div className={cx('home-container')}>
            {/* Story section */}
            <div className={cx('story-section')}>
                {[...Array(6)].map((_, i) => (
                    <div className={cx('story-item')} key={i}>
                        <img src="https://inuvdp.com/wp-content/uploads/2024/03/apple-vector-1.jpg" alt="Story" />
                        <p>User Name {i + 1}</p>
                    </div>
                ))}
            </div>

            {/* Main content section */}
            <div className={cx('main-content')}>
                {postArticle && postArticle.length > 0 ? (
                    postArticle.map((post) => (
                        <div className={cx('post')} key={post.postId}>
                            <div className={cx('post-header')}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={post.account.avatar} alt="User Avatar" className={cx('avatar')} />
                                    <div>
                                        <span className={cx('header-name')}>
                                            {post.account.first_name} {post.account.last_name}
                                            <p style={{ fontWeight: '400' }}>[{formatTimeAgo(post.created_at)}]</p>
                                        </span>
                                        <p>{post.location}</p>
                                    </div>
                                </div>

                                <PostActions />
                            </div>
                            <div className={cx('post-product')}>
                                <Swiper
                                    cssMode={true}
                                    navigation={true}
                                    pagination={false}
                                    mousewheel={true}
                                    keyboard={true}
                                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                                    className="mySwiper"
                                    slidesPerView={3}
                                    spaceBetween={10}
                                >
                                    {post.thumbnails.map((media, index) => (
                                        <SwiperSlide key={index}>
                                            {media.endsWith('.mp4') ? (
                                                <video className={cx('product-video')} src={media} controls />
                                            ) : (
                                                <img className={cx('product-image')} src={media} alt={post.description} />
                                            )}
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <div className={cx('post-actions')}>
                                <FontAwesomeIcon icon={faHeart} />
                                <FontAwesomeIcon icon={faComment} onClick={() => openCommentsModal(post)} />
                                <FontAwesomeIcon icon={faShare} />
                            </div>
                            <span className={cx('total-likes')}>106,000 likes</span>
                            <span className={cx('liked-by')}>Được yêu thích bởi: <a href="yeager_1711">yeager_1711</a> và những người khác</span>
                            <p>{post.description}</p>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', fontSize: '1.4rem', marginTop: '1rem' }}>No posts available.</p>
                )}
            </div>

            <DetailModalComments
                isOpen={isModalOpen}
                onClose={closeCommentsModal}
                postId={selectedPostData?.postId}
            />
        </div>
    );
}

export default Home;
