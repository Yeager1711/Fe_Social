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

        // Single file selection logic
        if (files.length === 1 && !multipleFilesMode) {
            const file = files[0];
            setFileObject(file);

            if (file.type.startsWith('image/')) {
                setSelectedImage(URL.createObjectURL(file));
                setSelectedImages(prevImages => [
                    ...prevImages.filter(image => image.url !== URL.createObjectURL(file)), // Remove duplicates
                    { file: file, url: URL.createObjectURL(file) }
                ]);
            } else {
                console.log('Please select an image or video in the correct format!');
                setSelectedImage(null);
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
                                    {!multipleFilesMode && selectedImage && (
                                        <div className={cx('image-preview-selected')}>
                                            <img src={selectedImage} alt="Selected" className={cx('preview-image')} />
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
                                        <svg aria-label="Icon to represent media such as images or videos" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><title>Icon to represent media such as images or videos</title><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                                        <span>Drag photos here. You can upload up to 10 images.</span>
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
