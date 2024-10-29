import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faThumbtack, faHeart, faTrash, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import styles from './PostAction.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function PostActions() {
    const [showOptions, setShowOptions] = useState(false);
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
                        <div className={cx('actionBox-article')}>
                            <span>Save</span>
                            <span><FontAwesomeIcon icon={faBookmark} /></span>
                        </div>
                        <div className={cx('actionBox-article')}>
                            <span>Pin to profile</span>
                            <span><FontAwesomeIcon icon={faThumbtack} /></span>
                        </div>
                        <div className={cx('actionBox-article')}>
                            <span>Hide like and share count</span>
                            <span><FontAwesomeIcon icon={faHeart} /></span>
                        </div>
                        <div className={cx('actionBox-article')}>
                            <span>Delete</span>
                            <span><FontAwesomeIcon icon={faTrash} /></span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PostActions;
