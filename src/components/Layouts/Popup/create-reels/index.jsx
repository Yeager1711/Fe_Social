import React, { useEffect, useState } from 'react';
import styles from './CreateReels.scss';
import classNames from 'classnames';

const cx = classNames.bind(styles);

function CreateReels({ open, onClose }) {
    const [isOpen, setIsOpen] = useState(open);
    const [videoPreview, setVideoPreview] = useState(null);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const closeModal = () => {
        setIsOpen(false);
        setVideoPreview(null);
        if (onClose) onClose();
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setVideoPreview(previewUrl);
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
                        <form className={cx('reels-form')}>
                            <label htmlFor="reelDescription" className={cx('label')}>
                                Description
                            </label>
                            <textarea
                                id="reelDescription"
                                className={cx('input', 'textarea')}
                                placeholder="Add a description..."
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

                            <button
                                type="button"
                                className={cx('submit-btn')}
                                onClick={handleButtonClick}
                            >
                                {videoPreview ? 'Upload Reels' : 'Select Video'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateReels;
