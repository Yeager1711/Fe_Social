import React, { useEffect, useState } from "react";
import styles from './Saved.scss';
import classNames from "classnames/bind";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { CiCirclePlus } from "react-icons/ci";

import axios from "axios";
import Cookies from "js-cookie";
import Swal from 'sweetalert2';


const cx = classNames.bind(styles);

const apiUrl = process.env.REACT_APP_LOCAL_API_URL;

function SavedPost({ onClose, postId }) {
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [folders, setFolders] = useState([]);
    const [activeFolderId, setActiveFolderId] = useState(null);

    const handleNewCollectionClick = () => {
        setShowInput(!showInput);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const fetch_FolderSaved = async () => {
        try {
            const response = await axios.get(`${apiUrl}/saved/get/get_FolderSave`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('access_token')}`,
                },
            });
            const sortedFolderSave = response.data.folders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setFolders(sortedFolderSave);
        } catch (error) {
            console.error("Error fetching folders:", error);
        }
    };

    const handleSaveFolder = async () => {
        if (!inputValue) {
            alert("Please enter a folder name.");
            return;
        }

        try {
            const response_FolderSaved = await axios.post(
                `${apiUrl}/saved/post/create_FolderSave`,
                { postId, inputValue },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log("Folder created successfully:", response_FolderSaved.data);
            setInputValue("");
            fetch_FolderSaved(); // Refresh the folder list immediately
        } catch (error) {
            console.error("Error saving folder:", error);
        }
    };

    useEffect(() => {
        fetch_FolderSaved();
    }, []);

    const handleFolderClick = async (folderId) => {
        setActiveFolderId(folderId);

        try {
            // API call to save post in the selected folder
            const response = await axios.post(
                `${apiUrl}/saved/post/saveItem_Post/${folderId}`,
                { postId },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log("Post saved to folder:", response.data);
            Swal.fire({
                icon: 'success',
                title: 'Saved!',
                text: 'The post has been successfully saved to the folder.',
            });
        } catch (error) {
            console.error("Error saving post to folder:", error);

            // Check if error response exists and display the specific error message from backend
            const errorMessage = error.response && error.response.data && error.response.data.error
                ? error.response.data.error
                : 'There was an error saving the post to the folder.';

            // Display error message using SweetAlert
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: errorMessage,
            });
        }
    };


    return (
        <div className={cx('modal-overlay')}>
            <button className={cx('close-button')} onClick={onClose}>
                <FontAwesomeIcon icon={faX} />
            </button>

            <div className={cx('model-SavedFolder')}>
                <div className={cx('header-SavedFolder')}>
                    <div className="title">
                        <h3>
                            Saved folder
                        </h3>

                        <span title="+ new Collection" onClick={handleNewCollectionClick}>
                            {showInput ? (
                                inputValue ? (
                                    <span style={{ fontSize: '1.3rem' }} onClick={handleSaveFolder}>Save</span>
                                ) : (
                                    <FontAwesomeIcon icon={faCircleXmark} />
                                )
                            ) : (
                                <CiCirclePlus />
                            )}
                        </span>
                    </div>

                    <div className={cx('input-addFolder', { visible: showInput })}>
                        <input
                            type="text"
                            onChange={handleInputChange}
                            value={inputValue}
                            placeholder="Enter your folder..." />
                    </div>
                </div>

                <div className={cx('savedFolder-container')}>
                    <div className="wrapper-folder">
                        {folders && folders.length > 0 ? (
                            folders.map((folder) => (
                                <div
                                    key={folder.folderId}
                                    className={cx('box-folderSave', { active: folder.folderId === activeFolderId })}
                                    onClick={() => handleFolderClick(folder.folderId)}
                                >
                                    <h4>{folder.name_folder}</h4>
                                </div>
                            ))
                        ) : (
                            <p>No folder saved available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SavedPost;
