import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import classNames from 'classnames/bind';
import styles from './Header.Module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faHouse,
  faMagnifyingGlass,
  faPaperclip,
  faHeart,
  faSquarePlus,
  faChevronLeft,
  faChevronRight,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';

// import components
import Modal from '~/components/Layouts/Popup/create-post';
import Notifications from '~/components/Layouts/Popup/Notifications';
import Search from '~/components/Layouts/Popup/Search';
import MoreHeader from '../../Popup/More-Header';
import CreateReels  from '../../Popup/create-reels';

// icons React
import { CiSettings, CiBookmark } from 'react-icons/ci';
import { IoIosLogOut } from 'react-icons/io';
import { IoSunnyOutline } from 'react-icons/io5';

//apiRequestWithAuth
import { apiRequestWithAuth } from '~/ultis/auth'

const cx = classNames.bind(styles);

// .env api
const apiUrl = process.env.REACT_APP_LOCAL_API_URL;

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenNotifications, setIsModalOpenNotifications] = useState(false);
  const [isModalOpenSearch, setIsModalOpenSearch] = useState(false);
  const [isMoreHeaderOpen, setIsMoreHeaderOpen] = useState(false);
  const [isModalReelsOpen, setIsModalReelsOpen] = useState(false);

  const [isCreateDropdownOpen, setIsCreateDropdownOpen] = useState(false); // New state for dropdown

  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState({});
  const [isCollapsed, setIsCollapsed] = useState(false);

  // fetch api
  useEffect(() => {
    const token = Cookies.get("access_token");

    if (token) {
      fetch(`${apiUrl}/account/auth/getUsername`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.username) {
            setUsername(data.username);
            setAvatar({ avatar: data.avatar });
          }
        })
        .catch((error) => console.error('Error fetching user data:', error));
    } else {
      setUsername('');
      setAvatar('');
    }
  }, [location, Cookies.get('access_token')]);


  const handleActiveItem = (item) => {
    setActiveItem(item);
  };

  const handleCreateClick = () => {
    setIsCreateDropdownOpen(!isCreateDropdownOpen); // Toggle dropdown visibility
  };

  const handleCreatePost = () => {
    setActiveItem('create');
    setIsCreateDropdownOpen(false); // Close dropdown
    setIsModalOpen(true); // Open create post modal
  };

  const handleCreateReels = () => {
    setIsModalReelsOpen(true);
  };

  const handleOpenNotifications = () => {
    setActiveItem('notifications');
    setIsModalOpenNotifications(true);
  };

  const handleOpenSearch = () => {
    setActiveItem('search');
    setIsModalOpenSearch(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalOpenNotifications(false);
    setIsModalOpenSearch(false);
    setIsModalReelsOpen(false);
  };

  const handleProfileClick = () => {
    const token = Cookies.get("access_token");
    if (token && username) {
      navigate(`/SocializeIt/profile/@${username}`);
    } else {
      navigate('/SocializeIt/auth/login');
    }
  };

  const toggleMoreHeader = () => {
    setIsMoreHeaderOpen(!isMoreHeaderOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <header className={cx('wrapper-header', { 'collapsed': isCollapsed })}>
      <FontAwesomeIcon className={cx('chevronLeft')} icon={faChevronLeft} onClick={toggleCollapse} />
      <div className="logo">SocializeIt</div>

      <nav className={cx('navbar')}>
        <Link
          to="/"
          className={cx('nav-link', { 'active': activeItem === '/' })}
          onClick={() => handleActiveItem('/')}
        >
          <FontAwesomeIcon icon={faHouse} />
          <span>home</span>
        </Link>

        <div
          className={cx('nav-link', { 'active': activeItem === 'search' })}
          onClick={handleOpenSearch}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <span> search</span>
        </div>

        <Link
          to="/socializeIt/explore"
          className={cx('nav-link', { 'active': activeItem === '/socializeIt/explore' })}
          onClick={() => handleActiveItem('/socializeIt/explore')}
        >
          <FontAwesomeIcon icon={faPaperclip} />
          <span>explore</span>
        </Link>

        <div
          className={cx('nav-link', { 'active': activeItem === 'notifications' })}
          onClick={handleOpenNotifications}
        >
          <FontAwesomeIcon icon={faHeart} />
          <span> notifications</span>
        </div>

        <div
          className={cx('nav-link navDropdown', { 'active': activeItem === 'create' })}
          onClick={handleCreateClick}
        >
          <FontAwesomeIcon icon={faSquarePlus} />
          <span>create </span>



        </div>
        {/* Dropdown Menu for Create Post or Create Reels */}
        {isCreateDropdownOpen && (
          <div className={cx('dropdown-menu')}>
            <div className={cx("btn-post")} onClick={handleCreatePost}>Post Image</div>
            <div className={cx("btn-post")} onClick={handleCreateReels}>Post Reels</div>
          </div>
        )}

        <div
          className={cx('nav-link', { 'active': activeItem === `/SocializeIt/profile/@${username}` })}
          onClick={handleProfileClick}
        >
          {avatar.avatar ? (
            <img src={avatar.avatar} alt="User Avatar" />
          ) : (
            <img src="/images/avt_default.jpg" alt="Default Avatar" />
          )}
          <span> Profile</span>
        </div>
      </nav>

      <div className={cx('footer-header')}>
        <button
          className={cx('btn-moreOption', { 'active': activeItem === 'more' })}
          onClick={toggleMoreHeader}
        >
          <FontAwesomeIcon icon={faBars} />
          more
        </button>

        {isMoreHeaderOpen && <MoreHeader onClose={() => setIsMoreHeaderOpen(false)} />}
      </div>

      <CreateReels open={isModalReelsOpen} onClose={closeModal} />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      <Notifications isOpen={isModalOpenNotifications} onClose={closeModal} />
      <Search isOpen={isModalOpenSearch} onClose={closeModal} />
    </header>
  );
}

export default Header;
