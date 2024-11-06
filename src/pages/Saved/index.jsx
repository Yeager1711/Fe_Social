import React, { useEffect, useState } from 'react';
import styles from './Saved.scss';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import axios from 'axios';


// component
import DetailModalComments from '~/components/Layouts/Popup/Details/Comments';


const cx = classNames.bind(styles);
const apiUrl = process.env.REACT_APP_LOCAL_API_URL;

function Saved() {
    const { name_folder, folderId } = useParams();
    const [savedItems, setSavedItems] = useState([]);
    const [commentsModalOpen, setCommentsModalOpen] = useState(false);
    const [selectedPostData, setSelectedPostData] = useState(null);

    const openCommentsModal = (post) => {
        setSelectedPostData(post);
        setCommentsModalOpen(true);
    };


    const closeCommentsModal = () => setCommentsModalOpen(false);

    useEffect(() => {
        const fetchSavedItems = async () => {
            try {
                const response = await axios.get(`${apiUrl}/saved/get/get_SavedPostItem/${folderId}`);
                setSavedItems(response.data.folder_saveItem);
            } catch (error) {
                console.error("Error fetching saved items:", error);
            }
        };

        fetchSavedItems();
    }, [name_folder]);

    return (
        <div className={cx('saved')}>
            <h3>Saved: {name_folder}</h3>
            <div className={cx('thumbnail-grid')}>
                {savedItems.map((item) => (
                    <div
                        key={item.post.postId}
                        className={cx('thumbnail-item')}
                        onClick={() => openCommentsModal(item.post)}
                    >
                        <img
                            src={item.post.thumbnails[0]?.media}
                            alt="Thumbnail"
                            className={cx('thumbnail-image')}
                        />
                        <div className={cx('overlay')}>
                            <span>❤️ {item.post.likes}</span> {/* Example like count */}
                            <span>💬 {item.post.comments}</span> {/* Example comment count */}
                        </div>
                    </div>
                ))}
            </div>


            <DetailModalComments
                isOpen={commentsModalOpen}
                onClose={closeCommentsModal}
                postId={selectedPostData?.postId}
            />
        </div>
    );
}

export default Saved;
