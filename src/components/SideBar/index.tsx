import { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import ListFollow from "../../mock/listFollow";
import tickBlue from "../../assets/tick.svg";
import "./side.styles.scss";

function SideBar() {
    const [numberReadMore, setNumberReadMore] = useState(9);
    const [lisFollow, setListFollow] = useState(ListFollow.slice(0, numberReadMore));

    const handleReadMore = () => {
       setNumberReadMore(numberReadMore + 9);
    }

    useEffect(() => {
        if(numberReadMore > ListFollow.length) {
            setNumberReadMore(ListFollow.length);
        }
        setListFollow(ListFollow.slice(0, numberReadMore)); 
    }, [numberReadMore])
  return (
    <div className='side transparent-scrollbar'>
        <div className="side__content">
            <ul className='side__list'>
                <li>
                    <a href='#' className='list__item'>
                        <span className='list__item-icon'><AiOutlineHome /></span>
                        <p className='list__item-text'>
                            <span className='list__item--bold'>Dành cho bạn</span>
                            <span className='list__item-nofition'></span>
                        </p>
                    </a>
                </li>
                <li>
                    <a href='#' className='list__item'>
                        <span className='list__item-icon'><FiUsers /></span>
                        <p className='list__item-text'>
                            <span className='list__item--bold'>Đang Follow</span>
                            <span className='list__item-nofition'></span>
                        </p>
                    </a>
                </li>
                <li>
                    <a href='#' className='list__item'>
                        <span className='list__item-icon'><FiUsers /></span>
                        <p className='list__item-text'>
                            <span className='list__item--bold'>Khám phá</span>
                            <span className='list__item-nofition'></span>
                        </p>
                    </a>
                </li>
                <li>
                    <a href='#' className='list__item'>
                        <span className='list__item-icon'><FiUsers /></span>
                        <p className='list__item-text'>
                            <span className='list__item--bold'>Live</span>
                            <span className='list__item-nofition'></span>
                        </p>
                    </a>
                </li>
            </ul>
            <div className="follow">
                <p className="follow__title">Các tài khoản đang follow</p>
                <ul className='follow__list'>
                    {lisFollow.map((item, index) => {
                        return (
                            <li key={index}>
                                <a href='#' className='follow__item'>
                                    <span className='follow__image'>
                                        <img src={item.avatar} alt="Tiktok" />
                                    </span>
                                    <p className='follow__text'>
                                        <p className='follow__text--bold'>{item.name} {item.isTicked ? <img src={tickBlue} alt="tick" className="follow__tick" />  : null}</p>
                                        <span>{item.subname}</span>
                                    </p>
                                </a>
                            </li>
                        )
                    })}
                </ul>
                <button onClick={handleReadMore} className='side__btn--read'>Xem thêm</button>
            </div>
            <div className="footer">
                <div className='footer-link'>
                    <a href='#' className='footer-link--item'>
                        <span>Tiktok</span>
                    </a>
                    <a href='#' className='footer-link--item'>
                        <span>Tiktok</span>
                    </a>
                    <a href='#' className='footer-link--item'>
                        <span>Tiktok</span>
                    </a>
                    <a href='#' className='footer-link--item'>
                        <span>Tiktok</span>
                    </a>
                    <a href='#' className='footer-link--item'>
                        <span>Tiktok</span>
                    </a>
                    <a href='#' className='footer-link--item'>
                        <span>Tiktok</span>
                    </a>
                </div>
                <div className='footer-link'>
                    <a href='#' className='footer-link--item'>
                        <span>Tiktok</span>
                    </a>
                    <a href='#' className='footer-link--item'>
                        <span>Tiktok</span>
                    </a>
                </div>
                <div className='footer-link'>
                    <a href='#' className='footer-link--item'>
                        <span>Tiktok</span>
                    </a>
                    <a href='#' className='footer-link--item'>
                        <span>Tiktok</span>
                    </a>
                </div>
            </div>
            
            <p className='side__copyright'>© 2023 TikTok</p>
        </div>  
    </div>
  )
}

export default SideBar
