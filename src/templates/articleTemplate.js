import React from "react"
import { Helmet } from "react-helmet"
import Layout from '../components/Layout'


export default function Template(props ) {
  console.log('pages', props)
  const {article} = props.pageContext
  console.log(article)
  return (
      <Layout>
    <div className="">
      <Helmet title={`${article.title}`} />
      <div className="article-main container char__readable center">
        <h1 className="h2">{article.title}</h1>
        <div className="">
          {article.content}
        </div>
      </div>
    </div>
    </Layout>
  )
}
