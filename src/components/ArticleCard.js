import React, { useEffect } from "react"
import Link from "gatsby-plugin-transition-link/AniLink"
import Img from "gatsby-image"

const ArticleCard = ({ data }) => {
  const { article } = data.context
  return (
    <Link swipe="entry" to={data.path} className="card article padding__all">
      <div class="card__header">
        <div class="card__subtitle">{article.category}</div>
        <div class="card__title">{article.source.name}</div>
      </div>
      <div class="card__body body__default">{article.title}</div>
    </Link>
  )
}

export default ArticleCard
