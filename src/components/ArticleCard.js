import React, { useEffect } from "react"
import Link from "gatsby-plugin-transition-link/AniLink"
import Img from "gatsby-image"

const ArticleCard = ({ data }) => {
  const { article } = data.context
    return (
    
        <Link swipe="entry" to={data.path} className="article__card card">
          <div className="article__content">
            <div className="article__category">Business</div>
            <div className="article__source">{article.source.name}</div>
            <div className="article__header">{article.title}</div>
          </div>
        </Link>
    
    
  )
}

export default ArticleCard
