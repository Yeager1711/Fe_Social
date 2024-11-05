import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack, faHeart, faTrash, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import styles from './PostAction.scss';
import classNames from 'classnames/bind';
import { MdEdit } from "react-icons/md";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";

// Import SavedPost component
import SavedPost from '../Saved';

const cx = classNames.bind(styles);

function PostActions() {
    const [showOptions, setShowOptions] = useState(false);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const optionsRef = useRef(null);

    const toggleOptions = () => {
        setShowOptions(prevState => !prevState);
    };

    const handleClickOutside = (event) => {
        if (optionsRef.current && !optionsRef.current.contains(event.target)) {
            setShowOptions(false);
        }
    };

    useEffect(() => {
        if (showOptions) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showOptions]);

    const openModal = () => {
        setShowModal(true);
        setShowOptions(false); // Close the options menu when modal opens
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className={cx('action')}>
            <FontAwesomeIcon
                icon={faEllipsis}
                className={cx('faEllipsis')}
                onClick={toggleOptions}
            />
            {showOptions && (
                <div ref={optionsRef} className={cx('option')}>
                    <div className={cx('option-container')}>
                        <div className={cx('actionBox-article')} onClick={openModal}>
                            <span>Save</span>
                            <span><CiBookmark /></span>
                        </div>
                        <div className={cx('actionBox-article')}>
                            <span>Edit post</span>
                            <span><MdEdit /></span>
                        </div>
                        <div className={cx('actionBox-article')}>
                            <span>Pin to profile</span>
                            <span><FontAwesomeIcon icon={faThumbtack} /></span>
                        </div>
                        <div className={cx('actionBox-article')}>
                            <span>Hide like and share count</span>
                            <span><IoHeartDislikeOutline /></span>
                        </div>
                        <div className={cx('actionBox-article')}>
                            <span>Delete</span>
                            <span><FontAwesomeIcon icon={faTrash} /></span>
                        </div>
                    </div>
                </div>
            )}
            
            {showModal && <SavedPost onClose={closeModal} />} {/* Render SavedPost modal */}
        </div>
    );
}

export default PostActions;
