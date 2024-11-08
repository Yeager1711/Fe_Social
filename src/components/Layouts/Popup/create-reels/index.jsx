import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CreateReels.scss';
import classNames from 'classnames';
import Cookies from 'js-cookie';


// icons React
import { FaCloudUploadAlt } from "react-icons/fa";


const cx = classNames.bind(styles);
const apiUrl = process.env.REACT_APP_LOCAL_API_URL;


function CreateReels({ open, onClose }) {
    const [isOpen, setIsOpen] = useState(open);
    const [videoPreview, setVideoPreview] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [description, setDescription] = useState("");

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const closeModal = () => {
        setIsOpen(false);
        setVideoPreview(null);
        setVideoFile(null);
        setDescription("");
        if (onClose) onClose();
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setVideoPreview(previewUrl);
            setVideoFile(file);
        }
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async () => {
        // Check if a video file has been selected
        if (!videoFile) {
            alert("Please select a video file.");
            return;
        }

        const formData = new FormData();
        formData.append("video", videoFile); // Ensure videoFile is attached
        formData.append("description", description);

        try {
            // Attempt to upload the reel
            const response = await axios.post(`${apiUrl}/reels/post/createReels`, formData, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('access_token')}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Reel uploaded successfully!");
            setVideoPreview(null)
            closeModal(); // Reset the form only after successful upload
        } catch (error) {
            console.error("Error uploading reel:", error);
            alert("Failed to upload the reel. Please try again.");
        }
    };


    const handleButtonClick = () => {
        // Trigger the file input click event
        document.getElementById('reelMedia').click();
    };

    return (
        <div className={cx('create-reels')}>
            {isOpen && (
                <div className={cx('modal-overlay')} onClick={closeModal}>
                    <div className={cx('modal-content')} onClick={(e) => e.stopPropagation()}>
                        <button className={cx('close-btn')} onClick={closeModal}>
                            &times;
                        </button>
                        <h3 className={cx('modal-title')}>Create a Reels</h3>
                        <form className={cx('reels-form')} onSubmit={(e) => e.preventDefault()}>
                            <label htmlFor="reelDescription" className={cx('label')}>
                                Description
                            </label>
                            <textarea
                                id="reelDescription"
                                className={cx('input', 'textarea')}
                                placeholder="Add a description..."
                                value={description}
                                onChange={handleDescriptionChange}
                            ></textarea>

                            <input
                                type="file"
                                id="reelMedia"
                                className={cx('input', 'file-input')}
                                accept="video/*"
                                onChange={handleVideoChange}
                                style={{ display: 'none' }} // Hide the file input
                            />

                            {videoPreview && (
                                <div className={cx('video-preview')}>
                                    <video src={videoPreview} controls className={cx('video-element')} />
                                </div>
                            )}
                            {!videoPreview && (
                                <div className={cx('wrapper-box')}>

                                    <div className={cx('input-video')}>
                                        <FaCloudUploadAlt />
                                        <h4>Select video to upload reels</h4>
                                        <p>Or drag and drop them here. You can upload up to 1 video.</p>
                                        <button
                                            type="button"
                                            className={cx('select-btn')}
                                            onClick={handleButtonClick}
                                        >
                                            Select Video
                                        </button>
                                    </div>

                                </div>
                            )}
                            {videoFile && (
                                <button
                                    type="button"
                                    className={cx('submit-btn')}
                                    onClick={handleSubmit}
                                >
                                    Upload Reel
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateReels;
