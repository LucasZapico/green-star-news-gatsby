import React from 'react';
import ArticleCard from "./ArticleCard"
import Link from "gatsby-plugin-transition-link/AniLink";

const ArticleSection = ({data}) => {
    const articles = data
    const featured = articles.splice(0,1)
  return (
    <div className="section  margin__all">
        <div className="h4">{articles[0].context.article.category}</div>
        <div className="category wrapper">
        <div className="category__section">
        <Link swipe="entry" to={featured[0].context.article.path} className="card article article__featured">
            <div class="card__img">
            <img src={featured[0].context.article.urlToImage}/>
            </div>
        <div class="card__content padding__all">
      <div class="card__header">
        <div class="card__subtitle">{featured[0].context.article.category}</div>
        <div class="card__title">{featured[0].context.article.source.name}</div>
      </div>
      <div class="card__body body__large">{featured[0].context.article.title}</div>
      </div>
    </Link>
      {articles &&
        articles.map(article => {
          return <ArticleCard data={article} />
        })}
        </div>
        </div>
    </div>
  )
}

export default ArticleSection
