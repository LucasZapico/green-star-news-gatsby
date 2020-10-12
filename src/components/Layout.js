/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql} from "gatsby"
import {AniLink as Link} from "gatsby-plugin-transition-link/AniLink"
import Header from "./Header"
import Footer from './Footer'
import SEO from './Helmet'
import "../assets/sass/_styles.scss";


const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
    <SEO/>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div>
        <main>{children}</main>
       <Footer/>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
