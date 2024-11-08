import React, { useEffect, useState } from 'react';
import styles from './Reels.scss';
import classNames from 'classnames';

// swiperJs
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Mousewheel, Pagination } from 'swiper/modules';

import { CiHeart } from 'react-icons/ci';
import { FaRegComment } from 'react-icons/fa';

import Cookies from 'js-cookie';
import axios from 'axios';

const cx = classNames.bind(styles);
const apiUrl = process.env.REACT_APP_LOCAL_API_URL;

function Reels() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedContent, setExpandedContent] = useState({});

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const response = await axios.get(`${apiUrl}/reels/get/getAll_Reels`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`,
          },
        });

        const sortedReels = response.data.reels.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setReels(sortedReels);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reels:', error);
        setError('An error occurred while fetching reels.');
        setLoading(false);
      }
    };

    fetchReels();
  }, []);

  const toggleContent = (reelId) => {
    setExpandedContent((prevState) => ({
      ...prevState,
      [reelId]: !prevState[reelId],
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={cx('reels')}>
      <h3>Reels</h3>
      <div className={cx('reels-container')}>
        {reels.map((reel) => {
          const wordCount = reel.description.split(' ').length;
          const isLongText = wordCount > 23;

          return (
            <div key={reel.reelId} className={cx('box')}>
              <div className={cx('box-reels')}>
                <div className={cx('video-reels')}>
                  <video controls>
                    <source
                      src={`data:video/mp4;base64,${reel.media}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <div className={cx('wrap-modal')}>
                    <div className={cx('account-reels')}>
                      <div className={cx('flex-name')}>
                        <div className={cx('img-account')}>
                          <img
                            src={reel.avatar}
                            alt={`${reel.first_name} ${reel.last_name}`}
                          />
                        </div>
                        <span>
                          {reel.first_name} {reel.last_name}
                        </span>
                      </div>
                      <div className={cx('flex-button')}>
                        <button>follow</button>
                      </div>
                    </div>
                    <div
                      className={cx('content')}
                      style={{
                        height: expandedContent[reel.reelId] ? '25rem' : '4rem',
                        overflow:expandedContent[reel.reelId] ? 'auto' : 'none',
                      }}
                    >
                      <span>{reel.description}</span>
                    </div>
                    {isLongText && (
                      <button
                        onClick={() => toggleContent(reel.reelId)}
                        className={cx('toggle-button')}
                      >
                        {expandedContent[reel.reelId] ? 'Show Less' : 'Show More'}
                      </button>
                    )}
                  </div>
                </div>
                <div className={cx('action-reels')}>
                  <CiHeart className="heart" />
                  <FaRegComment className="cmt" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Reels;
