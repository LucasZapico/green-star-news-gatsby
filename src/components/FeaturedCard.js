
import React, { useEffect } from "react"
import Link from "gatsby-plugin-transition-link/AniLink";
import Img from "gatsby-image"

const  FeaturedCard = ({data}) => {
  const { article } = data[0].context
  
  return(
    <Link swipe="entry" to={data.path} className="card article__featured">
    <div className="featured__img" style={{backgroundColor: "#FFC861"}}>
    <img src={article.urlToImage}/>
        </div>
        <div className="featured__content">
          <div className="featured__header padding__all--m">
          <div className="featured__category h6">
                
            </div>
            <div className="featured__title h5">
               {article.title}
            </div>
          </div>    
        </div>
  </Link>
  );
}

export default FeaturedCard;