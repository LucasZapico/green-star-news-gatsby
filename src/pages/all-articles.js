import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/Layout"
import Link from "gatsby-plugin-transition-link/AniLink"
import { union } from "lodash"
import ArticleCard from "../components/ArticleCard"

const ArticlesTemplate = ({ data }) => {
  data = data.pages.nodes.filter(p => p.context !== null)

  const arts = data.filter(p => p.context.article != null)

  // const techArts = arts.filter(x => x.context.article.category === "technology")
  // const busArts = arts.filter(x => x.context.article.category === "business")

  const [articles, setArticles] = useState(arts)
  const sourceList = getSources(arts)

  const [sourceFilter, setSourceFilter] = useState("")

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
      setArticles(arts)
    } else {
      const filtered = arts.filter(
        a => a.context.article.source.name === filter
      )
      setArticles(filtered)
      setSourceFilter(prev => {
        return filter
      })
    }
  }

  return (
    <div className="app">
      <Layout>
        <div className="content">
          <div className="content__tools category"></div>
          <div className="articles__container margin__all--m">
            {articles &&
              articles.map(article => {
                return <ArticleCard data={article} />
              })}
          </div>
          <div className="content__tools sources">
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
      </Layout>
    </div>
  )
}
export default ArticlesTemplate

export const pageQuery = graphql`
  query {
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
            author
            content
            description
            urlToImage
            category
          }
        }
        path
      }
    }
  }
`
