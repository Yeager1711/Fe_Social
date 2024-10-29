import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './Work.scss';
import classNames from "classnames";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

const cx = classNames.bind(styles);

function Work() {
  const [visibleContent, setVisibleContent] = useState(null);

  const toggleContent = (index) => {
    setVisibleContent(visibleContent === index ? null : index);
  };

  return (
    <section className={cx('work')}>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className={cx('wrapper-work')}>
            <div className={cx('content')}>
              <h2>01</h2>
              <div className={cx('container-content')}>
                <h4>FullStack Project</h4>

                {['tiêu đề 1', 'tiêu đề 2', 'tiêu đề 3'].map((title, index) => (
                  <span className={cx('p-cnt')} key={index}>
                    <h5 onClick={() => toggleContent(index)}>
                      <FontAwesomeIcon icon={visibleContent === index ? faChevronDown : faChevronRight} /> {title}
                    </h5>
                    {visibleContent === index && (
                      <>
                        <p>Nội dung 1</p>
                        <p>Nội dung 2</p>
                        <p>Nội dung 3</p>
                      </>
                    )}
                  </span>
                ))}

                <div className={cx('tech')}>
                  <p>ReactJs, NodeJS, SCSS, JWT, MySQL</p>
                </div>
              </div>

              <div className={cx('link')}>
                <a href="">
                  <FontAwesomeIcon icon={faArrowRight} />
                </a>
                <a href="">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </div>
            </div>
            <div className={cx('images-content')}>
              <img src="/images/product-1.png" alt="" />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={cx('wrapper-work')}>
            <div className={cx('content')}>
              <h2>01</h2>
              <div className={cx('container-content')}>
                <h4>FullStack Project</h4>

                {['tiêu đề 1', 'tiêu đề 2', 'tiêu đề 3'].map((title, index) => (
                  <span className={cx('p-cnt')} key={index}>
                    <p onClick={() => toggleContent(index)}>
                      <FontAwesomeIcon icon={visibleContent === index ? faChevronDown : faChevronRight} /> {title}
                    </p>
                    {visibleContent === index && (
                      <>
                        <p>Nội dung 1</p>
                        <p>Nội dung 2</p>
                        <p>Nội dung 3</p>
                      </>
                    )}
                  </span>
                ))}

                <div className={cx('tech')}>
                  <p>ReactJs, NodeJS, SCSS, JWT, MySQL</p>
                </div>
              </div>

              <div className={cx('link')}>
                <a href="">
                  <FontAwesomeIcon icon={faArrowRight} />
                </a>
                <a href="">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </div>
            </div>
            <div className={cx('images-content')}>
              <img src="/images/product-1.png" alt="" />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={cx('wrapper-work')}>
            <div className={cx('content')}>
              <h2>01</h2>
              <div className={cx('container-content')}>
                <h4>FullStack Project</h4>

                {['tiêu đề 1', 'tiêu đề 2', 'tiêu đề 3'].map((title, index) => (
                  <span className={cx('p-cnt')} key={index}>
                    <p onClick={() => toggleContent(index)}>
                      <FontAwesomeIcon icon={visibleContent === index ? faChevronDown : faChevronRight} /> {title}
                    </p>
                    {visibleContent === index && (
                      <>
                        <p>Nội dung 1</p>
                        <p>Nội dung 2</p>
                        <p>Nội dung 3</p>
                      </>
                    )}
                  </span>
                ))}

                <div className={cx('tech')}>
                  <p>ReactJs, NodeJS, SCSS, JWT, MySQL</p>
                </div>
              </div>

              <div className={cx('link')}>
                <a href="">
                  <FontAwesomeIcon icon={faArrowRight} />
                </a>
                <a href="">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </div>
            </div>
            <div className={cx('images-content')}>
              <img src="/images/product-1.png" alt="" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default Work;
