import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Comments.scss';
import classNames from 'classnames/bind';
import { faX } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faBookmark, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';

import {formatTimeAgo } from '~/ultis/formatTimeAgo'

// icons React
import { CiBookmark } from "react-icons/ci";

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel';
import 'swiper/css/keyboard';
import 'swiper/css/autoplay';

import { Pagination, Autoplay, Grid } from 'swiper/modules';

import { CiHeart } from "react-icons/ci";

const cx = classNames.bind(styles);
const apiUrl = process.env.REACT_APP_LOCAL_API_URL;

function DetailModalComments({ isOpen, onClose, postId }) {
    const [postData, setPostData] = useState(null);
    const [error, setError] = useState(null);
    const [comment, setComment] = useState("");
    const [commentsPost, setCommentsPost] = useState([]);
    const [isLiked, setIsLiked] = useState(false); // Track like status
    const [likeCount, setLikeCount] = useState(0); // Track number of likes

    const Access_token = Cookies.get('access_token');
    const currentAccountId = Access_token ? jwtDecode(Access_token).accountId : null

   const fetchPostData = async () => {
    try {
        if (postId) {
            setCommentsPost([]);

            // Fetch post data
            const postResponse = await axios.get(`${apiUrl}/post/g_postArticleID/getPost/${postId}`, {
                headers: { Authorization: `Bearer ${Cookies.get('access_token')}` },
            });

            const post = postResponse.data[0];
            setPostData(post);

            // Fetch comments
            const commentsResponse = await axios.get(`${apiUrl}/comments/get/getComments_PostID/${postId}`, {
                headers: { Authorization: `Bearer ${Cookies.get('access_token')}` },
            });

            const sortedComments = commentsResponse.data.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );

            setCommentsPost(sortedComments);

            // Fetch like count and like status for the current user
            const likesResponse = await axios.get(`${apiUrl}/likes/get/getLikes_PostID/${postId}`, {
                headers: { Authorization: `Bearer ${Cookies.get('access_token')}` },
            });
            setLikeCount(likesResponse.data.likeCount);

            // Check if the current user has already liked the post
            const userHasLiked = likesResponse.data.likes.some(like => like.accountId === currentAccountId); // Assuming `isLikedByUser` tells if current user liked
            setIsLiked(userHasLiked); // Set initial like status based on backend response
        }
    } catch (err) {
        setError(err.response ? err.response.data : "An error occurred");
    }
};


    useEffect(() => {
        if (isOpen && postId) {
            fetchPostData();
        }
    }, [isOpen, postId]);



    if (!isOpen || !postData) return null;

    const { postArticle, account, thumbnails } = postData;

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSendComment = async () => {
        try {
            const responseComment = await axios.post(
                `${apiUrl}/comments/post/create`,
                { postId, content: comment },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log("Comment submitted successfully:", responseComment.data);
            setComment("");
            await fetchPostData();
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const handleToggleLike = async () => {
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
            setIsLiked(!isLiked);
            setLikeCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1);
            console.log(response.data.message); // Logs "Like added" or "Like removed"
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    return (
        <div className={cx('modal-overlay')} onClick={onClose}>
            <button className={cx('close-button')} onClick={onClose}><FontAwesomeIcon icon={faX} /></button>
            <div className={cx('modal-commentsDetails')} onClick={(e) => e.stopPropagation()}>
                <div className={cx('post-details')}>
                    <div className={cx('product-post')}>
                        {thumbnails && thumbnails.length > 0 ? (
                            <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                                {thumbnails.map((thumbnail, index) => (
                                    thumbnail.endsWith('.mp4') ? (
                                        <SwiperSlide key={index}> {/* Đặt key tại SwiperSlide */}
                                            <video className={cx('product-video')} src={thumbnail} controls />
                                        </SwiperSlide>
                                    ) : (
                                        <SwiperSlide key={index}> {/* Đặt key tại SwiperSlide */}
                                            <img className={cx('product-image')} src={thumbnail} alt="Post Thumbnail" />
                                        </SwiperSlide>
                                    )
                                ))}
                            </Swiper>
                        ) : (
                            <p>No media available</p>
                        )}
                    </div>

                    <div className={cx('wrapper-infoComment')}>
                        <div className={cx('post-info')}>
                            <div className={cx('header-comment')}>
                                <div className='user'>
                                    {account?.avatar ? (
                                        <img src={account.avatar} alt="User Avatar" />
                                    ) : (
                                        <img src="/images/avt_default.jpg" alt="Default Avatar" />
                                    )}
                                    <div>
                                        <span>{account?.firstName} {account?.lastName}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('comments-section')}>
                                <div style={{ display: 'flex', marginTop: '2rem', gap: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <div className={cx("image-user")}>
                                            <img src={account?.avatar || "/images/avt_default.jpg"} alt="User Avatar" />
                                        </div>
                                        <div className={cx("fullname-user")}>
                                            <span>{account?.firstName} {account?.lastName} <p className={cx('create_at')}> [{formatTimeAgo(postArticle?.created_at)}]</p></span>
                                            <span className={cx('description-post')} style={{ marginTop: '.5rem', display: 'block' }}
                                                dangerouslySetInnerHTML={{ __html: postArticle?.content }} />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginTop: '4rem' }}>
                                    {commentsPost.length > 0 ? (
                                        commentsPost.map((comment, index) => (
                                            <div key={index} className={cx('comment')}>
                                                <div className={cx('comment-wrapper')}>
                                                    <p className={cx('wrapper-user')}>
                                                        <div className={cx("image")}>
                                                            <img src={comment.account.avatar || "/images/avt_default.jpg"} alt="User Avatar" />
                                                        </div>
                                                        <div>
                                                            <div style={{ display: 'flex', fontWeight: 550, cursor: 'pointer' }} >
                                                                <p> {comment.account.first_name} {comment.account.last_name}:</p>
                                                                <div className={cx('text-content')} style={{ cursor: 'copy' }}>{comment.content}</div>
                                                            </div>
                                                            <p className={cx('comment-meta')} >
                                                                {formatTimeAgo(comment.created_at)} - {comment.likes_comment} likes
                                                            </p>
                                                        </div>
                                                    </p>



                                                </div>
                                                <div>
                                                    <FontAwesomeIcon icon={faHeart} />
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p></p>
                                    )}
                                </div>
                            </div>
                            <div className={cx('action')}>
                                <div style={{ display: 'flex' }}>
                                    <div onClick={handleToggleLike} style={{ cursor: 'pointer' }}>

                                        <FontAwesomeIcon icon={faHeart} color={isLiked ? 'red' : 'gray'} />
                                    </div>
                                    
                                    <div>
                                        <FontAwesomeIcon icon={faShare} />
                                    </div>
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faBookmark} />
                                </div>
                            </div>
                            <div className={cx('post-info-bottom')}>
                                <div className={cx('post-info-bottom')}>
                                    <p>{likeCount} likes || {commentsPost.length} comments</p>
                                </div>

                            </div>
                            <div className={cx('box-commentPost')}>
                                <input
                                    type="text"
                                    value={comment}
                                    onChange={handleCommentChange}
                                    placeholder='Add a comment...'
                                />
                                <button className={cx('btn-sendComment')} onClick={handleSendComment}>
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailModalComments;
