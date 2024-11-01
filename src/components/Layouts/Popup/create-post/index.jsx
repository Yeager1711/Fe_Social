import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './createPost.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faLocationPin } from '@fortawesome/free-solid-svg-icons';


import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel';
import 'swiper/css/keyboard';
import 'swiper/css/autoplay';

import { Pagination, Autoplay, Grid } from 'swiper/modules';


import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

//icon React
import { LuFiles } from "react-icons/lu";
import { CiCirclePlus } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";

const cx = classNames.bind(styles);

const apiUrl = process.env.REACT_APP_LOCAL_API_URL;

const Modal = ({ isOpen, onClose, addNewPost }) => {
    const [expanded, setExpanded] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [showAllIcons, setShowAllIcons] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [avatar, setAvatar] = useState({});
    const [fileObject, setFileObject] = useState(null);

    const [selectedImage, setSelectedImage] = useState(null);
    const [multipleFilesMode, setMultipleFilesMode] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);

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

    const handleMultipleFilesClick = () => {
        setMultipleFilesMode(!multipleFilesMode); // Chuyển đổi trạng thái
    };

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
        const files = Array.from(event.target.files);
    
        // Separate image and video files
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        const videoFiles = files.filter(file => file.type === 'video/mp4');
    
        // Single file selection logic
        if (files.length === 1 && !multipleFilesMode) {
            const file = files[0];
            setFileObject(file);
    
            if (file.type.startsWith('image/')) {
                setSelectedImage(URL.createObjectURL(file));
                setSelectedVideo(null); // Clear video when an image is selected
                setSelectedImages(prevImages => [
                    ...prevImages.filter(image => image.url !== URL.createObjectURL(file)), // Remove duplicates
                    { file: file, url: URL.createObjectURL(file) }
                ]);
            } else if (file.type === 'video/mp4') {
                setSelectedVideo(URL.createObjectURL(file));
                setSelectedImage(null); // Clear image when a video is selected
            } else {
                console.log('Please select an image or video in the correct format!');
                setSelectedImage(null);
                setSelectedVideo(null);
            }
        }
        // Multiple file selection logic
        else if (multipleFilesMode) {
            const previewUrls = imageFiles.map(file => ({
                file,
                url: URL.createObjectURL(file),
            }));
    
            // Add only unique images to selectedImages
            setSelectedImages(prevImages => {
                const existingUrls = new Set(prevImages.map(image => image.url));
                const newImages = previewUrls.filter(preview => !existingUrls.has(preview.url));
    
                return [...prevImages, ...newImages]; // Combine existing images with new unique images
            });
        }
    };
    
    const handleImageSelect = (image) => {
        setSelectedImage(image.url);
        setFileObject(image.file);
    };


    const handleDeleteImage = (index) => {
        setSelectedImages(prevImages => {
            const updatedImages = prevImages.filter((_, i) => i !== index);
            if (updatedImages.length === 0) {
                setMultipleFilesMode(false);
            }
            return updatedImages;
        });
    };


    const handlePost = async () => {
        setIsUploading(true);
        const formData = new FormData();
        formData.append("accountId", userData.accountId);
        formData.append("postInfo", postInfo);

        selectedImages.forEach(image => {
            formData.append("media", image.file); // Append each selected image file
        });

        try {
            await axios.post(`${apiUrl}/post/post-article/create`, formData, {
                headers: { Authorization: `Bearer ${Cookies.get('access_token')}`, 'Content-Type': 'multipart/form-data' }
            });
            Swal.fire({ icon: "success" });
            onClose(); // Close modal after successful upload
        } catch (error) {
            console.error("Error posting article:", error);
            alert("You have selected more than 10 photos, please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleModalClose = () => {
        setSelectedImage(null);
        setSelectedVideo(null);
        onClose();
    }
    return (
        <div className={cx('modal-overlay')} onClick={handleModalClose}>
            <div className={cx('modal-content', { expanded: expanded, multipleFiles: multipleFilesMode })} onClick={(e) => e.stopPropagation()}>
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
                            <div className={cx('wapper-imagePreview-Multipless')}>
                                <div>
                                    {!multipleFilesMode && selectedImage && !selectedVideo && (
                                        <div className={cx('image-preview-selected')}>
                                            <img src={selectedImage} alt="Selected" className={cx('preview-image')} />
                                        </div>
                                    )}

                                    {!multipleFilesMode && selectedVideo && !selectedImage && (
                                        <div className={cx('image-preview-selected')}>
                                            <video controls className={cx('preview-video')}>
                                                <source src={selectedVideo} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    )}

                                    {multipleFilesMode && selectedImages.length > 0 && (
                                        <div className={cx('multiple-imagess')}>
                                            <div className={cx('images-selectedExpanded')}>
                                                <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                                                    {selectedImages.map((image, index) => (
                                                        <div
                                                            key={index} // Consider using a unique identifier if available
                                                            className={cx('boxImage-multiplesPreview', { active: selectedImage === image.url })}
                                                            onClick={() => handleImageSelect(image)}
                                                        >
                                                            <SwiperSlide>
                                                                <img src={image.url} alt={`Selected ${index + 1}`} />
                                                            </SwiperSlide>
                                                        </div>
                                                    ))}
                                                </Swiper>
                                            </div>
                                        </div>
                                    )}
                                </div>
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
                        <div className={cx('wrapper-imageSelected-folder')}>
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
                                                <div className={cx('select-multipleFiles')} onClick={handleMultipleFilesClick}>
                                                    <LuFiles />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className={cx("selected-Multiples")}>
                                <div className={cx('selected-Multiples-container')}>
                                    <div className={cx('box-chose')}>
                                        <input
                                            type="file"
                                            id="file-input"
                                            multiple // Thêm thuộc tính multiple
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                        />
                                        <label htmlFor="file-input">
                                            <CiCirclePlus />
                                        </label>
                                    </div>


                                    {multipleFilesMode && (
                                        <div className={cx('images-selectedMultiples')}>
                                            {selectedImages.map((image, index) => (
                                                <div
                                                    key={index}
                                                    className={cx('boxImage-multiplesPreview', { active: selectedImage === image.url })}
                                                    onClick={() => handleImageSelect(image)}
                                                >
                                                    <TiDelete onClick={() => handleDeleteImage(index)} />
                                                    <img src={image.url} alt={`Selected ${index + 1}`} />
                                                </div>
                                            ))}
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
