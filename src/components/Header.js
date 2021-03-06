
import PropTypes from "prop-types"
import React, { useState } from "react"

import { useCurrentWidth } from "../hooks"
import { IoIosMenu, IoIosClose } from "react-icons/io"
import Navigation from './Nav'
// todo add spring animation to nav toggle

const Header = ({ siteTitle }) => {
  const width = useCurrentWidth()
  const [showMenu, setShowMenu] = useState(false)
  return (
    <header className="header">
      <Navigation width={width} />
        
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: "",
}

export default Header

