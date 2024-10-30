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
    const [comment, setComment] = useState("");
    const [commentsPost, setCommentsPost] = useState([]);

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

    const fetchPostData = async () => {
        try {
            if (postId) {
                const postResponse = await axios.get(`${apiUrl}/post/g_postArticleID/getPost/${postId}`, {
                    headers: { Authorization: `Bearer ${Cookies.get('access_token')}` },
                });
                setPostData(postResponse.data[0]);

                const commentsResponse = await axios.get(`${apiUrl}/comments/get/getComments_PostID/${postId}`, {
                    headers: { Authorization: `Bearer ${Cookies.get('access_token')}` },
                });
                setCommentsPost(commentsResponse.data);
            }
        } catch (err) {
            setError(err.response ? err.response.data : "An error occurred");
        }
    };

    useEffect(() => {
        if (isOpen) {
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
                                                            <div style={{display: 'flex', fontWeight: 550}}>
                                                                {comment.account.first_name} {comment.account.last_name}:
                                                                <div className={cx('text-content')} >{comment.content}</div>
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
