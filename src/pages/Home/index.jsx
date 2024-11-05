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
import PostActions from '~/components/Layouts/Popup/PostAction';

import {formatTimeAgo } from '~/ultis/formatTimeAgo'

import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const cx = classNames.bind(styles);
const apiUrl = process.env.REACT_APP_LOCAL_API_URL;

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPostData, setSelectedPostData] = useState(null);
    const [postArticle, setPostArticle] = useState([]);
    const [likeData, setLikeData] = useState([]); // To store like status and counts for each post

    const Access_token = Cookies.get('access_token');
    const currentAccountId = Access_token ? jwtDecode(Access_token).accountId : null



    const handleToggleLike = async (postId) => {
        try {
            const response = await axios.post(
                `${apiUrl}/likes/post/createLikes_PostID/${postId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`
                    },
                }
            );

            // Toggle the like status and update the count based on current state
            const updatedLikeData = likeData.map((item) => {
                if (item.postId === postId) {
                    return {
                        ...item,
                        isLiked: !item.isLiked,
                        likeCount: item.isLiked ? item.likeCount - 1 : item.likeCount + 1
                    };
                }
                return item;
            });
            setLikeData(updatedLikeData);
            console.log(response.data.message); // Logs "Like added" or "Like removed"
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    useEffect(() => {
        const fetchPostArticle = async () => {
            try {
                const response = await axios.get(`${apiUrl}/post/g_postArticleAll/getAll_Article`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`
                    },
                });
                const posts = response.data.data || [];

                // Fetch likes for each post
                const likesData = await Promise.all(posts.map(async (post) => {
                    const likesResponse = await axios.get(`${apiUrl}/likes/get/getLikes_PostID/${post.postId}`, {
                        headers: { Authorization: `Bearer ${Cookies.get('access_token')}` },
                    });
                    const userHasLiked = likesResponse.data.likes.some(like => like.accountId === currentAccountId)
                    return {
                        postId: post.postId,
                        likeCount: likesResponse.data.likeCount,
                        isLiked: userHasLiked
                    };
                }));

                setPostArticle(posts);
                setLikeData(likesData); // Set the like data for all posts
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

    const closeCommentsModal = () => {
        setSelectedPostData(null);
        setIsModalOpen(false);
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
                    postArticle.map((post) => {
                        const currentLikeData = likeData.find(item => item.postId === post.postId) || {};
                        return (
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
                                    <div onClick={() => handleToggleLike(post.postId)} style={{ cursor: 'pointer' }}>
                                        <FontAwesomeIcon icon={faHeart} color={currentLikeData.isLiked ? 'red' : 'gray'} />
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon={faComment} onClick={() => openCommentsModal(post)} />
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon={faShare} />
                                    </div>
                                </div>
                                <span className={cx('total-likes')}>{currentLikeData.likeCount || 0} likes</span>
                                <span className={cx('liked-by')}>Được yêu thích bởi: <a href="yeager_1711">yeager_1711</a> và những người khác</span>
                                <p>{post.description}</p>
                            </div>
                        );
                    })
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
