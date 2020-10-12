import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Link from "gatsby-plugin-transition-link/AniLink"
import { SideNav } from "../components/SideNav"
import Layout from "../components/Layout"
import FeaturedCard from "../components/FeaturedCard"
import ArticleCard from "../components/ArticleCard"
import { union } from "lodash"
import { filter } from "lodash"

const HomePage = ({ data }) => {
  console.log(data.pages.nodes)
  const test = data.pages.nodes.filter(p => p.context !== null )
  console.log('test', test)
  const arts = test.filter(p => p.context.article != null )
  console.log('art', arts)
  const sourceList = getSources(arts)
  const featured = arts.splice(0, 1)
  const latest = arts.splice(0, 2)

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

  // useEffect(() => {

  // }, [s])

  return (
    <div className="app">
      <Layout>
        <div className="header__container margin__all--m">
          <div className="header latest">
            <h5 className="header latest__title margin__bottom margin__right padding__all ">
              Latest
            </h5>

            {latest &&
              latest.map(article => {
                return <ArticleCard data={article} />
              })}
          </div>
          <div className="header featured margin__left">
            <FeaturedCard data={featured} />
          </div>
        </div>
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
      </Layout>
    </div>
  )
}

export default HomePage

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
          }
        }
        path
      }
    }
    docs: allMarkdownRemark {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            categories
            description
            path
          }
        }
        next {
          id
        }
        previous {
          id
        }
      }
    }
  }
`
