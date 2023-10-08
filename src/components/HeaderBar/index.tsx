import { useState} from "react"
import { Logo, UserLogo } from "../../assets"
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai"
import { BsPlusLg, BsChatSquareText, BsCoin } from "react-icons/bs"
import { GoPaperAirplane } from "react-icons/go"
import { MdFavoriteBorder } from "react-icons/md"
import "./header.styles.scss"

function HeaderBar() {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    let timeoutDropDown = 0;

    const handleAvatarHover = () => {
        setDropdownVisible(true);
        clearTimeout(timeoutDropDown);
    };

    const handleAvatarLeave = () => {
      timeoutDropDown =  setTimeout(() => {
            setDropdownVisible(false);
        }, 500);
    };
  return (
    <div className="header-container">
        <nav className="header-menu">
            <div className="logo">
                <img src={Logo} alt="Tiktok" />
                <span>TikTok</span>
            </div>
            <div className="search-container">
                <form className="search">
                    <input type="text" placeholder="Tìm kiếm"  className="search-input"/>
                    <button className="search-btn">
                        <span>
                            <AiOutlineSearch />
                        </span>
                    </button>
                </form>
            </div>
            <div className="tool">
                <button className="tool-down">
                    <span className="tool-down__icon">
                        <BsPlusLg />
                    </span>
                    <span>Tải lên</span>
                </button>
                <button className="tool-icon tool-icon__send">
                    <span>
                        <GoPaperAirplane />
                    </span>
                </button>
                <button className="tool-icon mt-10">
                    <span>
                        <BsChatSquareText />
                    </span>
                    <span className="tool-icon__sup">2</span>
                </button>
                <div className="dropdown" onMouseEnter={handleAvatarHover}     >
                    <span><img src={UserLogo} alt="avatar" className="dropdown-avatar" /></span>
                    {isDropdownVisible && 
                    <div onMouseLeave={handleAvatarLeave} className={`dropdown-content`}>
                        <ul className="dropdown-list">
                            <li className="dropdown-list__item">
                                <a href="#" className="dropdown-list__link">
                                    <span className="dropdown-list__icon"><AiOutlineUser /></span>
                                    <span className="dropdown-list__text">Xem hồ sơ</span>
                                </a>
                            </li>
                            <li className="dropdown-list__item">
                                <a href="#" className="dropdown-list__link">
                                    <span className="dropdown-list__icon"><MdFavoriteBorder /></span>
                                    <span className="dropdown-list__text">Yêu thích</span>  
                                </a>
                            </li>
                            <li className="dropdown-list__item">
                                <a href="#" className="dropdown-list__link">
                                    <span className="dropdown-list__icon"><BsCoin /></span>
                                    <span className="dropdown-list__text">Nhận Xu</span>  
                                </a>
                            </li>
                            <li className="dropdown-list__item">
                                <a href="#" className="dropdown-list__link">
                                    <span className="dropdown-list__icon"><BsCoin /></span>
                                    <span className="dropdown-list__text">Trung tâm Nhà sáng tạo Live</span>  
                                </a>
                            </li>
                            <li className="dropdown-list__item">
                                <a href="#" className="dropdown-list__link">
                                    <span className="dropdown-list__icon"><BsCoin /></span>
                                    <span className="dropdown-list__text">Cài đặt</span>  
                                </a>
                            </li>
                            <li className="dropdown-list__item">
                                <a href="#" className="dropdown-list__link">
                                    <span className="dropdown-list__icon"><BsCoin /></span>
                                    <span className="dropdown-list__text">Tiếng việt</span>  
                                </a>
                            </li>
                            <li className="dropdown-list__item">
                                <a href="#" className="dropdown-list__link">
                                    <span className="dropdown-list__icon"><BsCoin /></span>
                                    <span className="dropdown-list__text">Phản hồi và trợ giúp</span>  
                                </a>
                            </li>
                            <li className="dropdown-list__item">
                                <a href="#" className="dropdown-list__link">
                                    <span className="dropdown-list__icon"><BsCoin /></span>
                                    <span className="dropdown-list__text">Phím tắt trên bàn phím</span>  
                                </a>
                            </li>
                            <li className="dropdown-list__item">
                                <div  className="dropdown-list__link">
                                    <span className="dropdown-list__icon"><BsCoin /></span>
                                    <span className="switch-mode__text">Chế độ tối</span>
                                    <div className="switch-mode">
                                        <label className="switch-mode__box">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                </div>
                            </li>
                            <li className="dropdown-list__item dropdown-list__item--last">
                                <a href="#" className="dropdown-list__link">
                                    <span className="dropdown-list__icon"><BsCoin /></span>
                                    <span className="dropdown-list__text">Đăng xuất</span>  
                                </a>
                            </li>
                        </ul>
                    </div>}
                </div> 
            </div>
        
        </nav>
    </div>
  )
}

export default HeaderBar
