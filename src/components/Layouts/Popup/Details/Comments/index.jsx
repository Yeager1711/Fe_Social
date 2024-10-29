import React, { useEffect, useState } from 'react';
import styles from './Comments.scss';
import classNames from 'classnames/bind';
import { faX } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Cookies from "js-cookie";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faBookmark, faShare } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const apiUrl = process.env.REACT_APP_LOCAL_API_URL;

function DetailModalComments({ isOpen, onClose, postId }) {


    const [postData, setPostData] = useState(null);
    const [error, setError] = useState(null);

    const formatTimeAgo = (createAt) => {
        const createTime = new Date(createAt);
        const now = new Date();
        const diffInSeconds = Math.floor((now - createTime) / 1000); // Tính khoảng cách thời gian tính bằng giây

        if (diffInSeconds < 60) {
            return `${diffInSeconds}s`;
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes}m`;
        } else if (diffInSeconds < 86400) { // Ít hơn 1 ngày
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours}h`;
        } else if (diffInSeconds < 2592000) { // Ít hơn 1 tháng (khoảng 30 ngày)
            const days = Math.floor(diffInSeconds / 86400);
            return `${days}d`;
        } else if (diffInSeconds < 31536000) { // Ít hơn 1 năm (khoảng 365 ngày)
            const months = Math.floor(diffInSeconds / 2592000);
            return `${months}mo`;
        } else {
            const years = Math.floor(diffInSeconds / 31536000);
            return `${years}y`;
        }
    };



    useEffect(() => {
        const fetchPostData = async () => {
            try {
                if (postId) {
                    const response = await axios.get(`${apiUrl}/post/g_postArticleID/getPost/${postId}`, {
                        headers: {
                            Authorization: `Bearer ${Cookies.get('access_token')}`,
                        },
                    });
                    setPostData(response.data[0]);
                }
            } catch (err) {
                setError(err.response ? err.response.data : "An error occurred");
            }
        };

        if (isOpen) {
            fetchPostData();
        }
    }, [isOpen, postId]);

    if (!isOpen || !postData) return null;

    const { postArticle, account, thumbnails } = postData;


    return (
        <div className={cx('modal-overlay')} onClick={onClose}>
            <button className={cx('close-button')} onClick={onClose}><FontAwesomeIcon icon={faX} /></button>
            <div className={cx('modal-commentsDetails')} onClick={(e) => e.stopPropagation()}>


                <div className={cx('post-details')}>
                    <div className={cx('product-post')}>
                        {thumbnails && thumbnails.length > 0 ? (
                            thumbnails.map((thumbnail, index) => (
                                thumbnail.endsWith('.mp4') ? (
                                    <video key={index} className={cx('product-video')} src={thumbnail} controls />
                                ) : (
                                    <img key={index} className={cx('product-image')} src={thumbnail} alt="Post Thumbnail" />
                                )
                            ))
                        ) : (
                            <p>No media available</p>
                        )}
                    </div>

                    <div className={cx('wrapper-infoComment')}>
                        <div className={cx('post-info')}>
                            <div className={cx('header-comment')}>
                                {/* <p><strong>Post ID: </strong>{postArticle?.postId}</p> */}
                                <div className='user'>
                                    {account?.avatar ? (
                                        <img src={account.avatar} alt="User Avatar" />
                                    ) : (
                                        <img src="/images/avt_default.jpg" alt="Default Avatar" />
                                    )}
                                    <div>
                                        <span>{account?.firstName} {account?.lastName}</span>
                                        <p className={cx('create_at')}>{formatTimeAgo(postArticle?.created_at)}</p>
                                    </div>
                                </div>

                            </div>


                            <div className={cx('comments-section')}>
                                <div style={{ display: 'flex', marginTop: '2rem', gap: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <div className={cx("image-user")}>
                                            {account?.avatar ? (
                                                <img src={account.avatar} alt="User Avatar" />
                                            ) : (
                                                <img src="/images/avt_default.jpg" alt="Default Avatar" />
                                            )}
                                        </div>
                                        <div className={cx("fullname-user")}>
                                            <span>{account?.firstName} {account?.lastName}</span>: <span className={cx('description-post')}>{postArticle?.content}</span>
                                        </div>
                                    </div>

                                </div>
                                {/* {postData.comments.map((comment, index) => (
                                    <div key={index} className={cx('comment')}>
                                        <p><img src={comment.user} alt="" /> <strong>{comment.username}: </strong> {comment.comment}</p>
                                        <p className={cx('comment-meta')}>{comment.time} - {comment.likes} likes</p>
                                    </div>
                                ))} */}
                            </div>

                            <div className={cx('action')}>
                                <div>
                                    <FontAwesomeIcon icon={faHeart} />
                                    <FontAwesomeIcon icon={faComment} />
                                    <FontAwesomeIcon icon={faShare} />
                                </div>

                                <div>
                                    <FontAwesomeIcon icon={faBookmark} />
                                </div>
                            </div>

                            <div className={cx('post-info-bottom')}>
                                <p>101.787 likes</p>

                            </div>

                            <div className={cx('box-commentPost')}>
                                <input type="text" name="" id="" placeholder='add a comment ...' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailModalComments;
