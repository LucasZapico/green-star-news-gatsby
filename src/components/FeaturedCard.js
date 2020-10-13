
import React, { useEffect } from "react"
import Link from "gatsby-plugin-transition-link/AniLink";
import Img from "gatsby-image"

const  heroCard = ({data}) => {
  const { article } = data[0].context
  
  return(
    <Link swipe="entry" to={data.path} className="card article__hero">
    <div className="card__img" >
    <img src={article.urlToImage}/>
        </div>
        <div className="card__content ">
          <div className="card__header padding__all">
          <div className="card__category h6">
                
            </div>
            <div className="card__title h5">
               {article.title}
            </div>
          </div>    
        </div>
  </Link>
  );
}

export default heroCard;