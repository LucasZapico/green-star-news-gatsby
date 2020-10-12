import React, {useState} from "react"
import Link from "gatsby-plugin-transition-link/AniLink";
import Mark from '../assets/images/mark.svg'
import { RiMenu2Fill } from 'react-icons/ri'
import SideNav from './SideNav'
const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <>
    {showMenu ? <SideNav /> : undefined}
    
    <div className="nav__container ">
      <nav className="nav">
        <ul className="nav__items">
          <li className="nav__item" onClick={() => setShowMenu(!showMenu)}>
            <RiMenu2Fill/>
            <div >Menu</div>
          </li>
          {/* <li className="nav__item">
            <Link fade  to="/articles">Articles</Link>
          </li> */}
        </ul>
        <div className="nav__mark">
          <Link fade to="/">
            <Mark/>
          </Link>
        </div>
        <div className="nav__item">
      
        </div>
      </nav>
    </div>
    </>
  )
}



export default Navigation
