import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Link from "gatsby-plugin-transition-link/AniLink"
import { SideNav } from "../components/SideNav"
import Layout from "../components/Layout"
import FeaturedCard from "../components/FeaturedCard"
import ArticleCard from "../components/ArticleCard"
import ArticleSection from "../components/ArticleSection"
import { union } from "lodash"
import { filter } from "lodash"

const HomePage = ({ data }) => {
  console.log(data.pages.nodes)
  data = data.pages.nodes.filter(p => p.context !== null)
  console.log("test", data)
  const arts = data.filter(p => p.context.article != null)
  const featured = arts.splice(0, 1)
  const latest = arts.splice(0, 1)
  const techArts = arts.filter(x => x.context.article.category === "technology")
  const busArts = arts.filter(x => x.context.article.category === "business")
  console.log("tecch", techArts)

  const [articles, setArticles] = useState(arts)

  return (
    <div className="app">
      <Layout>
        <div className="header__container">
          <div className="header latest margin__bottom--m">
            <h5 className="header latest__title margin__bottom padding__all ">
              Latest
            </h5>

            {latest &&
              latest.map(article => {
                return <ArticleCard data={article} />
              })}
          </div>
          <div className="header featured ">
            <FeaturedCard data={featured} />
          </div>
        </div>
        <div className="content">
          <ArticleSection data={busArts} />

          <ArticleSection data={techArts} />
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
            category
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
