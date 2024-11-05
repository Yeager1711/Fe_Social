import React, { useState } from "react";
import styles from './Saved.scss';
import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { CiCirclePlus } from "react-icons/ci";

const cx = classNames.bind(styles);

function SavedPost({ onClose }) {
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleNewCollectionClick = () => {
        setShowInput(!showInput)
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    }

    return (
        <div className={cx('modal-overlay')}>
            <button className={cx('close-button')} onClick={onClose}>
                <FontAwesomeIcon icon={faX} />
            </button>

            <div className={cx('model-SavedFolder')}>
                <div className={cx('header-SavedFolder')}>
                    <div className="title">
                        <h3>Saved folder</h3>
                        <span title="+ new Collection" onClick={handleNewCollectionClick}>
                            {inputValue ? (
                                <span style={{fontSize: '1.3rem'}}>Save</span>
                            ) : (
                                <CiCirclePlus />
                            )}
                        </span>
                    </div>

                    <div className={cx('input-addFolder', { visible: showInput })}>
                        <input type="text" 
                         onChange={handleInputChange}
                        placeholder="Enter your folder..." />
                    </div>
                </div>

                <div className={cx('savedFolder-container')}>
                    {/* Content of the saved folders can go here */}
                </div>
            </div>
        </div>
    );
}

export default SavedPost;
