import React from "react";
import styles from './Explore.scss'
import classNames from "classnames";

const cx = classNames.bind(styles)

function Explore() {

    const postData = [
        {
            id: 8,
            user: './images/user3.jpg',
            userName: 'itheme_design',
            locationTag: 'Dubai, Các Tiểu Vương quốc Ả Rập Thống nhất',
            image: './images/iphone3.mp4',
            likes: '106,704',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam....',
            date: 'September 21',
            comments: [
                {
                    user: './images/user2.jpg',
                    username: 'parvizsharifiy28',
                    comment: '15-pro legend 🔥',
                    time: '3w',
                    likes: 25
                },
                {
                    user: './images/user2.jpg',
                    username: 'iandreamosca_',
                    comment: 'Natural titanium team!',
                    time: '3w',
                    likes: 116
                },
                {
                    user: './images/user2.jpg',
                    username: 'aizul_ordep',
                    comment: 'Can someone fulfill my dream of having an iPhone? 🙏🎉 please I am from Angola',
                    time: '1w',
                    likes: 1
                }
            ]
        },
        {
            id: 7,
            user: './images/user2.jpg',
            userName: 'archiportfoliomaker',
            locationTag: 'Dubai, Các Tiểu Vương quốc Ả Rập Thống nhất',
            image: './images/iphone2.mp4',
            likes: '106,704',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam....',
            date: 'September 21',
            comments: [
                {
                    user: './images/user2.jpg',
                    username: 'parvizsharifiy28',
                    comment: '15-pro legend 🔥',
                    time: '3w',
                    likes: 25
                },
                {
                    user: './images/user2.jpg',
                    username: 'iandreamosca_',
                    comment: 'Natural titanium team!',
                    time: '3w',
                    likes: 116
                },
                {
                    user: './images/user2.jpg',
                    username: 'aizul_ordep',
                    comment: 'Can someone fulfill my dream of having an iPhone? 🙏🎉 please I am from Angola',
                    time: '1w',
                    likes: 1
                }
            ]
        },
        {
            id: 4,
            user: './images/user5.jpg',
            userName: 'imaaduuddin',
            locationTag: 'Dubai, Các Tiểu Vương quốc Ả Rập Thống nhất',
            image: './images/product3.jpg',
            likes: '6,704',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam....',
            date: 'September 21',
            comments: [
                {
                    user: './images/user2.jpg',
                    username: 'parvizsharifiy28',
                    comment: '15-pro legend 🔥',
                    time: '3w',
                    likes: 25
                },
                {
                    user: './images/user2.jpg',
                    username: 'iandreamosca_',
                    comment: 'Natural titanium team!',
                    time: '3w',
                    likes: 116
                },
                {
                    user: './images/user2.jpg',
                    username: 'aizul_ordep',
                    comment: 'Can someone fulfill my dream of having an iPhone? 🙏🎉 please I am from Angola',
                    time: '1w',
                    likes: 1
                }
            ]
        },
        {
            id: 5,
            user: './images/user4.jpg',
            userName: 'edc_tech_',
            locationTag: 'Dubai, Các Tiểu Vương quốc Ả Rập Thống nhất',
            image: './images/product4.jpg',
            likes: '1,106,704',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam....',
            date: 'September 21',
            comments: [
                {
                    user: './images/user2.jpg',
                    username: 'parvizsharifiy28',
                    comment: '15-pro legend 🔥',
                    time: '3w',
                    likes: 25
                },
                {
                    user: './images/user2.jpg',
                    username: 'iandreamosca_',
                    comment: 'Natural titanium team!',
                    time: '3w',
                    likes: 116
                },
                {
                    user: './images/user2.jpg',
                    username: 'aizul_ordep',
                    comment: 'Can someone fulfill my dream of having an iPhone? 🙏🎉 please I am from Angola',
                    time: '1w',
                    likes: 1
                },
                {
                    user: './images/user2.jpg',
                    username: 'parvizsharifiy28',
                    comment: '15-pro legend 🔥',
                    time: '3w',
                    likes: 25
                },
                {
                    user: './images/user2.jpg',
                    username: 'iandreamosca_',
                    comment: 'Natural titanium team!',
                    time: '3w',
                    likes: 116
                },
                {
                    user: './images/user2.jpg',
                    username: 'aizul_ordep',
                    comment: 'Can someone fulfill my dream of having an iPhone? 🙏🎉 please I am from Angola',
                    time: '1w',
                    likes: 1
                },
                {
                    user: './images/user2.jpg',
                    username: 'parvizsharifiy28',
                    comment: '15-pro legend 🔥',
                    time: '3w',
                    likes: 25
                },
                {
                    user: './images/user2.jpg',
                    username: 'iandreamosca_',
                    comment: 'Natural titanium team!',
                    time: '3w',
                    likes: 116
                },
                {
                    user: './images/user2.jpg',
                    username: 'aizul_ordep',
                    comment: 'Can someone fulfill my dream of having an iPhone? 🙏🎉 please I am from Angola',
                    time: '1w',
                    likes: 1
                },
                {
                    user: './images/user2.jpg',
                    username: 'parvizsharifiy28',
                    comment: '15-pro legend 🔥',
                    time: '3w',
                    likes: 25
                },
                {
                    user: './images/user2.jpg',
                    username: 'iandreamosca_',
                    comment: 'Natural titanium team!',
                    time: '3w',
                    likes: 116
                },
                {
                    user: './images/user2.jpg',
                    username: 'aizul_ordep',
                    comment: 'Can someone fulfill my dream of having an iPhone? 🙏🎉 please I am from Angola',
                    time: '1w',
                    likes: 1
                }
            ]
        },
        {
            id: 3,
            user: './images/user2.jpg',
            userName: 'archiportfoliomaker',
            locationTag: 'Dubai, Các Tiểu Vương quốc Ả Rập Thống nhất',
            image: './images/product2.jpg',
            likes: '206,704',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam....',
            date: 'September 21',
            comments: [
                {
                    user: './images/user2.jpg',
                    username: 'parvizsharifiy28',
                    comment: '15-pro legend 🔥',
                    time: '3w',
                    likes: 25
                },
                {
                    user: './images/user2.jpg',
                    username: 'iandreamosca_',
                    comment: 'Natural titanium team!',
                    time: '3w',
                    likes: 116
                },
                {
                    user: './images/user2.jpg',
                    username: 'aizul_ordep',
                    comment: 'Can someone fulfill my dream of having an iPhone? 🙏🎉 please I am from Angola',
                    time: '1w',
                    likes: 1
                }
            ]
        },
        {
            id: 6,
            user: './images/user2.jpg',
            userName: 'archiportfoliomaker',
            locationTag: 'Dubai, Các Tiểu Vương quốc Ả Rập Thống nhất',
            image: './images/product5.jpg',
            likes: '1,704',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam....',
            date: 'September 21',
            comments: [
                {
                    user: './images/user2.jpg',
                    username: 'parvizsharifiy28',
                    comment: '15-pro legend 🔥',
                    time: '3w',
                    likes: 25
                },
                {
                    user: './images/user2.jpg',
                    username: 'iandreamosca_',
                    comment: 'Natural titanium team!',
                    time: '3w',
                    likes: 116
                },
                {
                    user: './images/user2.jpg',
                    username: 'aizul_ordep',
                    comment: 'Can someone fulfill my dream of having an iPhone? 🙏🎉 please I am from Angola',
                    time: '1w',
                    likes: 1
                }
            ]
        },
        {
            id: 1,
            user: './images/user6.jpg',
            userName: 'zenjoshh',
            locationTag: 'Dubai, Các Tiểu Vương quốc Ả Rập Thống nhất',
            image: './images/iphone1.mp4',
            likes: '106,704',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam....',
            date: 'September 21',
            comments: [
                {
                    user: './images/user2.jpg',
                    username: 'parvizsharifiy28',
                    comment: '15-pro legend 🔥',
                    time: '3w',
                    likes: 25
                },
                {
                    user: './images/user2.jpg',
                    username: 'iandreamosca_',
                    comment: 'Natural titanium team!',
                    time: '3w',
                    likes: 116
                },
                {
                    user: './images/user2.jpg',
                    username: 'aizul_ordep',
                    comment: 'Can someone fulfill my dream of having an iPhone? 🙏🎉 please I am from Angola',
                    time: '1w',
                    likes: 1
                }
            ]
        },
        {
            id: 7,
            user: './images/user2.jpg',
            userName: 'archiportfoliomaker',
            locationTag: 'Dubai, Các Tiểu Vương quốc Ả Rập Thống nhất',
            image: './images/product6.jpg',
            likes: '704',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam....',
            date: 'September 21',
            comments: [
                {
                    user: './images/user2.jpg',
                    username: 'parvizsharifiy28',
                    comment: '15-pro legend 🔥',
                    time: '3w',
                    likes: 25
                },
                {
                    user: './images/user2.jpg', username: 'iandreamosca_',
                    comment: 'Natural titanium team!',
                    time: '3w',
                    likes: 116
                },
                {
                    user: './images/user2.jpg',
                    username: 'aizul_ordep',
                    comment: 'Can someone fulfill my dream of having an iPhone? 🙏🎉 please I am from Angola',
                    time: '1w',
                    likes: 1
                }
            ]
        },
        {
            id: 2,
            user: './images/user7.jpg',
            userName: 'riceminimalist',
            locationTag: 'Dubai, Các Tiểu Vương quốc Ả Rập Thống nhất',
            image: './images/product1.jpg',
            likes: '106,704',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam....',
            date: 'September 21',
            comments: [
                {
                    user: './images/user2.jpg',
                    username: 'parvizsharifiy28',
                    comment: '15-pro legend 🔥',
                    time: '3w',
                    likes: 25
                },
                {
                    user: './images/user2.jpg',
                    username: 'iandreamosca_',
                    comment: 'Natural titanium team!',
                    time: '3w',
                    likes: 116
                },
                {
                    user: './images/user2.jpg',
                    username: 'aizul_ordep',
                    comment: 'Can someone fulfill my dream of having an iPhone? 🙏🎉 please I am from Angola',
                    time: '1w',
                    likes: 1
                }
            ]
        },
    ]


    return (
        <section className={cx(' Explore')}>
            <h3>Explore</h3>

            <div className={cx('explore-container')}>
               {postData && postData.map(post => (
                 <div className={cx('box')} key={post.id}>
                    <div className={cx('product-explore')}>
                        {post.image.endsWith('.mp4') ? (
                                <video className={cx('product-video')} src={post.image} controls />
                            ) : (
                                <img className={cx('product-image')} src={post.image} alt={post.description} />
                            )}
                    </div>
                 </div>
               ))}
            </div>
        </section>
    );
}

export default Explore;