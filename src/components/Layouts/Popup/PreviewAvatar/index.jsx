import React, { useEffect, useRef } from "react";
import styles from './PreviewAvatar.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function PreviewAvatar({ isOpen, onClose, src }) {
    const modalRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={cx('modal')}>
            <div className={cx('modal-previewContainer')} ref={modalRef}>
                <div className={cx('avatarPreview')}>
                {src ? <img src={src} alt="Preview Avatar" /> : <p>No Image Available</p>}
                </div>
            </div>
        </div>
    );
}

export default PreviewAvatar;
