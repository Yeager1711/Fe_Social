import React, { useEffect, useState } from "react";
import styles from './Profile.scss';
import classNames from "classnames/bind";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faUsers, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faEllipsis, faComment, faShare, faBookmark, faThumbtack,faTrash } from '@fortawesome/free-solid-svg-icons';

import EditProfile from '~/components/Layouts/Popup/Edit/PopUP_Edit_Profile';
import PreviewAvatar from '~/components/Layouts/Popup/PreviewAvatar';
import DetailModalComments from '~/components/Layouts/Popup/Details/Comments';
import PostActions from '~/components/Layouts/Popup/PostAction'

import Cookies from "js-cookie";

import { checkAccessToken } from "~/ultis/checkTokenValid";

const cx = classNames.bind(styles);
const apiUrl = process.env.REACT_APP_LOCAL_API_URL;

function Profile() {
    const [isEditOpen, setEditOpen] = useState(false);
    const [isPreviewAvatar, setPreviewAvatar] = useState(false);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [postArticle, setPostArticle] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedPostData, setSelectedPostData] = useState(null); 
    const [commentsModalOpen, setCommentsModalOpen] = useState(false); 
    const [postData, setPostData] = useState(null);


    const openEditProfile = () => setEditOpen(true);
    const closeEditProfile = () => setEditOpen(false);
    const openPreviewAvatar = () => setPreviewAvatar(true);
    const closePreviewAvatar = () => setPreviewAvatar(false);
    const closeCommentsModal = () => setCommentsModalOpen(false); 

    const navigator = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/account/auth/getUsername`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`
                    }
                });
                setUserData(response.data);
            } catch (err) {
                setError(err.response ? err.response.data : "An error occurred");
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (!checkAccessToken()) return;
        if (!userData?.accountId) return;

        const fetchPostArticle = async () => {
            try {
                const responsePostArticle = await axios.get(`${apiUrl}/post/g_postArticle/getPost`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`
                    },
                });
                const sortedArticles = responsePostArticle.data.sort((a, b) => new Date(b.postArticle.created_at) - new Date(a.postArticle.created_at));
                setPostArticle(sortedArticles);
            } catch (err) {
                setError(err.response ? err.response.data : "An error occurred");
            }
        };

        fetchPostArticle();
    }, [userData?.accountId]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    const openCommentsModal = async (postArticle) => {
        setSelectedPostData(postArticle); // Pass the full post data
        setCommentsModalOpen(true); // Open the comments modal
    };

    const formatTimeAgo = (createAt) => {
        const createTime = new Date(createAt);
        const now = new Date();
        const diffInSeconds = Math.floor((now - createTime) / 1000); 

        if (diffInSeconds < 60) {
            return `${diffInSeconds}s`;
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes}m`;
        } else {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours}h`;
        }
    };



    return (
        <div className={cx('profile')}>
            <h2 className={cx('center-text')}>Profile</h2>
            <div className={cx('profile-wrapper')}>
                <header className={cx('profile-header')}>
                    <div className={cx('profile-picture')}>
                        {userData.avatar ? (
                            <img src={userData.avatar} alt="User Avatar" onClick={openPreviewAvatar} />
                        ) : (
                            <img src="/images/avt_default.jpg" alt="Default Avatar" />
                        )}
                    </div>
                    <div className={cx('profile-info')}>
                        <h2 className={cx('profile-name')}>{userData.first_name} {userData.last_name}</h2>
                        <p className={cx('profile-username')}>@{userData.nickname || userData.username}</p>
                        <div className={cx('followers')}>
                            <span>4 followers</span>
                        </div>
                    </div>
                    <div className={cx('profile-actions')}>
                        <div className={cx('social-icons')}>
                            <FontAwesomeIcon icon={faFacebook} />
                            <FontAwesomeIcon icon={faInstagram} />
                        </div>
                    </div>
                </header>
                <div className={cx('bio')}>
                    <span>{userData.bio}</span>
                </div>
                <button className={cx('edit-profile')} onClick={openEditProfile}>Edit profile</button>
                <nav className={cx('profile-tabs')}>
                    <span className={cx('active')}>Post</span>
                    <span>Replies</span>
                    <span>Reposts</span>
                </nav>
                <div className={cx('new-thread')}>
                    <div>
                        {userData.avatar ? (
                            <img src={userData.avatar} alt="ảnh đại diện" />
                        ) : (
                            <img src="/images/avt_default.jpg" />
                        )}
                        <input type="text" placeholder="What's new?" />
                    </div>
                    <button>Post</button>
                </div>
                <div className={cx('profile-steps')}>
                    <h3>Finish your profile</h3>
                    <div className={cx('steps')}>
                        <div className={cx('step-item', { approve: userData.bio })}>
                            <FontAwesomeIcon icon={faPencil} />
                            <span>{userData.bio ? 'Edit bio' : 'Add bio'}</span>
                            <p>Introduce yourself and tell people what you’re into.</p>
                            <button onClick={openEditProfile}>{userData.bio ? 'Edit' : 'Add'}</button>
                        </div>
                        <div className={cx('step-item')}>
                            <FontAwesomeIcon icon={faUsers} />
                            <span>Follow 5 profiles</span>
                            <p>Fill your feed with threads that interest you.</p>
                            <button>See profiles</button>
                        </div>
                        <div className={cx('step-item')}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                            <span>Create thread</span>
                            <p>Say what’s on your mind or share a recent highlight.</p>
                            <button>Create</button>
                        </div>
                    </div>
                </div>
                <div className={cx('list-postArticle')}>
                    {postArticle && postArticle.length > 0 ? (
                        postArticle.map((article) => (
                            <div className="box-postArticle" key={article.postArticle.postId}>
                                <div>
                                    <div className="post-header">
                                        <div style={{ display: 'flex' }}>
                                            {article.account.avatar ? (
                                                <img src={article.account.avatar} alt="Profile" className="profile-pic" />
                                            ) : (
                                                <img src="/images/act_default.jpg" alt="Profile" className="profile-pic" />
                                            )}
                                            <div className="post-info">
                                                <span className="fullname">{article.account.firstName} {article.account.lastName}</span>
                                                <span className="time">{formatTimeAgo(article.postArticle.created_at)}</span>
                                            </div>
                                        </div>

                                        <PostActions />

                                    </div>
                                    <div className="post-content">{article.postArticle.content}</div>
                                </div>
                                {/* Hiển thị hình ảnh bài viết */}
                                <div className="post-image">
                                    {article.thumbnails.length > 0 ? (
                                        article.thumbnails.map((thumbnail) => (
                                            <img key={thumbnail} src={thumbnail} alt="Post Thumbnail" />
                                        ))
                                    ) : null}
                                </div>
                                <div className="post-footer">
                                    <span className="icon"><FontAwesomeIcon icon={faHeart} /> 32</span>
                                    <span className="icon" onClick={() => { openCommentsModal(article.postArticle); console.log("Post ID clicked:", article.postArticle.postId); }}>
                                        <FontAwesomeIcon icon={faComment} /> 2
                                    </span>
                                    <span className="icon"><FontAwesomeIcon icon={faShare} /></span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No posts available.</p>
                    )}
                </div>
            </div>

            {/* Comments Modal */}
            <DetailModalComments
                isOpen={commentsModalOpen}
                onClose={closeCommentsModal}
                postId={selectedPostData?.postId} // Pass postId to modal
            />
            {/* Edit Profile Modal */}
            <EditProfile isOpen={isEditOpen} onClose={closeEditProfile} />
            {/* Avatar Preview Modal */}
            <PreviewAvatar isOpen={isPreviewAvatar} onClose={closePreviewAvatar} />
        </div>
    );
}

export default Profile;
