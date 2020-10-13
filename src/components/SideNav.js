import React from "react"
import   Link  from 'gatsby-plugin-transition-link/AniLink'
import { StaticQuery, graphql } from "gatsby"


const SideNav = () => {
  return (
    <StaticQuery
      query={graphql`
        query HeadingQuery {
          site {
            siteMetadata {
              title
            }
          }
          pages: allSitePage(
            sort: { order: DESC, fields: context___article___publishedAt }
          ) {
            nodes {
              id
              context {
                article {
                  title
                  source {
                    name
                  }
                  publishedAt            
                  urlToImage
                  category
                }
              }
              path
            }
          }
        }
      `}
      render={data => (
        <div className="sidenav__container">
      <div className="sidenav__items">
        <div className="h4">{data.site.siteMetadata.title}</div>
        
      </div>
    </div>
      )}
    />
  )  
}

export default SideNav;
