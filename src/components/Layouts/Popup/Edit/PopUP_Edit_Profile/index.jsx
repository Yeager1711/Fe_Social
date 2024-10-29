import React, { useState, useEffect, useRef } from "react";
import styles from './EditProfile.scss';
import classNames from 'classnames/bind';
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";

const cx = classNames.bind(styles);

// .env api
const apiUrl = process.env.REACT_APP_LOCAL_API_URL;

function EditProfile({ isOpen, onClose }) {
    const [isPrivate, setIsPrivate] = useState(false);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [nickname, setNickName] = useState("");
    const [bio, setBio] = useState("");
    const [linkFB, setLinkFB] = useState("");
    const [linkInsta, setLinkInsta] = useState("");
    const [privateStatus, setPrivateStatus] = useState("")

    const modalRef = useRef(null);
    const navigate = useNavigate();

    const handleNavigateToAccount = () => {
        navigate("/SocializeIt/account/settings/v2/account_privacy");
    };

    // Toggle private profile
    const handleToggle = () => {
        setIsPrivate(!isPrivate);
    };

    // Close modal when clicking outside of it
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/account/auth/getUsername`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`
                    }
                });
                setUserData(response.data);
            } catch (err) {
                setError(err.response ? err.response.data : "An error occurred");
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        // Only set isPrivate if userData has been successfully loaded
        if (userData) {
            setIsPrivate(userData.private_status === 1);
        }
    }, [userData]);


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

    useEffect(() => {
        // Enable the "Done" button if either bio or link has changed
        setIsButtonEnabled(bio !== "" || linkFB !== "" || linkInsta !== "" || nickname !== "" || isPrivate !== userData?.private_status);
    }, [bio, linkFB, linkInsta, nickname, isPrivate, userData]);

    if (!isOpen) return null;


    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setSelectedFile(file);

            // Automatically upload the image
            const formData = new FormData();
            formData.append("avatar", file);
            formData.append("accountId", userData.accountId);

            try {
                const response = await axios.put(`${apiUrl}/account/auth/editProfile/change_image`, formData, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`,
                        "Content-Type": "multipart/form-data"
                    }
                });
                if (response.data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: "Update successful"
                    })
                    setUserData((prev) => ({ ...prev, avatar: response.data.avatar }));
                }
            } catch (err) {
                setError("Failed to update profile image");
            }
        }
    };

    const handleUpdateProfile = async () => {
        const updatedData = {
            nickname: nickname !== "" ? nickname : userData.nickname,
            bio: bio !== "" ? bio : userData.bio,
            linkFB: linkFB !== "" ? linkFB : userData.link_facebook,
            linkInsta: linkInsta !== "" ? linkInsta : userData.link_instagram,
            private_status: isPrivate ? 1 : 0,
        };

        try {
            const response = await axios.put(
                `${apiUrl}/account/auth/editProfile/edit-social`,
                { ...updatedData, accountId: userData.accountId },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Profile updated successfully",
                });
                // Cập nhật lại userData
                setUserData((prev) => ({ ...prev, ...updatedData }));
                onClose();
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Update failed",
                text: error.response ? error.response.data.message : "An error occurred",
            });
        }
    };

    return (
        <div className={cx('modal')}>
            <div className={cx('modal-contentEditProfile')} ref={modalRef}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>Edit profile</h3>
                    <FontAwesomeIcon icon={faGear} style={{ marginLeft: '10px', fontSize: '2rem', cursor: 'pointer' }}
                        onClick={handleNavigateToAccount} />
                </div>

                <div className={cx('image-action')}>
                    <div className="user-edit">
                        <div className={cx('image-user')}>
                            {previewImage ? (
                                <img src={previewImage} alt="Selected Image" />
                            ) : (
                                <img src={userData.avatar || "/images/avt_default.jpg"} alt="User Avatar" />
                            )}
                        </div>

                        <div className="content-user">
                            <span>{userData.first_name} {userData.last_name}</span>
                            <p>@{userData.nickname || userData.username}</p>
                        </div>
                    </div>

                    <div className={cx('button-action')}>
                        <input id="choose-image" type="file" onChange={handleImageChange} />
                        <label htmlFor="choose-image">Change photo</label>
                    </div>
                </div>

                <div className={cx('form-group')}>
                    <label>Email</label>
                    <input type="text" value={`${userData.email}`} disabled />
                </div>

                <div className={cx('form-group')}>
                    <label>Name</label>
                    <input type="text" value={`${userData.first_name} ${userData.last_name} (@${userData.username})`} disabled />
                </div>

                <div className={cx('wrapper-details-Infomation')}>
                    <div className={cx('form-group')}>
                        <label>NickName</label>
                        <input
                            type="text"
                            placeholder={userData.nickname ? userData.nickname : "+ Add nickname"}
                            value={nickname}
                            onChange={(e) => setNickName(e.target.value)}
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <label>Bio</label>
                        <input
                            type="text"
                            placeholder={userData.bio ? userData.bio : "+ Add bio"}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <label>Link Facebook</label>
                        <input
                            type="text"
                            placeholder={userData.link_facebook ? userData.link_facebook : "+ Add link instagram: https://www.example.com/"}
                            value={linkFB}
                            onChange={(e) => setLinkFB(e.target.value)}
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <label>Link Instagram</label>
                        <input
                            type="text"
                            placeholder={userData.link_instagram ? userData.link_instagram : "+ Add link instagram: https://www.example.com/"}
                            value={linkInsta}
                            onChange={(e) => setLinkInsta(e.target.value)}
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <div className="flex">
                            <div>
                                <span>Private profile</span>
                                <p>If you switch to private, you won't be able to reply to others unless they follow you.</p>
                            </div>
                            <div>
                                <button
                                    className={cx('btn-slide', { active: isPrivate })}
                                    onClick={handleToggle}
                                    aria-label="Toggle private profile"
                                ></button>
                            </div>
                        </div>
                    </div>

                </div>
                <button
                    onClick={handleUpdateProfile}
                    className={cx('btn-done')}
                    disabled={!isButtonEnabled}
                >
                    Done
                </button>
            </div>
        </div>
    );
}

export default EditProfile;
