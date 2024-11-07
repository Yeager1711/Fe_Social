import React, { useState, useEffect, useRef } from 'react';
import styles from './Search.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);
const apiUrl = process.env.REACT_APP_LOCAL_API_URL;

function Search({ isOpen, onClose }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [articles, setArticles] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/post/g_postArticleAll/getAll_Article`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('access_token')}`
                },
            });
            // Ensure articles is an array
            setArticles(Array.isArray(response.data.data) ? response.data.data : []);
        } catch (error) {
            console.error("Error fetching posts:", error);
            setArticles([]); // Ensure articles is an array even on error
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Separate filtering logic based on the search query
    const filteredPosts = articles.filter((post) => {
        const queryLower = searchQuery.toLowerCase();
        // Check if the search query matches the content or the account name
        const isMatchingAccount =
            post.account?.first_name?.toLowerCase().includes(queryLower) ||
            post.account?.last_name?.toLowerCase().includes(queryLower);

        const isMatchingContent =
            post.content?.toLowerCase().includes(queryLower);

        // Return true if content matches (show full post) or if it's an account search (show only account)
        return isMatchingContent || isMatchingAccount;
    });

    // Handle search query clear
    const handleClearSearch = () => {
        setSearchQuery('');
    };

    return (
        <div ref={popupRef} className={cx('Search-popup', { open: isOpen })}>
            <h3>Search</h3>

            <div className={cx('Search-container')}>
                <div className={cx('box-search')}>
                    <input
                        type="text"
                        placeholder="search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button className={cx('clear-button')} onClick={handleClearSearch}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    )}
                </div>

                <div className={cx('Recent')}>
                    <h2>Recent</h2>
                    <div className={cx('wrapper-result')}>
                        {searchQuery && (
                            <>
                                {filteredPosts.length > 0 ? (
                                    // Show only the first matching result
                                    <div key={filteredPosts[0].postId} className={cx('search-result')}>
                                        {/* Show account details if searching by first_name or last_name */}
                                        {filteredPosts[0].account?.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        filteredPosts[0].account?.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ? (
                                            <div className={cx('account-info')}>
                                                <img src={filteredPosts[0].account?.avatar || 'default-image-url'} alt={filteredPosts[0].account?.first_name || 'User'} className={cx('user-image')} />
                                                <div>
                                                    <strong>{filteredPosts[0].account.first_name} {filteredPosts[0].account.last_name}</strong>
                                                </div>
                                            </div>
                                        ) : (
                                            // Show full post details if searching by content
                                            <div className={cx('post-content')}>
                                                <strong>{filteredPosts[0].account.first_name} {filteredPosts[0].account.last_name}</strong>
                                                <p style={{ marginLeft: '1.5rem', fontSize:'1.3rem', marginTop: '1rem' }}>{filteredPosts[0].content}</p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <p className={cx('no-result')}>No results found.</p>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
