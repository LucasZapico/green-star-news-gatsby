import React, {useState} from "react"
import ArticleCard from '../components/ArticleCard'
import Link from "gatsby-plugin-transition-link/AniLink";
import { union } from "lodash"

const ArticlesTemplate = props => {
  const {Articles } = props.pageContext
  
  const test = Articles.filter(p => p.context != null )
  console.log('test', test)
  const arts = test.filter(p => p.context.article != null )
  console.log('art', arts)
  const sourceList = getSources(arts)
  const featured = arts.splice(0, 1)
  const latest = arts.splice(0, 1)

  const [sourceFilter, setSourceFilter] = useState("")
  const [articles, setArticles] = useState(arts)

  function getSources(data) {
    let sourceList = []
    arts.forEach(d => {
      const sourceName = Array(d.context.article.source.name)
      sourceList = union(sourceName, sourceList)
    })
    return sourceList
  }
  const handleSourceFilter = e => {
    const filter = e.currentTarget.textContent
    if (sourceFilter === filter || "All Sources" === filter) {
      setArticles(Articles)
    } else {
      const filtered = Articles.filter(
        a => a.context.article.source.name === filter
      )
      setArticles(filtered)
      setSourceFilter(prev => {
        return filter
      })
    }
  }


  return (
    <div>
      <div className="content">
        <div className="article__container margin__all--m">
          {articles &&
            articles.map(article => {
              return <ArticleCard data={article} />
            })}
        </div>
        <div className="content__tools">
          <div className="sourcelist margin__right--m margin__top--m">
            <div className="h5 sourcelist__header">Sources</div>
            <div
              onClick={e => handleSourceFilter(e)}
              key="all-sources"
              className="sourcelist__item"
            >
              All Sources
            </div>
            {sourceList &&
              sourceList.map((s, i) => {
                return (
                  <div
                    onClick={e => handleSourceFilter(e)}
                    key={i + s.replace(" ", "-")}
                    className="sourcelist__item"
                  >
                    {s}
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ArticlesTemplate
