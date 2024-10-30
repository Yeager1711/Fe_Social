import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './createPost.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faLocationPin } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';


const cx = classNames.bind(styles);

const apiUrl = process.env.REACT_APP_LOCAL_API_URL;
const Modal = ({ isOpen, onClose, addNewPost  }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [showAllIcons, setShowAllIcons] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [avatar, setAvatar] = useState({});
    const [fileObject, setFileObject] = useState(null);

    // post article
    const [postInfo, setPostInfo] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/account/auth/getUsername`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`
                    }
                });

                setUserData(response.data);
                setAvatar({ avatar: response.data.avatar })
            } catch (err) {
                setError(err.response ? err.response.data : "An error occurred");
            }
        };

        fetchUserData();
    }, [])

    if (!isOpen) return null;

    const handleNext = () => {
        setExpanded(true);
    };

    const handlePostInfoChange = (e) => {
        const inputText = e.target.value;
        const wordCount = inputText.trim().split(/\s+/).length;

        if (wordCount <= 2200) {
            setPostInfo(inputText);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Tệp đã chọn:', file);

            setFileObject(file);
            
            if (file.type.startsWith('image/')) {
                setSelectedImage(URL.createObjectURL(file));
                setSelectedVideo(null); // Đặt lại video khi chọn hình ảnh
            } else if (file.type === 'video/mp4') {
                setSelectedVideo(URL.createObjectURL(file));
                setSelectedImage(null); // Đặt lại hình ảnh khi chọn video
            } else {
                console.log('Vui lòng chọn đúng định dạng ảnh hoặc video !');
                setSelectedImage(null);
                setSelectedVideo(null);
            }
        }
    };

    const handlePost = async () => {

        // trạng thái tải lên
        setIsUploading(true);
        const formattedPostInfo  = postInfo.replace(/\n/g, '<br />');
        const formData = new FormData();
        formData.append("accountId", userData.accountId); // Include accountId
        formData.append("postInfo", formattedPostInfo);
        if (selectedImage) formData.append('file', selectedImage);
        if (selectedVideo) formData.append('file', selectedVideo);

        if (fileObject) formData.append("media", fileObject); // Append the actual file

        try {
            const responsePost = await axios.post(`${apiUrl}/post/post-article/create`, formData, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('access_token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            Swal.fire({
                icon: "success",
            })
            handleModalClose();
        } catch (error) {
            console.error("Lỗi khi đăng bài:", error);
            alert("Có lỗi xảy ra khi đăng bài, vui lòng thử lại!");
        } finally {
            setIsUploading(false);
        }
    }

    const handleModalClose = () => {
        setSelectedImage(null);
        setSelectedVideo(null);
        onClose();
    }
    return (
        <div className={cx('modal-overlay')} onClick={handleModalClose}>
            <div className={cx('modal-content', { expanded })} onClick={(e) => e.stopPropagation()}>
                <div className={cx('header-createPost')}>

                    {selectedImage && expanded && (
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            onClick={() => setExpanded(false)}
                            className={cx('back-button')}
                            style={{ cursor: 'pointer' }}
                        />
                    )}

                    <h2>Create new post</h2>
                    {selectedImage && (
                        <div className={cx('btn-next')} onClick={expanded ? handlePost : handleNext}>
                            {isUploading ? ' Uploading...' : expanded ? 'Share' : 'Next'}
                        </div>
                    )}

                </div>

                <div className={cx('modal-body', { expanded })}>
                    {expanded ? (
                        <>
                            <div className={cx('image-preview')}>
                                {selectedImage && !selectedVideo && (
                                    <img src={selectedImage} alt="Selected" className={cx('preview-image')} />
                                )}
                                {selectedVideo && !selectedImage && (
                                    <video controls className={cx('preview-video')}>
                                        <source src={selectedVideo} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </div>

                            <div className={cx('wrapper-contentPost')}>
                                <div className={cx('post-info')}>
                                    <div className={cx('user')}>
                                        {avatar.avatar ? (
                                            <img src={avatar.avatar} alt="User Avatar" />
                                        ) : (
                                            <img src="/images/avt_default.jpg" alt="Default Avatar" />
                                        )}
                                        <span>{userData.first_name} {userData.last_name}</span>
                                    </div>
                                    {selectedIcon && <div className={cx('selected-icon')}>{selectedIcon}</div>}
                                    <textarea
                                        value={postInfo}
                                        onChange={handlePostInfoChange}
                                        placeholder="Enter post details here..."
                                        className={cx('post-textarea')}
                                    />
                                    <div className={cx('word-count')}>
                                        {`${postInfo.length} / 2,200 ký tự`}
                                    </div>
                                </div>

                                <div className={cx('tag')}>
                                    <div className={cx('box-location')}>
                                        <span>Thêm vị trí</span>
                                        <span><FontAwesomeIcon icon={faLocationPin} /></span>
                                    </div>

                                    <div className={cx('action-post')}>
                                        <div className="box">
                                            <span className='a1'>Ẩn lượt thích và lượt xem trên bài đăng này</span>
                                            <label className="switch">
                                                <input type="checkbox" />
                                                <span className="slider"></span>
                                            </label>
                                        </div>

                                        <div className="box">
                                            <span>Tắt bình luận</span>
                                            <label className="switch">
                                                <input type="checkbox" />
                                                <span className="slider"></span>
                                            </label>
                                        </div>

                                        <div className="box">
                                            <span>Tự động chia sẻ tới Facebook</span>
                                            <label className="switch">
                                                <input type="checkbox" />
                                                <span className="slider"></span>
                                            </label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </>
                    ) : (
                        <div className={cx('select-folder')}>
                            <div className={cx('box-selected')}>
                                <div className='box'>
                                    {/* svg */}
                                    <span>Drag photos and videos here</span>
                                    <div className='mr-top'>
                                        <input
                                            type="file"
                                            accept="image/*,video/*"
                                            className={cx('input-file')}
                                            id="file-input"
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                        />
                                        <label htmlFor="file-input" className={cx('btn-selectFolder')}>
                                            Select from files
                                        </label>
                                    </div>
                                    {selectedImage && (
                                        <div className={cx('image-preview')}>
                                            <img src={selectedImage} alt="Selected" className={cx('preview-image')} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
